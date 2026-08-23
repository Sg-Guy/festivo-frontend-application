import { useState } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { LockKeyhole, ArrowLeft, Lock, EyeOff, Eye, LockIcon } from "lucide-react";

import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";
import { useResetPassword } from "../../hooks/useAuth";
import PasswordInput from "../../Components/ui/PasswordInput";
import { ROUTES } from "../../constants/routes";

export default function ResetPassword() {
  const { token } = useParams();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  const { mutate: resetPassword, isPending } = useResetPassword();

  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors({});

    if (!email || !token) {
      return;
    }

    resetPassword(
      {
        token,
        email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      },
      {
        onError: (error) => {
          const validationErrors = error.response?.data?.errors;

          if (validationErrors) {
            setErrors(validationErrors);
          }
        },
      },
    );
  };

  const isLinkInvalid = !token || !email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[var(--dark-background)] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--primary)] text-white shadow-lg shadow-orange-500/20 mb-4">
            <LockKeyhole size={26} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-[var(--dark-text)]">
            Réinitialiser le mot de passe
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Définissez un nouveau mot de passe pour sécuriser votre compte.
          </p>
        </div>

        <div className="bg-white dark:bg-[var(--dark-surface)] rounded-3xl border border-gray-100 dark:border-[var(--dark-border)] shadow-xl p-6 sm:p-8">
          {isLinkInvalid ? (
            <InvalidResetLink />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <Input
                type="email"
                label="Adresse email"
                value={email}
                disabled
              />

              <PasswordInput
                name="password"
                label="Nouveau mot de passe"
                icon = {LockIcon}
                placeholder="Entrez votre nouveau mot de passe"
                value={formData.password}
                onChange={handleChange}
                error={errors.password?.[0]}
                isRequired
                autoComplete="new-password"
              />

              <PasswordInput
                name="password_confirmation"
                label="Confirmer le mot de passe"
                icon = {LockIcon}
                placeholder="Confirmez votre nouveau mot de passe"
                value={formData.password_confirmation}
                onChange={handleChange}
                error={errors.password_confirmation?.[0]}
                isRequired
                autoComplete="new-password"
              />

              {/* General API error */}
              {errors.general && (
                <p className="text-sm text-red-500">{errors.general}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                isLoading={isPending}
                loadingText="Réinitialisation..."
                className="w-full py-3.5 rounded-xl"
              >
                Réinitialiser le mot de passe
              </Button>
            </form>
          )}
        </div>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <Link
            to={ROUTES.LOGIN}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            <ArrowLeft size={16} />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

function InvalidResetLink() {
  return (
    <div className="text-center py-4">
      <div className="w-12 h-12 mx-auto rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center mb-4">
        <LockKeyhole size={22} className="text-red-500" />
      </div>

      <h2 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)]">
        Lien invalide
      </h2>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Le lien de réinitialisation est invalide ou incomplet.
      </p>

      <Link
        to="/auth/login"
        className="inline-block mt-5 text-sm font-semibold text-[var(--primary)] hover:underline"
      >
        Retour à la connexion
      </Link>
    </div>
  );
}
