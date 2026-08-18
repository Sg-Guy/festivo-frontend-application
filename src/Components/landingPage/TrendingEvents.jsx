import React from 'react';
 import { Music, Mic, Award, ChevronRight } from 'lucide-react';
import { Events} from '../../mock/events.mock';

export default function TrendingEvents() {
 
    const events = Events ;

  return (
    <section id="events" className="w-full py-20 px-4 sm:px-6 bg-gray-50/50 dark:bg-[#0a0c14] transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <span className="text-orange-600 dark:text-orange-500 text-xs sm:text-sm font-bold tracking-widest uppercase mb-2 block">
              ÉVÉNEMENTS À VENIR
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Tendance au Bénin
            </h2>
          </div>
          <a
            href="#all-events"
            className="mt-4 sm:mt-0 flex items-center space-x-1 text-orange-600 dark:text-orange-500 font-semibold hover:underline"
          >
            <span>Voir tout</span>
            <ChevronRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt, index) => {
            const Icon = evt.icon;
            return (
              <div
                key={index}
                className="rounded-3xl bg-white dark:bg-[#131622] border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden flex flex-col justify-between group hover:border-orange-500/50 transition"
              >
                <div className="h-48 bg-gray-100 dark:bg-[#1a1d2e] flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <Icon size={32} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    {evt.date}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-extrabold text-orange-600 dark:text-orange-400">
                      {evt.price}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {evt.progress} rempli
                    </span>
                  </div>
                  {/* Barre de progression */}
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: evt.progress }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}