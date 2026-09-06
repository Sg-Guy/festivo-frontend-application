import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  Camera,
  Upload,
} from "lucide-react";
import Button from "../../Components/ui/Button";
import { useProfile, useUpdateProfile } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

export default function Profile() {
  const { data: user, isLoading: isProfileLoading } = useProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(null);

  // Pré-remplir les champs de React Hook Form dès que l'utilisateur est chargé
  useEffect(() => {
    if (user) {
      reset({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "", // reste vide pour la sécurité
      });
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user, reset]);

  // Gestion du changement d'avatar avec aperçu
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
      // TODO: Stocker le fichier dans un state si on veut l'envoyer en FormData plus tard
    }
  };

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const onSubmit = (data) => {
    // Nettoyer le mot de passe s'il est vide pour ne pas l'envoyer à Laravel pour rien
    const payload = { ...data };
    if (!payload.password) {
      delete payload.password;
    }

    updateProfile(payload);
  };

  if (isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark-background)] pb-24 pt-6 sm:pt-10 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Titre de la page */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--primary)] tracking-tight">
            Mon profil
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez vos informations personnelles et vos paramètres de sécurité.
          </p>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* CARTE RÉSUMÉ PROFIL & AVATAR */}
          <div className="lg:col-span-1 bg-white dark:bg-[var(--dark-surface)] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-[var(--dark-border)] flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              <div className="w-28 h-28 rounded-3xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center text-[var(--primary)] text-3xl font-black shadow-inner overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>
                    {user?.firstname?.[0]}
                    {user?.lastname?.[0]}
                  </span>
                )}
              </div>

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2.5 bg-[var(--primary)] text-white rounded-full shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <Camera size={16} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)]">
                {user?.firstname} {user?.lastname}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
              <div className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold pt-1">
                <CheckCircle2 size={14} />
                <span>
                  {user?.roles?.length > 0 ? user.roles[0].name : "Participant"}
                </span>
              </div>
            </div>

            <div className="w-full pt-2">
              <label
                htmlFor="avatar-upload"
                className="w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-[var(--dark-border)] text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[var(--dark-surface-soft)] transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Upload size={14} />
                <span>Modifier l'avatar</span>
              </label>
            </div>
          </div>

          {/* FORMULAIRE DÉTAILLÉ */}
          <div className="lg:col-span-2 bg-white dark:bg-[var(--dark-surface)] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[var(--dark-border)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)] mb-6">
              Informations personnelles
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* Prénom(s) et Nom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Prénom(s)
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      {...register("firstname")}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-sm text-gray-900 dark:text-[var(--dark-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Votre prénom"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Nom
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      {...register("lastname")}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-sm text-gray-900 dark:text-[var(--dark-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-sm text-gray-900 dark:text-[var(--dark-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    {...register("phone")}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-sm text-gray-900 dark:text-[var(--dark-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="+229 ..."
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Nouveau mot de passe{" "}
                  <span className="text-gray-400 font-normal">
                    (laisser vide pour ne pas modifier)
                  </span>
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-sm text-gray-900 dark:text-[var(--dark-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Bouton de sauvegarde */}
              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-orange-600/20"
                  loadingText="En cours..."
                  isLoading={isPending}
                >
                  Sauvegarder
                </Button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}