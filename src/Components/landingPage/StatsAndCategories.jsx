import React from 'react';
import { Music, Mic, Trophy, Sparkles, PartyPopper, BookOpen, Flame, Utensils } from 'lucide-react';

export default function StatsAndCategories() {
  const stats = [
    { value: '48K+', label: 'Billets vendus' },
    { value: '312', label: 'Événements actifs' },
    { value: '2.8M', label: 'FCFA traités / jour' },
    { value: '99.4%', label: 'Taux de satisfaction' },
  ];

  const categories = [
    { name: 'Concerts', icon: Music },
    { name: 'Conférences', icon: Mic },
    { name: 'Sports', icon: Trophy },
    { name: 'Spectacles', icon: Sparkles },
    { name: 'Soirées', icon: PartyPopper },
    { name: 'Formations', icon: BookOpen },
    { name: 'Gospel', icon: Flame },
    { name: 'Gastronomie', icon: Utensils },
  ];

  return (
    <section className="w-full py-12 px-4 sm:px-6 bg-white dark:bg-[#0d0f17] transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-[#131622] border border-gray-200 dark:border-gray-800 shadow-xl mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-2xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-500 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Catégories de filtres */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <button
                key={index}
                className="flex items-center space-x-2 px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-[#131622] dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap transition shadow-sm"
              >
                <Icon size={16} className="text-orange-500" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}