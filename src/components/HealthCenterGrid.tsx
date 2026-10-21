import React from 'react';
import { MapPin } from 'lucide-react';
import { HealthCenter } from '../types';

interface HealthCenterGridProps {
  healthCenters: HealthCenter[];
}

export const HealthCenterGrid: React.FC<HealthCenterGridProps> = ({
  healthCenters,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {healthCenters.map((center) => (
        <article
          key={center.id}
          className="relative flex min-h-28 items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-emerald-50/50 p-5 shadow-sm sm:min-h-32 sm:p-6"
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 sm:h-12 sm:w-12"
            aria-hidden="true"
          >
            <MapPin className="h-5 w-5" />
          </span>
          <h3 className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
            {center.name}
          </h3>
        </article>
      ))}
    </div>
  );
};
