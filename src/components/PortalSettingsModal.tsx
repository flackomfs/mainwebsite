import React, { useState } from 'react';
import { X, Settings, ExternalLink, Save, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { HealthCenter } from '../types';

interface PortalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  healthCenters: HealthCenter[];
  onSaveUrls: (updatedCenters: HealthCenter[]) => void;
  onResetDefaults: () => void;
}

export const PortalSettingsModal: React.FC<PortalSettingsModalProps> = ({
  isOpen,
  onClose,
  healthCenters,
  onSaveUrls,
  onResetDefaults,
}) => {
  const [centers, setCenters] = useState<HealthCenter[]>(healthCenters);
  const [activeTab, setActiveTab] = useState<string>(healthCenters[0]?.id || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentCenter = centers.find((c) => c.id === activeTab) || centers[0];

  const handleUrlChange = (field: 'websiteUrl' | 'schedulingUrl' | 'infoUrl', value: string) => {
    setCenters((prev) =>
      prev.map((c) => (c.id === currentCenter.id ? { ...c, urls: { ...c.urls, [field]: value } } : c))
    );
  };

  const handleApplyPreset = (preset: 'localhost' | 'default') => {
    if (preset === 'localhost') {
      const portMap: Record<string, number> = {
        aguho: 5174,
        magtanggol: 5175,
        'santa-ana': 5176,
        'san-roque': 5177,
        'sto-rosario': 5178,
      };
      setCenters((prev) =>
        prev.map((c) => {
          const port = portMap[c.id] || 5174;
          return {
            ...c,
            urls: {
              websiteUrl: `http://localhost:${port}`,
              schedulingUrl: `http://localhost:${port}/schedule`,
              infoUrl: `http://localhost:${port}/info`,
            },
          };
        })
      );
    } else {
      onResetDefaults();
      onClose();
    }
  };

  const handleSave = () => {
    onSaveUrls(centers);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs animate-in fade-in"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 id="portal-settings-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Configure Health Center Destination URLs
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Set target endpoints for each of the 5 health centers as you build them
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close configuration modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Preset quick actions banner */}
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Dev Presets:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('localhost')}
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-slate-700 hover:bg-slate-50 font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                Localhost Ports (5174–5178)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('default')}
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-slate-700 hover:bg-slate-50 font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                Default Cloud URLs
              </button>
            </div>
          </div>
        </div>

        {/* Content Body: Tabs for 5 centers */}
        <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
          {/* Left Vertical Tabs */}
          <div className="w-full border-b border-slate-200 bg-slate-50/50 p-2 md:w-56 md:border-b-0 md:border-r dark:border-slate-800 dark:bg-slate-950/30">
            <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              5 Health Centers
            </p>
            <div className="flex flex-row gap-1 overflow-x-auto md:flex-col">
              {centers.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveTab(c.id)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors whitespace-nowrap shrink-0 md:w-full ${
                    activeTab === c.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{c.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {currentCenter.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentCenter.barangay} · {currentCenter.address}
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* 1. Direct Scheduling URL */}
              <div>
                <label className="mb-1 block font-bold text-slate-700 dark:text-slate-200">
                  Individual Scheduling Page URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={currentCenter.urls.schedulingUrl}
                    onChange={(e) => handleUrlChange('schedulingUrl', e.target.value)}
                    placeholder="https://... or http://localhost:5174/schedule"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-2xs focus:border-emerald-600 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <a
                    href={currentCenter.urls.schedulingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-slate-300 bg-slate-50 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    title="Test Open in New Tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Direct destination when users click "Schedule Appointment".
                </p>
              </div>

              {/* 2. Direct Information Page URL */}
              <div>
                <label className="mb-1 block font-bold text-slate-700 dark:text-slate-200">
                  Individual Information Page URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={currentCenter.urls.infoUrl}
                    onChange={(e) => handleUrlChange('infoUrl', e.target.value)}
                    placeholder="https://... or http://localhost:5174/info"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-2xs focus:border-emerald-600 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <a
                    href={currentCenter.urls.infoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-slate-300 bg-slate-50 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    title="Test Open in New Tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Direct destination when users click "Center Info".
                </p>
              </div>

              {/* 3. Main Center Website URL */}
              <div>
                <label className="mb-1 block font-bold text-slate-700 dark:text-slate-200">
                  Main Dedicated Website URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={currentCenter.urls.websiteUrl}
                    onChange={(e) => handleUrlChange('websiteUrl', e.target.value)}
                    placeholder="https://... or http://localhost:5174"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 shadow-2xs focus:border-emerald-600 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <a
                    href={currentCenter.urls.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-slate-300 bg-slate-50 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    title="Test Open in New Tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Full standalone web application for this barangay health center.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
          <button
            type="button"
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All to Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Endpoint Configuration</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
