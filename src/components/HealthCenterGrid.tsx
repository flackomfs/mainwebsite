import React from 'react';
import { Calendar, Info, ExternalLink, MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { HealthCenter } from '../types';
import { computeCenterOperationalStatus } from '../utils/statusCalculator';

interface HealthCenterGridProps {
  healthCenters: HealthCenter[];
  onOpenInfoModal: (center: HealthCenter) => void;
}

export const HealthCenterGrid: React.FC<HealthCenterGridProps> = ({
  healthCenters,
  onOpenInfoModal,
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {healthCenters.map((center, index) => {
        const status = computeCenterOperationalStatus(center);

        return (
          <article
            key={center.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-sm"
          >
            <div>
              {/* Status Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${status.dotColor}`} />
                  <span className="text-xs font-bold text-slate-800">
                    {status.statusText}
                  </span>
                  <span className="text-slate-300 text-xs">·</span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {status.nextChangeText}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  0{index + 1}
                </span>
              </div>

              {/* Title & Barangay */}
              <h3 className="mt-3 text-lg font-bold text-slate-900 leading-snug">
                {center.name}
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                {center.barangay}
              </p>

              {/* Vital Information */}
              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                  <div>
                    <span>{center.address}</span>
                    <span className="block text-[11px] text-slate-400">{center.landmark}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-slate-400" />
                  <span>Mon – Fri: 8:00 AM – 5:00 PM</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                  <a
                    href={`tel:${center.contactNumber.replace(/[^0-9]/g, '')}`}
                    className="font-medium text-slate-700 hover:text-emerald-700"
                  >
                    {center.contactNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-6 border-t border-slate-100 pt-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {/* 1. Direct Scheduling Link */}
                <a
                  href={center.urls.schedulingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-700 transition-colors"
                  title={`Open ${center.shortName} Scheduling Page`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Schedule</span>
                  <ExternalLink className="h-3 w-3 opacity-80" />
                </a>

                {/* 2. Direct Info Link */}
                <a
                  href={center.urls.infoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  title={`Open ${center.shortName} Information Page`}
                >
                  <Info className="h-3.5 w-3.5 text-slate-500" />
                  <span>Info Page</span>
                  <ExternalLink className="h-3 w-3 text-slate-400" />
                </a>
              </div>

              {/* Secondary Actions: Full Website & Details */}
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => onOpenInfoModal(center)}
                  className="font-medium text-slate-500 hover:text-slate-800 underline"
                >
                  View Requirements
                </button>
                <a
                  href={center.urls.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Visit Main Website</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
