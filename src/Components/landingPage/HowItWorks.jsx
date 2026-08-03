import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Créez votre événement',
      description: 'Importez votre affiche, définissez vos tarifs et publiez en moins de 5 minutes.',
    },
    {
      number: '02',
      title: 'Partagez & vendez',
      description: 'Lien unique, QR code d\'affiche, widget embarqué — la billetterie vient à votre audience.',
    },
    {
      number: '03',
      title: 'Gérez en direct',
      description: 'Suivez les ventes, les entrées et les revenus sur votre tableau de bord en temps réel.',
    },
    {
      number: '04',
      title: 'Encaissez instantanément',
      description: 'Reversement automatique sur votre compte Mobile Money après chaque événement.',
    },
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 bg-white dark:bg-[#0d0f17] transition-colors duration-200">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <span className="text-orange-600 dark:text-orange-500 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 block">
          COMMENT ÇA MARCHE
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
          En 4 étapes simples
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-8 rounded-3xl bg-gray-50 dark:bg-[#131622] border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-orange-500/40 mb-6">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}