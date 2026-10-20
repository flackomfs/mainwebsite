import React from 'react';
import { HealthCenter } from '../types';

interface HealthCenterGridProps {
  healthCenters: HealthCenter[];
}

export const HealthCenterGrid: React.FC<HealthCenterGridProps> = ({
  healthCenters,
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {healthCenters.map((center) => (
        <article
          key={center.id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
        >
          <h2 className="text-lg font-bold leading-snug text-slate-900">
            {center.name}
          </h2>
        </article>
      ))}
    </div>
  );
};
