import React from 'react';
import {
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Smile,
  Activity,
  Users,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { PATEROS_SERVICES, TRANSLATIONS } from '../data/healthCenters';
import { AccessibilitySettings } from '../types';

interface ServicesMatrixProps {
  settings: AccessibilitySettings;
  onFilterByService: (serviceCategory: string) => void;
  selectedCategory: string;
}

export const ServicesMatrix: React.FC<ServicesMatrixProps> = ({
  settings,
  onFilterByService,
  selectedCategory,
}) => {
  const t = TRANSLATIONS[settings.language];
  const isLangTl = settings.language === 'tl';

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'general':
        return <Stethoscope className="h-5 w-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />;
      case 'maternal':
        return <HeartPulse className="h-5 w-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />;
      case 'immunization':
        return <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />;
      case 'dental':
        return <Smile className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />;
      case 'senior':
        return <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />;
      case 'tbdots':
        return <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />;
      case 'family_planning':
        return <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />;
    }
  };

  return (
    <section id="services" className="border-b border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span className="uppercase tracking-wider">Universal Health Care Services</span>
            <span aria-hidden="true">·</span>
            <span>Free for Pateros Residents</span>
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {t.servicesTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* 7 Services Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PATEROS_SERVICES.map((service) => {
            const isSelected = selectedCategory === service.category;

            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-sm dark:border-emerald-500 dark:bg-emerald-950/30'
                    : 'border-slate-200 bg-white shadow-2xs hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div>
                  {/* Icon & Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                      {getServiceIcon(service.category)}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    {isLangTl ? service.nameTl : service.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isLangTl ? service.descriptionTl : service.description}
                  </p>

                  {/* Schedule days */}
                  <div className="mt-4 flex items-start gap-1.5 rounded-lg bg-slate-50 p-2 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                    <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" />
                    <span className="font-medium text-[11px]">{service.availabilityDays}</span>
                  </div>

                  {/* Requirements */}
                  <div className="mt-3">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Required Documents:</p>
                    <ul className="mt-1 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                      {service.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-emerald-600" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Filter action button */}
                <div className="mt-5 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterByService(isSelected ? 'all' : service.category);
                      const el = document.getElementById('health-centers');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{isSelected ? 'Showing Filtered Centers' : 'Find Health Centers With This Service'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
