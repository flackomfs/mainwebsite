import React from 'react';
import {
  Calendar,
  Info,
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Smile,
  Activity,
  Users,
  AlertCircle,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { HealthCenter, AccessibilitySettings, StatusSimulationMode } from '../types';
import { computeCenterOperationalStatus } from '../utils/statusCalculator';
import { TRANSLATIONS } from '../data/healthCenters';

interface HealthCenterCardProps {
  center: HealthCenter;
  settings: AccessibilitySettings;
  simulationMode: StatusSimulationMode;
  onOpenDetails: (center: HealthCenter) => void;
  onOpenPreview: (url: string, title: string) => void;
}

export const HealthCenterCard: React.FC<HealthCenterCardProps> = ({
  center,
  settings,
  simulationMode,
  onOpenDetails,
  onOpenPreview,
}) => {
  const t = TRANSLATIONS[settings.language];
  const statusResult = computeCenterOperationalStatus(center, simulationMode);
  const isLangTl = settings.language === 'tl';
  const statusLabel = isLangTl ? statusResult.statusTextTl : statusResult.statusText;

  // Render proper icon for each service
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />;
      case 'HeartPulse':
        return <HeartPulse className="h-3.5 w-3.5 shrink-0 text-rose-500" aria-hidden="true" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-blue-500" aria-hidden="true" />;
      case 'Smile':
        return <Smile className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />;
      case 'Activity':
        return <Activity className="h-3.5 w-3.5 shrink-0 text-indigo-500" aria-hidden="true" />;
      case 'Users':
        return <Users className="h-3.5 w-3.5 shrink-0 text-teal-500" aria-hidden="true" />;
      default:
        return <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-500" aria-hidden="true" />;
    }
  };

  return (
    <article
      className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby={`center-title-${center.id}`}
    >
      {/* Top Header Card Zone */}
      <div className="p-6">
        {/* Real-Time Operational Status Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${statusResult.badgeColor}`}
              role="status"
              aria-live="polite"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${statusResult.dotColor} ${statusResult.isOpen ? 'animate-pulse' : ''}`} />
              <span>{statusLabel}</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {statusResult.nextChangeText}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {center.barangay}
          </span>
        </div>

        {/* Center Title */}
        <h3
          id={`center-title-${center.id}`}
          className="mt-3.5 text-xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          {center.name}
        </h3>

        {/* Catchment / Community Areas Served */}
        <p className="mt-1 text-xs font-medium text-emerald-800 dark:text-emerald-400">
          Serves: {center.catchmentAreas.join(' · ')}
        </p>

        {/* Key Info Points with Navigation Icons */}
        <div className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
          {/* Address */}
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">Location: </span>
              <span>{center.address}</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{center.landmark}</p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">Clinic Hours: </span>
              <span>{center.operatingHours.weekdays}</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Break: {center.operatingHours.lunchBreak}</p>
            </div>
          </div>

          {/* Contact Hotline */}
          <div className="flex items-center gap-2.5">
            <Phone className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">Hotline: </span>
              <a
                href={`tel:${center.contactNumber.replace(/[^0-9]/g, '')}`}
                className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                {center.contactNumber}
              </a>
            </div>
          </div>
        </div>

        {/* Special Clinic Advisory if applicable */}
        {center.specialAdvisory && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 p-2.5 text-xs text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span>{center.specialAdvisory}</span>
          </div>
        )}

        {/* Services Badges Grid */}
        <div className="mt-5">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Available Health Programs:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {center.services.map((srv) => (
              <span
                key={srv.id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300"
              >
                {getServiceIcon(srv.iconName)}
                <span>{isLangTl ? srv.nameTl : srv.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Action Portal Links Section (Core Capstone Requirement) */}
      <div className="border-t border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-col gap-2.5">
          {/* 1. Direct Scheduling Button (Primary Action) */}
          <a
            href={center.urls.schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-between rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors"
            title={`Direct Link to ${center.shortName} Scheduling Page`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>{t.scheduleDirectBtn}</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
          </a>

          {/* 2. Direct Information & Requirements Button */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={center.urls.infoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 hover:border-slate-400 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              title={`Direct Link to ${center.shortName} Information Page`}
            >
              <Info className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
              <span className="truncate">Center Info</span>
              <ExternalLink className="h-3 w-3 text-slate-400" aria-hidden="true" />
            </a>

            {/* 3. Direct Full Website Button */}
            <a
              href={center.urls.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 hover:border-slate-400 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              title={`Direct Link to ${center.shortName} Main Website`}
            >
              <ExternalLink className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
              <span className="truncate">Full Website</span>
            </a>
          </div>

          {/* In-Portal Quick Details / Preview Helper */}
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => onOpenDetails(center)}
              className="hover:text-emerald-700 underline font-medium dark:hover:text-emerald-400"
            >
              View Requirements & Details
            </button>
            <button
              type="button"
              onClick={() => onOpenPreview(center.urls.websiteUrl, center.name)}
              className="hover:text-emerald-700 underline font-medium dark:hover:text-emerald-400"
            >
              Preview Portal
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
