import React from 'react';
import { Activity, Clock, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2, ChevronRight } from 'lucide-react';
import { HealthCenter, StatusSimulationMode, AccessibilitySettings } from '../types';
import { computeCenterOperationalStatus } from '../utils/statusCalculator';
import { TRANSLATIONS } from '../data/healthCenters';

interface RealTimeStatusBoardProps {
  healthCenters: HealthCenter[];
  simulationMode: StatusSimulationMode;
  onSimulationModeChange: (mode: StatusSimulationMode) => void;
  settings: AccessibilitySettings;
  currentTimeString: string;
  onSelectCenter: (center: HealthCenter) => void;
}

export const RealTimeStatusBoard: React.FC<RealTimeStatusBoardProps> = ({
  healthCenters,
  simulationMode,
  onSimulationModeChange,
  settings,
  currentTimeString,
  onSelectCenter,
}) => {
  const t = TRANSLATIONS[settings.language];

  // Compute status for all centers
  const centerStatuses = healthCenters.map((center) => ({
    center,
    statusResult: computeCenterOperationalStatus(center, simulationMode),
  }));

  const openCount = centerStatuses.filter((c) => c.statusResult.status === 'open').length;
  const lunchCount = centerStatuses.filter((c) => c.statusResult.status === 'lunch_break').length;
  const closedCount = centerStatuses.filter((c) => c.statusResult.status === 'closed' || c.statusResult.status === 'weekend').length;

  return (
    <section id="status-board" className="border-b border-slate-200 bg-slate-50 py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <Activity className="h-4 w-4" aria-hidden="true" />
              <span className="uppercase tracking-wider">Live Municipal Monitoring</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{currentTimeString}</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {t.statusBoardTitle}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              {t.statusBoardSubtitle}
            </p>
          </div>

          {/* Presentation & Simulation Controls for Capstone Defense */}
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 text-xs shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <span className="px-2 py-1 font-medium text-slate-500 dark:text-slate-400">Status Mode:</span>
            <button
              type="button"
              onClick={() => onSimulationModeChange('realtime')}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                simulationMode === 'realtime'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              Real-Time (PHT)
            </button>
            <button
              type="button"
              onClick={() => onSimulationModeChange('force_open')}
              className={`rounded-lg px-2 py-1 font-semibold transition-colors ${
                simulationMode === 'force_open'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
              title="Test simulation of daytime operating hours"
            >
              Test Open
            </button>
            <button
              type="button"
              onClick={() => onSimulationModeChange('force_lunch')}
              className={`rounded-lg px-2 py-1 font-semibold transition-colors ${
                simulationMode === 'force_lunch'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
              title="Test simulation of 12:00 PM – 1:00 PM Lunch Break"
            >
              Test Lunch Break
            </button>
            <button
              type="button"
              onClick={() => onSimulationModeChange('force_closed')}
              className={`rounded-lg px-2 py-1 font-semibold transition-colors ${
                simulationMode === 'force_closed'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
              title="Test simulation of evening/weekend closed state"
            >
              Test Closed
            </button>
          </div>
        </div>

        {/* Aggregate Ticker Badges */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Health Centers</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">5</span>
              <span className="text-xs text-slate-500">Pateros Barangays</span>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 shadow-xs dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">Currently Open</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">{openCount}</span>
              <span className="text-xs text-emerald-800/80 dark:text-emerald-400/80">Centers Active</span>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 shadow-xs dark:border-amber-900/40 dark:bg-amber-950/20">
            <div className="text-xs font-semibold text-amber-800 dark:text-amber-400">Lunch Break</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-amber-700 dark:text-amber-400 tabular-nums">{lunchCount}</span>
              <span className="text-xs text-amber-800/80 dark:text-amber-400/80">Emergency Triage Only</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-100/60 p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400">Closed / After-Hours</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-700 dark:text-slate-300 tabular-nums">{closedCount}</span>
              <span className="text-xs text-slate-500">Refer to 911</span>
            </div>
          </div>
        </div>

        {/* 5-Column Health Center Real-Time Status Cards Strip */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {centerStatuses.map(({ center, statusResult }) => {
            const isLangTl = settings.language === 'tl';
            const statusLabel = isLangTl ? statusResult.statusTextTl : statusResult.statusText;

            return (
              <div
                key={center.id}
                onClick={() => onSelectCenter(center)}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-all hover:border-emerald-500 hover:shadow-md cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500"
              >
                <div>
                  {/* Status Indicator Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${statusResult.badgeColor}`}>
                      <span className={`h-2 w-2 rounded-full ${statusResult.dotColor} ${statusResult.isOpen ? 'animate-pulse' : ''}`} />
                      <span>{statusLabel}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">#0{healthCenters.indexOf(center) + 1}</span>
                  </div>

                  {/* Center Name */}
                  <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400 transition-colors">
                    {center.shortName}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {center.barangay}
                  </p>

                  {/* Next Change / Subtext */}
                  <div className="mt-3 rounded-lg bg-slate-50 p-2 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                    <div className="flex items-start gap-1.5">
                      <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="font-medium text-[11px] leading-tight">{statusResult.nextChangeText}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Link Card Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 dark:border-slate-800 dark:text-emerald-400">
                  <span>View Details & Links</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
