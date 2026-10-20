import React from 'react';
import { BookOpen, ShieldCheck, Layers, GitBranch, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/healthCenters';
import { AccessibilitySettings } from '../types';

interface AboutSectionProps {
  settings: AccessibilitySettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  const t = TRANSLATIONS[settings.language];

  return (
    <section id="about" className="border-b border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left info column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <BookOpen className="h-4 w-4" />
              <span className="uppercase tracking-wider">Academic Capstone Research & Portal</span>
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {t.aboutTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {t.aboutDesc}
            </p>

            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-950 dark:bg-emerald-950/30">
              <div className="flex items-start gap-3">
                <HeartHandshake className="mt-1 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    Universal Health Care (UHC) RA 11223
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    This portal aligns with the national primary health care reform mandate to ensure equitable, transparent, and technology-empowered health service delivery across all barangay stations in Pateros.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right architectural features bento */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                Centralized Gateway Architecture
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Acts as the single point of entry for residents. Maintains directory registries, real-time operating hours, and seamless routing to each health center.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                <GitBranch className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                5 Modular Center Endpoints
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connects directly to each independent barangay health site (Aguho, Magtanggol, Santa Ana, San Roque, Sto. Rosario) for appointments and local triage.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                Real-Time Operational Indicators
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Automatically computes Philippine Standard Time (PHT) clinic schedules, lunch breaks, and countdowns so patients know before visiting.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                Accessibility-First Design
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Built with multi-level text scaling, high-contrast mode, bilingual English and Filipino options, and clear navigation icons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
