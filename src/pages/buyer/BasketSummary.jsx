import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Ticket,
    Tag,
    ShieldCheck,
    CreditCard,
    Loader2,
    User,
    Mail,
    Phone,
} from "lucide-react";
import { useBasket } from "../../hooks/useBasket";
import { useCreateOrder } from "../../hooks/useOrder";

// Importation de vos composants de base
import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";
import ActionButton from "../../Components/ui/ActionButton";

function formatPrice(price) {
    return new Intl.NumberFormat("fr-FR").format(price || 0);
}

function BasketSummary() {
    const { basketId } = useParams();
    const navigate = useNavigate();

    const {
        data: response,
        isLoading,
        isError,
    } = useBasket(basketId);

    const createOrder = useCreateOrder();

    const basket = response?.data;

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.first_name.trim()) {
            errors.first_name = "Le prénom est obligatoire.";
        }

        if (!formData.last_name.trim()) {
            errors.last_name = "Le nom est obligatoire.";
        }

        if (!formData.email.trim()) {
            errors.email = "L'adresse email est obligatoire.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "L'adresse email n'est pas valide.";
        }

        if (!formData.phone.trim()) {
            errors.phone = "Le numéro de téléphone est obligatoire.";
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handlePayment = () => {
        if (!validateForm()) {
            return;
        }

        createOrder.mutate(
            {
                basketId,
                customer: {
                    first_name: formData.first_name.trim(),
                    last_name: formData.last_name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                },
            },
            {
                onSuccess: (response) => {
                    const order = response?.data;

                    if (!order?.id) {
                        setFormErrors({
                            general:
                                "La commande a été créée, mais ses informations sont introuvables.",
                        });
                        return;
                    }

                    navigate(`/orders/${order.id}/payments`);
                },
                onError: (error) => {
                    const backendErrors =
                        error.response?.data?.errors || {};

                    const errors = {};

                    Object.keys(backendErrors).forEach((key) => {
                        errors[key] = backendErrors[key]?.[0] || "";
                    });

                    if (error.response?.data?.message) {
                        errors.general = error.response.data.message;
                    }

                    setFormErrors(errors);
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[var(--dark-background)] text-gray-900 dark:text-[var(--dark-text)]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
                    <p className="text-gray-500 dark:text-slate-400">
                        Chargement du récapitulatif...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !basket) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[var(--dark-background)] px-4">
                <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                        <Ticket className="w-7 h-7 text-red-500 dark:text-red-400" />
                    </div>

                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Panier introuvable
                    </h1>

                    <p className="text-gray-500 dark:text-slate-400 mb-6">
                        Impossible de récupérer les informations de votre
                        panier.
                    </p>

                    <Button
                        variant="primary"
                        onClick={() => navigate(-1)}
                        className="max-w-xs mx-auto"
                    >
                        Retour
                    </Button>
                </div>
            </div>
        );
    }

    const totalTickets =
        basket.tickets?.reduce(
            (total, ticket) => total + ticket.quantity,
            0
        ) || 0;

    return (
        <div className="min-h-screen bg-white dark:bg-[var(--dark-background)] text-gray-900 dark:text-[var(--dark-text)] transition-colors duration-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <ActionButton
                        icon={ArrowLeft}
                        title="Retour"
                        onClick={() => navigate(-1)}
                        size={20}
                        className="w-10 h-10 shrink-0"
                    />

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            Récapitulatif
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                            Vérifiez vos billets et renseignez vos
                            informations avant le paiement.
                        </p>
                    </div>
                </div>

                {/* Reference */}
                <div className="mb-6 p-4 rounded-2xl border border-gray-200 dark:border-[var(--dark-border)] bg-gray-50 dark:bg-[var(--dark-surface)] shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs text-gray-400 dark:text-slate-500 uppercase tracking-wide">
                                Référence du panier
                            </p>

                            <p className="mt-1 font-mono text-sm sm:text-base text-gray-800 dark:text-slate-200 break-all">
                                {basket.reference}
                            </p>
                        </div>

                        <div className="hidden sm:flex w-10 h-10 rounded-xl bg-[var(--primary)]/10 items-center justify-center">
                            <Ticket className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_340px] gap-6">

                    {/* Tickets */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">
                                Vos billets
                            </h2>

                            <span className="text-sm text-gray-500 dark:text-slate-400">
                                {totalTickets} billet(s)
                            </span>
                        </div>

                        {basket.tickets?.map((ticket) => {
                            const hasPromo =
                                ticket.promo_code_price !== null &&
                                ticket.promo_code_price !== undefined;

                            return (
                                <div
                                    key={ticket.ticket_id}
                                    className="rounded-2xl border border-gray-200 dark:border-[var(--dark-border)] bg-gray-50 dark:bg-[var(--dark-surface)] p-5 shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 min-w-0">
                                            <div className="w-11 h-11 shrink-0 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                                                <Ticket className="w-5 h-5 text-[var(--primary)]" />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-base sm:text-lg">
                                                    {ticket.name}
                                                </h3>

                                                {ticket.description && (
                                                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                                                        {ticket.description}
                                                    </p>
                                                )}

                                                <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                                                    Quantité :{" "}
                                                    <span className="text-gray-900 dark:text-slate-200 font-medium">
                                                        {ticket.quantity}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <p className="font-semibold text-base sm:text-lg">
                                                {formatPrice(ticket.subtotal)}{" "}
                                                FCFA
                                            </p>

                                            <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                                                Sous-total
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 pt-4 border-t border-gray-200 dark:border-[var(--dark-border)]">
                                        <div className="grid sm:grid-cols-2 gap-3">

                                            <div>
                                                <p className="text-xs text-gray-400 dark:text-slate-500 mb-1">
                                                    Prix unitaire
                                                </p>

                                                <div className="flex items-center gap-2">
                                                    {hasPromo && (
                                                        <span className="text-sm text-gray-400 dark:text-slate-500 line-through">
                                                            {formatPrice(
                                                                ticket.regular_price
                                                            )}{" "}
                                                            FCFA
                                                        </span>
                                                    )}

                                                    <span className="font-medium text-gray-900 dark:text-slate-200">
                                                        {formatPrice(
                                                            hasPromo
                                                                ? ticket.promo_code_price
                                                                : ticket.regular_price
                                                        )}{" "}
                                                        FCFA
                                                    </span>
                                                </div>
                                            </div>

                                            {hasPromo && (
                                                <div>
                                                    <p className="text-xs text-gray-400 dark:text-slate-500 mb-1">
                                                        Réduction
                                                    </p>

                                                    <div className="flex items-center gap-2">
                                                        <Tag className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />

                                                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                                            {ticket.remise}
                                                            {ticket.remise_is_percent
                                                                ? "%"
                                                                : " FCFA"}{" "}
                                                            de réduction
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="lg:sticky lg:top-6 h-fit space-y-6">

                        {/* Customer information */}
                        <div className="rounded-2xl border border-gray-200 dark:border-[var(--dark-border)] bg-gray-50 dark:bg-[var(--dark-surface)] p-5 sm:p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-5">
                                Vos informations
                            </h2>

                            <div className="space-y-4">
                                <Input
                                    label="Prénom"
                                    isRequired
                                    icon={User}
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Jean"
                                    error={formErrors.first_name}
                                />

                                <Input
                                    label="Nom"
                                    isRequired
                                    icon={User}
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Dupont"
                                    error={formErrors.last_name}
                                />

                                <Input
                                    label="Email"
                                    isRequired
                                    icon={Mail}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jean@email.com"
                                    error={formErrors.email}
                                />

                                <Input
                                    label="Téléphone"
                                    isRequired
                                    icon={Phone}
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="97000000"
                                    error={formErrors.phone}
                                />
                            </div>

                            {formErrors.general && (
                                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                                    <p className="text-sm text-red-500 dark:text-red-400">
                                        {formErrors.general}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Total */}
                        <div className="rounded-2xl border border-gray-200 dark:border-[var(--dark-border)] bg-gray-50 dark:bg-[var(--dark-surface)] p-5 sm:p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-6">
                                Total
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-slate-400">
                                        Billets
                                    </span>

                                    <span className="text-gray-800 dark:text-slate-200">
                                        {totalTickets}
                                    </span>
                                </div>

                                <div className="h-px bg-gray-200 dark:bg-[var(--dark-border)]" />

                                <div className="flex items-end justify-between gap-4">
                                    <span className="text-gray-700 dark:text-slate-300">
                                        Total à payer
                                    </span>

                                    <span className="text-2xl font-bold text-[var(--primary)] text-right">
                                        {formatPrice(basket.total_amount)}{" "}
                                        FCFA
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                type="button"
                                isLoading={createOrder.isPending}
                                loadingText="Création de la commande..."
                                onClick={handlePayment}
                                className="w-full mt-6 py-3.5"
                            >
                                <CreditCard className="w-5 h-5 mr-2 inline-block" />
                                Passer au paiement
                            </Button>

                            <div className="flex items-start gap-2 mt-4">
                                <ShieldCheck className="w-4 h-4 text-gray-400 dark:text-slate-500 shrink-0 mt-0.5" />

                                <p className="text-xs leading-relaxed text-gray-400 dark:text-slate-500">
                                    Vos informations seront utilisées pour
                                    créer votre commande et vous transmettre
                                    les informations relatives à vos billets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasketSummary;