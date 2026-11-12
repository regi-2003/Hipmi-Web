import React from 'react';
import { useSettings } from '../lib/settings';

export const StatsBar: React.FC = () => {
  const s = useSettings();
  const STATS_DATA = [1, 2, 3, 4].map((n) => ({
    value: s[`stat_${n}_value`],
    suffix: s[`stat_${n}_suffix`],
    label: s[`stat_${n}_label`],
  }));

  return (
    <section className="bg-[#0f2552] border-t border-b border-blue-900/40 relative z-20 py-8 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS_DATA.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center px-4 ${
                index !== STATS_DATA.length - 1 ? 'lg:border-r lg:border-blue-800/60' : ''
              }`}
            >
              <div className="flex items-baseline justify-center font-black tracking-tight">
                <span className="text-4xl sm:text-5xl lg:text-6xl text-white font-sans drop-shadow-sm">
                  {item.value}
                </span>
                {item.suffix && (
                  <span className="text-2xl sm:text-3xl lg:text-4xl text-[#EAB308] font-black ml-0.5">
                    {item.suffix}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs sm:text-sm font-medium text-slate-300 tracking-wide uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
