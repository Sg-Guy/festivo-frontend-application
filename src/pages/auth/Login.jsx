import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Zap,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  LockIcon,
} from "lucide-react";
import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";
import { navigateTo } from "../../utils/navigation";
import Modal from "../../Components/ui/Modal";
import { set } from "date-fns";
import { useLogin, useForgotPassword } from "../../hooks/useAuth";
import PasswordInput from "../../Components/ui/PasswordInput";
import { ROUTES } from "../../constants/routes";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const { mutate: loginUser, isPending } = useLogin();

  const onSubmit = (data) => {
    loginUser(data);
  };

  const { mutate: forgotPassword, isForgotPasswordPending } =
    useForgotPassword();

  const handleForgotPassword = () => {
    setForgotPasswordError("");

    forgotPassword(
      {
        email: forgotPasswordEmail,
      },
      {
        onError: (error) => {
          const message = error.response?.data?.errors?.email?.[0];

          if (message) {
            setForgotPasswordError(message);
          }
        },
      },
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark-background)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center space-x-2">
          <div className="bg-[var(--primary)] p-2 rounded-xl text-white shadow-md shadow-orange-600/25">
            <Zap size={22} />
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-gray-900 dark:text-[var(--dark-text)]">
            FESTIVO
          </span>
        </Link>
      </div>

      {/* Carte de connexion */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[var(--dark-surface)] py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-gray-100 dark:border-[var(--dark-border)] transition-colors duration-200">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-[var(--dark-text)] tracking-tight">
                Bon retour
              </h2>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Connectez-vous à votre espace FESTIVO
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Adresse e-mail"
              type="email"
              placeholder="vous@email.com"
              isRequired={true}
              icon={Mail}
              {...register("email", { required: "L'email est requis" })}
              error={errors.email?.message}
            />
            <PasswordInput
              name="password_confirmation"
              label="Mot de passe"
              icon={LockIcon}
              placeholder="••••••••"
              {...register("password", {
                required: "Le mot de passe est requis",
              })}
              error={errors.password?.message}
            />

            <button
              type="button"
              onClick={() => setIsForgotPasswordModalOpen(true)}
              className="w-full flex justify-end text-xs sm:text-sm font-medium text-[var(--primary)] hover:underline"
            >
              Mot de passe oublié ?
            </button>

            <Modal
              isOpen={isForgotPasswordModalOpen}
              onClose={() => {
                setIsForgotPasswordModalOpen(false);
                setForgotPasswordEmail("");
              }}
              title="Réinitialisation du mot de passe."
              children={
                <div className="gap-3">
                  <Input
                    type="email"
                    placeholder="Entrez votre adresse email."
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    icon={Mail}
                    error={forgotPasswordError}
                  />
                  <br />
                  <div className="flex justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleForgotPassword}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      isLoading={isForgotPasswordPending}
                      loadingText="Envoi..."
                      onClick={handleForgotPassword}
                    >
                      <span>Recevoir le lien</span>
                    </Button>
                  </div>
                </div>
              }
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isPending}
              className="mt-2 group"
              loadingText="Connexion..."
            >
              Se connecter
              <span className="transform group-hover:translate-x-1 transition-transform ml-3">
                →
              </span>
            </Button>
          </form>

          {/* Séparateur */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-[var(--dark-border)]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[var(--dark-surface)] px-3 text-gray-400 font-medium">
                ou continuer avec
              </span>
            </div>
          </div>

          {/* Utilisation du composant Button en mode "secondary" */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsMobileModalOpen(true)}
          >
            <Smartphone size={18} className="text-[var(--primary)] mr-2" />
            <span>Numéro De Téléphone</span>
          </Button>

          <Modal
            isOpen={isMobileModalOpen}
            onClose={() => setIsMobileModalOpen(false)}
            title="Recevoir un code de connexion"
            children={
              <div className="gap-3">
                <Input
                  type="text"
                  placeholder="Entrez votre numéro de téléphone"
                />
                <br />
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setIsMobileModalOpen(false)}
                >
                  <Smartphone
                    size={18}
                    className="text-[var(--secondary)] mr-2"
                  />
                  <span>Récevoir le code</span>
                </Button>
              </div>
            }
          />

          <p className="mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Pas encore de compte ? 
            <Link
              to={ROUTES.REGISTER}
              className="ml-1 text-[var(--primary)] font-semibold hover:underline"
            >
               Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
