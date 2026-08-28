import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Building2 } from "lucide-react";
import api from "../../api/axios";
import Spinner from "../../Components/ui/Spinner";
import { is } from "date-fns/locale";
import { useAcceptInvitation } from "../../hooks/useMembers";
import { navigateTo } from "../../utils/navigation";
import { ROUTES } from "../../constants/routes";

export default function AcceptInvitation() {
  const [searchParams] = useSearchParams();
  const invitationToken = searchParams.get("token");
  const navigate = useNavigate();

  const { mutate: acceptInvitation } = useAcceptInvitation(invitationToken);

  useEffect(() => {
    if (!invitationToken) {
      navigateTo(ROUTES.HOME, { replace: true }); // a revoiur
      return;
    }

    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      //Non connecté
      localStorage.setItem("pending_invitation_token", invitationToken);
      setTimeout(navigateTo("/auth/login?invitation=true", { replace: true }));
      return;
    } else {
      //Connecté : 
      acceptInvitation();
      localStorage.removeItem("pending_invitation_token");
      setTimeout(navigateTo("/organizations", { replace: true }), 2000);
    }
  }, [invitationToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[var(--dark-background)] px-4">
      <div className="bg-white dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-8 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[var(--primary)] mx-auto">
          <Building2 size={32} />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)]">
          Validation de l'invitation en cours...
        </h1>
        <Spinner />
      </div>
    </div>
  );
}
