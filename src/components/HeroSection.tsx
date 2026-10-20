import React from 'react';
import { Search, Clock, ShieldCheck, MapPin, ExternalLink, Activity, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data/healthCenters';
import { AccessibilitySettings } from '../types';

interface HeroSectionProps {
  settings: AccessibilitySettings;
  currentTimeString: string;
  currentDateString: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  currentTimeString,
  currentDateString,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onExploreClick,
}) => {
  const t = TRANSLATIONS[settings.language];

  const quickCategories = [
    { id: 'all', label: settings.language === 'en' ? 'All Centers (5)' : 'Lahat ng Sentro (5)' },
    { id: 'immunization', label: settings.language === 'en' ? 'Child Vaccines / EPI' : 'Bakuna sa Bata' },
    { id: 'maternal', label: settings.language === 'en' ? 'Maternal & Prenatal' : 'Buntis & Prenatal' },
    { id: 'dental', label: settings.language === 'en' ? 'Dental Clinic' : 'Pangangalaga sa Ngipin' },
    { id: 'senior', label: settings.language === 'en' ? 'Senior Care & Maintenance' : 'Gamot sa Senior' },
    { id: 'tbdots', label: settings.language === 'en' ? 'TB-DOTS Program' : 'Sentro sa Baga / TB' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white py-10 lg:py-14 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          {/* Left Column: Heading, Proposition, Search, Live PHT Indicator */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  {t.heroTag}
                </span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-slate-600 dark:text-slate-400">Pateros Municipal Health Office</span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-slate-600 dark:text-slate-400">Metro Manila</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white" style={{ textWrap: 'balance' }}>
                {t.heroHeading}
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                {t.heroDesc}
              </p>

              {/* Live Manila Standard Time Indicator Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs sm:text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
                <div className="flex items-center gap-2 font-mono font-semibold text-emerald-700 dark:text-emerald-400 tabular-nums">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{currentTimeString}</span>
                </div>
                <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
                <span className="text-slate-600 dark:text-slate-400">{currentDateString}</span>
                <span aria-hidden="true" className="hidden sm:inline text-slate-300 dark:text-slate-700">·</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Standard Clinic Hours: 8:00 AM – 5:00 PM</span>
              </div>

              {/* Search & Filter Bar */}
              <div className="mt-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    aria-label={t.searchPlaceholder}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Interactive Category Buttons */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">Quick Filter:</span>
                  {quickCategories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => onSelectCategory(cat.id)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 transition-colors whitespace-nowrap shrink-0"
              >
                {t.findCenterBtn}
              </button>
              <a
                href="#emergency"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {t.emergencyHotlinesBtn}
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Fallback & Portal Overview */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs lg:col-span-5 dark:border-slate-800 dark:bg-slate-950">
            {/* Visual Photo Card */}
            <div className="relative h-64 w-full sm:h-72 lg:h-80 overflow-hidden bg-slate-200 dark:bg-slate-800">
              <img
                src="/src/assets/images/pateros_health_hero_1792508427917.jpg"
                alt="Pateros Community Health Center Reception and Medical Clinic"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback container if image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('flex', 'items-center', 'justify-center', 'p-6', 'text-slate-500');
                    parent.innerHTML = '<div class="text-center"><span class="font-bold text-lg text-emerald-800">Pateros Community Health Center</span><p class="text-xs text-slate-500 mt-1">Barangay Health System</p></div>';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <img
                    src="/src/assets/images/pateros_health_emblem_1792508426837.jpg"
                    alt="Pateros Health Seal Emblem"
                    className="h-9 w-9 rounded-full border-2 border-white/80 bg-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-bold leading-tight">Municipality of Pateros</p>
                    <p className="text-[11px] text-emerald-300">5 Accredited Barangay Health Units</p>
                  </div>
                </div>
                <div className="rounded-md bg-white/20 px-2 py-1 text-[11px] font-semibold backdrop-blur-xs">
                  Active Portal
                </div>
              </div>
            </div>

            {/* Fast Stats Strip below photo */}
            <div className="grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 bg-white p-4 text-center dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">5</p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Health Centers</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">100%</p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Free Check-ups</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">24/7</p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">MDRRMO Rescue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
