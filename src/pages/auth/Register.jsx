import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft, Zap, Check, Phone, Mail, LockIcon } from "lucide-react";
import { navigateTo } from "../../utils/navigation";
import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";
import { useRegister } from "../../hooks/useAuth";

export default function Register() {
  const fields = [
    {
      name: "phone",
      label: "Téléphone",
      icon: Phone,
      placeholder: "01 97...",
      type: "tel",
      isRequired: true,
    },
    {
      name: "email",
      label: "Adresse e-mail",
      icon: Mail,
      placeholder: "vous@...",
      type: "email",
      isRequired: true,
    },
    {
      name: "password",
      label: "Mot de passe",
      icon: LockIcon,
      placeholder: "8 caractères...",
      type: "password",
      isRequired: true,
    },
  ];

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate: registerUser, isPending } = useRegister();

  const handleRegister = (data) => {
    registerUser(data, {
      onError: (error) => {
        const validationErrors = error.response?.data?.errors;

        if (validationErrors) {
          Object.entries(validationErrors).forEach(([field, messages]) => {
            setError(field, {
              type: "server",
              message: messages[0],
            });
          });
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark-background)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className="bg-[var(--primary)] p-2 rounded-xl text-white shadow-md shadow-orange-600/25">
            <Zap size={22} />
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-gray-900 dark:text-[var(--dark-text)]">
            FESTIVO
          </span>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-[var(--dark-surface)] py-8 px-6 shadow-xl rounded-2xl border border-gray-100 dark:border-[var(--dark-border)] sm:px-10 transition-colors duration-200">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[var(--primary)] dark:hover:text-[var(--primary)] mb-6 transition"
          >
            <ArrowLeft size={16} className="mr-2" /> Retour
          </Link>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-[var(--dark-text)] tracking-tight">
              Vos informations
            </h2>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nom"
                {...register("lastname", { required: "Ce champ est requis ." })}
                placeholder="DOE"
                isRequired={true}
                error={errors.lastname?.message}
              />
              <Input
                label="Prénoms"
                {...register("firstname", {
                  required: "Ce champ est requis .",
                })}
                placeholder="John"
                isRequired={true}
                error={errors.firstname?.message}
              />
            </div>
            {fields.map((field) => (
              <Input
                key={field.name}
                {...field}
                {...register(field.name)}
                error={errors[field.name]?.message}
              />
            ))}
            <p className="text-xs sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              En vous inscrivant, vous acceptez nos
              <a
                href="#"
                className="ml-1 mr-1 text-[var(--primary)] hover:underline font-medium"
              >
                Conditions d'utilisation
              </a>
              et notre
              <a
                href="#"
                className="ml-1 text-[var(--primary)] hover:underline font-medium"
              >
                Politique de confidentialité
              </a>
              .
            </p>
            <Button
              type="submit"
              variant="primary"
              isLoading={isPending}
              className="mt-2 group"
              loadingText="En cours ..."
            >
              Créer mon Compte
              <span className="transform group-hover:translate-x-1 transition-transform ml-3">
                →
              </span>
            </Button>
          </form>
          <p className="mt-5 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Vous avez déjà un compte ?
            <Link
              to="/auth/login"
              className="text-[var(--primary)] font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
