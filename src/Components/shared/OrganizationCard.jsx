import { Building2, Plus, Eye, Edit, Archive, Phone, Mail } from "lucide-react";

export default function OrganizationCard({ org }) {
  return;
  <div className="bg-white dark:bg-[var(--dark-background)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-6 shadow-xl shadow-gray-100 dark:shadow-none flex flex-col justify-between transition hover:border-[var(--primary)]/50">
    <div>
      <div className="flex justify-end space-between">
        <span className="text-sm">{org.members_count} Membres</span>
        <span className="text-sm">{org.events_count} Evenements</span>
      </div>
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[var(--primary)] font-bold text-lg flex-shrink-0">
          <Building2 size={24} />
        </div>
        <div className="overflow-hidden">
          <h3 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)] truncate">
            {org.name}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">
            {org.description || "Aucune description fournie."}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-6 text-xs text-gray-600 dark:text-gray-300">
        {org.email && (
          <div className="flex items-center space-x-2">
            <Mail size={14} className="text-gray-400" />
            <span>{org.email}</span>
          </div>
        )}
        {org.organization_phone && (
          <div className="flex items-center space-x-2">
            <Phone size={14} className="text-gray-400" />
            <span>{org.organization_phone}</span>
          </div>
        )}
      </div>
    </div>

    {/* Actions */}
    <div className="pt-4 border-t border-gray-100 dark:border-[var(--dark-border)] flex items-center justify-between">
      <Link
        to={`/organizations/${org.id}`}
        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[var(--primary)] hover:underline"
      >
        <Eye size={16} />
        <span>Voir</span>
      </Link>

      <div className="flex items-center space-x-3">
        <Link
          to={`/organizations/${org.id}/edit`}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface)] transition"
          title="Modifier"
        >
          <Edit size={16} />
        </Link>
        <button
          onClick={() => handleArchive(org.id)}
          className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
          title="Archiver"
        >
          <Archive size={16} />
        </button>
      </div>
    </div>
  </div>;
}
