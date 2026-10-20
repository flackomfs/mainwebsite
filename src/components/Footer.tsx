import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { TRANSLATIONS } from '../data/healthCenters';
import { AccessibilitySettings } from '../types';

interface FooterProps {
  settings: AccessibilitySettings;
  onNavigateSection: (sectionId: string) => void;
  onOpenSettingsModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigateSection,
  onOpenSettingsModal,
}) => {
  const t = TRANSLATIONS[settings.language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Wordmark & Public Mission */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700 font-bold text-white text-xs">
                +
              </span>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                Pateros HealthLink
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Central Health Portal for the Municipality of Pateros, Metro Manila. Connecting community members to the 5 Barangay Health Centers with real-time operational status and online scheduling gateways.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Public Health Capstone Project</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Portal Directory
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('health-centers')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  5 Barangay Health Centers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('status-board')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  Real-Time Operational Status Board
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  Universal Health Care Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('emergency')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  Emergency Directory & 911
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                >
                  About the Capstone Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: 5 Health Centers Direct Registry */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              5 Health Center Units
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>01. Aguho Health Center</li>
              <li>02. Magtanggol Health Center</li>
              <li>03. Santa Ana Health Center</li>
              <li>04. San Roque Health Center</li>
              <li>05. Sto. Rosario Health Center</li>
            </ul>
            <div className="mt-3">
              <button
                type="button"
                onClick={onOpenSettingsModal}
                className="text-xs font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Configure Destination URLs &rarr;
              </button>
            </div>
          </div>

          {/* Col 4: Pateros Municipal Office Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Municipal Health Office
            </h4>
            <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Pateros Municipal Hall, G. de Borja St., Poblacion, Pateros, Metro Manila 1620
            </p>
            <p className="mt-2 text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
              Tel: (02) 8642-5120
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Emergency: 911 / (02) 8641-7890
            </p>
          </div>
        </div>

        {/* Bottom Sub-strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row dark:border-slate-800 dark:text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Pateros HealthLink. Developed for Capstone Academic Evaluation.
          </div>

          <div className="flex items-center gap-4">
            <span>Republic Act 11223 Compliant</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
