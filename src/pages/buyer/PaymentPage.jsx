import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    CheckCircle2,
    CreditCard,
    Loader2,
    ShieldCheck,
    XCircle,
} from "lucide-react";
import { usePayOrder, useVerifyPayment } from "../../hooks/usePayOrder";

export default function PaymentPage() {
    const { orderId } = useParams();

    const payOrder = usePayOrder();
    const verifyPayment = useVerifyPayment();

    const [status, setStatus] = useState("Initialisation...");
    const [paymentId, setPaymentId] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
    const [verificationError, setVerificationError] = useState(false);

    useEffect(() => {
        console.log("PaymentPage montée - orderId:", orderId);
        console.log("FedaPay disponible:", !!window.FedaPay);
    }, [orderId]);

    const verify = (id) => {
        if (!id) return;
        
        setVerificationError(false);
        setStatus("Vérification du paiement...");

        verifyPayment.mutate(id, {
            onSuccess: (response) => {
                console.log("Réponse vérification:", response);

                const payment = response?.payment;

                if (!payment) {
                    console.error("Paiement absent de la réponse:", response);
                    setVerificationError(true);
                    setStatus("Impossible de récupérer l'état du paiement.");
                    return;
                }

                if (payment.status === "paid") {
                    setIsPaid(true);
                    setStatus("Paiement confirmé avec succès.");
                    return;
                }

                setStatus("Le paiement n'a pas encore été confirmé.");
            },
            onError: (error) => {
                console.error("Erreur vérification paiement:", error);
                console.error("Réponse backend:", error.response?.data);

                setVerificationError(true);
                setStatus(
                    error.response?.data?.message ||
                        "Impossible de vérifier le paiement."
                );
            },
        });
    };

    const handlePayment = () => {
        if (!window.FedaPay) {
            console.error("FedaPay n'est pas disponible");
            setStatus("FedaPay n'est pas chargé.");
            return;
        }

        setStatus("Création/récupération du paiement...");

        payOrder.mutate(orderId, {
            onSuccess: (response) => {
                console.log("Réponse backend (PayOrder):", response);

                const payment = response?.payment?.payment;

                if (!payment) {
                    console.error("Payment absent:", response);
                    setStatus("Réponse paiement invalide.");
                    return;
                }

                const currentPaymentId = payment.id;
                setPaymentId(currentPaymentId);

                const transaction = payment.transactions?.[0];
                const transactionId = transaction?.transaction_id;

                if (!transactionId) {
                    console.error("ID transaction FedaPay introuvable");
                    setStatus("Transaction FedaPay introuvable.");
                    return;
                }

                try {
                    const widget = window.FedaPay.init({
                        public_key: import.meta.env.VITE_FEDAPAY_PUBLIC_KEY,
                        environment: "sandbox",
                        locale: "fr",
                        transaction: {
                            id: transactionId,
                        },
                        currency: {
                            iso: "XOF",
                        },
                        onComplete: (checkoutResponse) => {
                            console.log("Checkout terminé:", checkoutResponse);
                            verify(currentPaymentId);
                        },
                    });

                    if (!widget) {
                        setStatus("Impossible de créer le checkout.");
                        return;
                    }

                    widget.open();
                    setStatus("Checkout FedaPay ouvert...");
                } catch (error) {
                    console.error("ERREUR CHECKOUT FEDAPAY:", error);
                    setStatus("Erreur lors de l'ouverture du checkout.");
                }
            },
            onError: (error) => {
                console.error("ERREUR API paiement:", error);
                console.error("Réponse backend:", error.response?.data);

                setStatus(
                    error.response?.data?.message ||
                        "Erreur lors de la création du paiement."
                );
            },
        });
    };

    const isPreparing = payOrder.isPending || verifyPayment.isPending;

    if (isPaid) {
        return (
            <div className="min-h-screen bg-[var(--dark-background)] px-4 py-10 text-white sm:px-6">
                <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg items-center justify-center">
                    <div className="w-full rounded-2xl border border-[var(--dark-border)] bg-[var(--dark-surface)] p-6 text-center shadow-xl sm:p-8">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                            <CheckCircle2 size={34} />
                        </div>

                        <h1 className="text-2xl font-bold">Paiement confirmé</h1>

                        <p className="mt-3 text-sm leading-6 text-white/55">
                            Votre paiement a été confirmé. Votre commande est maintenant validée.
                        </p>

                        <div className="mt-6 rounded-xl bg-white/[0.03] p-4 text-left">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-sm text-white/50">Commande</span>
                                <span className="text-sm font-semibold">#{orderId}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-6 w-full rounded-xl bg-[var(--primary)] px-5 py-3.5 text-sm font-semibold transition hover:bg-[var(--primary-hover)]"
                        >
                            Voir ma commande
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--dark-background)] px-4 py-10 text-white sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
                <div className="w-full">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                            <CreditCard size={28} />
                        </div>

                        <h1 className="text-2xl font-bold sm:text-3xl">
                            Paiement de votre commande
                        </h1>

                        <p className="mt-2 text-sm text-white/60">
                            Finalisez votre achat de billets en toute sécurité.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-[var(--dark-border)] bg-[var(--dark-surface)] shadow-xl">
                        <div className="border-b border-[var(--dark-border)] p-5 sm:p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                                        Commande
                                    </p>
                                    <p className="mt-1 break-all text-sm font-semibold sm:text-base">
                                        #{orderId}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/70">
                                    <CreditCard size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-8">
                            <div className="rounded-xl border border-[var(--dark-border)] bg-white/[0.02] p-5 sm:p-6">
                                <h2 className="text-lg font-semibold">Procéder au paiement</h2>
                                <p className="mt-1 text-sm leading-6 text-white/55">
                                    Cliquez sur le bouton ci-dessous pour ouvrir le formulaire de paiement sécurisé FedaPay.
                                </p>

                                <button
                                    type="button"
                                    onClick={handlePayment}
                                    disabled={isPreparing}
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3.5 text-sm font-semibold transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isPreparing ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            {verifyPayment.isPending
                                                ? "Vérification..."
                                                : "Préparation..."}
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard size={18} />
                                            Payer avec FedaPay
                                        </>
                                    )}
                                </button>

                                {status && (
                                    <div className="mt-4 flex items-start gap-2 text-xs text-white/45">
                                        {verificationError ? (
                                            <XCircle size={15} className="mt-0.5 shrink-0 text-red-400" />
                                        ) : (
                                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                                        )}
                                        <span>{status}</span>
                                    </div>
                                )}

                                {verificationError && paymentId && (
                                    <button
                                        type="button"
                                        onClick={() => verify(paymentId)}
                                        disabled={verifyPayment.isPending}
                                        className="mt-4 text-sm font-medium text-[var(--primary)] hover:underline disabled:opacity-50"
                                    >
                                        Réessayer la vérification
                                    </button>
                                )}
                            </div>

                            <div className="mt-6 flex items-start gap-3 rounded-xl bg-white/[0.02] p-4">
                                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-emerald-400" />
                                <div>
                                    <p className="text-sm font-medium">Paiement sécurisé</p>
                                    <p className="mt-1 text-xs leading-5 text-white/45">
                                        Le paiement est traité de manière sécurisée par FedaPay. Vos informations de paiement ne sont pas stockées par Festivo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="mt-5 text-center text-xs leading-5 text-white/35">
                        Ne fermez pas cette page pendant le processus de paiement.
                    </p>
                </div>
            </div>
        </div>
    );
}