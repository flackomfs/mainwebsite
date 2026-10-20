import React from 'react';
import { X, Calendar, Info, ExternalLink, MapPin, Phone, Clock, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { HealthCenter, AccessibilitySettings, StatusSimulationMode } from '../types';
import { computeCenterOperationalStatus } from '../utils/statusCalculator';
import { TRANSLATIONS } from '../data/healthCenters';

interface CenterDetailsModalProps {
  center: HealthCenter | null;
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  simulationMode: StatusSimulationMode;
}

export const CenterDetailsModal: React.FC<CenterDetailsModalProps> = ({
  center,
  isOpen,
  onClose,
  settings,
  simulationMode,
}) => {
  if (!isOpen || !center) return null;

  const t = TRANSLATIONS[settings.language];
  const statusResult = computeCenterOperationalStatus(center, simulationMode);
  const isLangTl = settings.language === 'tl';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="center-details-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs animate-in fade-in"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 p-6 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold border ${statusResult.badgeColor}`}>
                <span className={`h-2 w-2 rounded-full ${statusResult.dotColor}`} />
                <span>{isLangTl ? statusResult.statusTextTl : statusResult.statusText}</span>
              </span>
              <span className="text-xs font-medium text-slate-500">{center.barangay}</span>
            </div>
            <h2 id="center-details-title" className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
              {center.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {center.address}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Quick Contact & Hours Box */}
          <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-950/60">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Clinic Hotline</p>
              <p className="mt-1 font-bold text-slate-900 dark:text-white">{center.contactNumber}</p>
              <p className="text-xs text-slate-500 mt-0.5">Emergency: {center.emergencyNumber}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Physician On Duty</p>
              <p className="mt-1 font-bold text-slate-900 dark:text-white">{center.headPhysician}</p>
              <p className="text-xs text-slate-500 mt-0.5">{center.email}</p>
            </div>
          </div>

          {/* Operating Schedule */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm mb-2">
              <Clock className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>Operating Schedule</span>
            </h3>
            <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs dark:border-slate-800 dark:divide-slate-800">
              <div className="flex justify-between p-2.5 bg-white dark:bg-slate-900">
                <span className="font-medium text-slate-700 dark:text-slate-300">Regular Weekdays (Mon - Fri)</span>
                <span className="font-semibold text-slate-900 dark:text-white">{center.operatingHours.weekdays}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50/50 dark:bg-slate-950/40">
                <span className="font-medium text-slate-700 dark:text-slate-300">Lunch Break (Triage Only)</span>
                <span className="font-semibold text-amber-700 dark:text-amber-400">{center.operatingHours.lunchBreak}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-white dark:bg-slate-900">
                <span className="font-medium text-slate-700 dark:text-slate-300">Saturday</span>
                <span className="font-semibold text-slate-900 dark:text-white">{center.operatingHours.saturday}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50/50 dark:bg-slate-950/40">
                <span className="font-medium text-slate-700 dark:text-slate-300">Sunday</span>
                <span className="font-semibold text-slate-500">{center.operatingHours.sunday}</span>
              </div>
            </div>
          </div>

          {/* Program Services & Patient Requirements */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>Available Programs & Patient Checklist</span>
            </h3>
            <div className="space-y-3">
              {center.services.map((srv) => (
                <div
                  key={srv.id}
                  className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                      {isLangTl ? srv.nameTl : srv.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                      {srv.availabilityDays}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {isLangTl ? srv.descriptionTl : srv.description}
                  </p>
                  <div className="mt-2.5 rounded-lg bg-slate-50 p-2 text-[11px] dark:bg-slate-800/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">What to Bring: </span>
                    <span className="text-slate-600 dark:text-slate-400">{srv.requirements.join(' • ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Direct Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="text-xs text-slate-500">
            Directly open this center's web pages:
          </div>
          <div className="flex items-center gap-2">
            <a
              href={center.urls.infoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Info className="h-3.5 w-3.5" />
              <span>Info Page</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
            <a
              href={center.urls.schedulingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Schedule Now</span>
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
