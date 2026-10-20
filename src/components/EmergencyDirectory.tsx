import React, { useState } from 'react';
import { Phone, ShieldAlert, Copy, Check, Clock, ExternalLink } from 'lucide-react';
import { PATEROS_EMERGENCY_HOTLINES, TRANSLATIONS } from '../data/healthCenters';
import { AccessibilitySettings } from '../types';

interface EmergencyDirectoryProps {
  settings: AccessibilitySettings;
}

export const EmergencyDirectory: React.FC<EmergencyDirectoryProps> = ({ settings }) => {
  const t = TRANSLATIONS[settings.language];
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <section id="emergency" className="border-b border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-400">
              <ShieldAlert className="h-4 w-4" />
              <span className="uppercase tracking-wider">Emergency & Triage Dispatch</span>
              <span aria-hidden="true">·</span>
              <span>Pateros Public Safety</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {t.emergencyTitle}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              {t.emergencySubtitle}
            </p>
          </div>

          {/* 911 quick banner */}
          <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-900/50 dark:bg-rose-950/40">
            <span className="text-3xl font-extrabold text-rose-700 dark:text-rose-400 font-mono">911</span>
            <div className="text-xs">
              <p className="font-bold text-slate-900 dark:text-white">National Emergency Hotline</p>
              <p className="text-slate-600 dark:text-slate-400">Direct police, rescue, or ambulance</p>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PATEROS_EMERGENCY_HOTLINES.map((hotline, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm dark:text-white">
                    {hotline.name}
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 whitespace-nowrap">
                    {hotline.available}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {hotline.description}
                </p>

                {/* Telephone Number Display */}
                <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                  <span className="font-mono text-sm font-extrabold text-slate-900 dark:text-white">
                    {hotline.number}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(hotline.number)}
                      className="rounded-md p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                      title="Copy number"
                      aria-label="Copy phone number"
                    >
                      {copiedNumber === hotline.number ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <a
                      href={`tel:${hotline.number.split('/')[0].replace(/[^0-9]/g, '')}`}
                      className="rounded-md bg-emerald-700 p-1.5 text-white hover:bg-emerald-800"
                      title="Call directly"
                      aria-label={`Call ${hotline.name}`}
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
