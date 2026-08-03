import React from 'react';
import { Sparkles, Smartphone, WifiOff, ShieldCheck, BarChart3, Users } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'Billetterie IA',
      description: 'Génération automatique de templates avec détection de zones dynamiques par intelligence artificielle.',
    },
    {
      icon: Smartphone,
      title: 'Paiement Mobile',
      description: 'MTN MoMo, Moov Money, Celtis Cash — paiement en 2 clics depuis n\'importe quel téléphone.',
    },
    {
      icon: WifiOff,
      title: 'Contrôle Hors-ligne',
      description: 'Scan des QR codes sans connexion internet. Synchronisation automatique à la reconnexion.',
    },
    {
      icon: ShieldCheck,
      title: 'Billetterie Sécurisée',
      description: 'Chaque billet est unique et cryptographiquement signé. Zéro fraude possible.',
    },
    {
      icon: BarChart3,
      title: 'Analytics en Temps Réel',
      description: 'Taux de remplissage, revenus, méthodes de paiement — tout en direct.',
    },
    {
      icon: Users,
      title: 'Gestion Multi-rôles',
      description: 'Organisateurs, contrôleurs, acheteurs — une plateforme, des accès sur mesure.',
    },
  ];

  return (
    <section id="features" className="w-full py-20 px-4 sm:px-6 bg-gray-50/50 dark:bg-[#0a0c14] transition-colors duration-200">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <span className="text-orange-600 dark:text-orange-500 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 block">
          FONCTIONNALITÉS
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Tout ce dont vous avez besoin
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
          De la création à l'encaissement, FESTIVO couvre chaque étape de votre événement.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white dark:bg-[#131622] border border-gray-200 dark:border-gray-800 shadow-xl hover:border-orange-500/50 transition group"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 group-hover:scale-110 transition-transform">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}