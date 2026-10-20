import React, { useState } from 'react';
import { X, ExternalLink, Link2, Check, RotateCcw, Laptop, Globe } from 'lucide-react';
import { HealthCenter } from '../types';

interface ConnectWebsitesModalProps {
  isOpen: boolean;
  onClose: () => void;
  healthCenters: HealthCenter[];
  onSave: (centers: HealthCenter[]) => void;
  onReset: () => void;
}

export const ConnectWebsitesModal: React.FC<ConnectWebsitesModalProps> = ({
  isOpen,
  onClose,
  healthCenters,
  onSave,
  onReset,
}) => {
  const [centers, setCenters] = useState<HealthCenter[]>(healthCenters);
  const [activeTab, setActiveTab] = useState(healthCenters[0]?.id || 'aguho');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const currentCenter = centers.find((c) => c.id === activeTab) || centers[0];

  const handleBaseUrlChange = (newBaseUrl: string) => {
    const cleanBase = newBaseUrl.replace(/\/+$/, '');
    setCenters((prev) =>
      prev.map((c) => {
        if (c.id === currentCenter.id) {
          return {
            ...c,
            urls: {
              websiteUrl: cleanBase || '#',
              schedulingUrl: cleanBase ? `${cleanBase}/schedule` : '#',
              infoUrl: cleanBase ? `${cleanBase}/info` : '#',
            },
          };
        }
        return c;
      })
    );
  };

  const handleCustomFieldChange = (field: 'schedulingUrl' | 'infoUrl' | 'websiteUrl', value: string) => {
    setCenters((prev) =>
      prev.map((c) => (c.id === currentCenter.id ? { ...c, urls: { ...c.urls, [field]: value } } : c))
    );
  };

  const setLocalhostPorts = () => {
    const portMap: Record<string, number> = {
      'juan-sanchez': 5174,
      masikap: 5175,
      'quintin-de-borja': 5176,
      'mr-flores': 5177,
      'delfin-salonga': 5178,
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
  };

  const handleSave = () => {
    onSave(centers);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl border border-slate-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Connect 5 Health Center Websites
            </h2>
            <p className="text-xs text-slate-500">
              Enter the target URLs for each health center. Clicking their buttons will route directly to these links.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Presets bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-6 py-2.5 text-xs">
          <span className="font-medium text-slate-600">Quick Configuration Presets:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={setLocalhostPorts}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-slate-700 hover:bg-slate-50 font-medium"
            >
              <Laptop className="h-3.5 w-3.5 text-slate-500" />
              <span>Localhost Ports (5174–5178)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-slate-600 hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col overflow-hidden sm:flex-row">
          {/* Tabs */}
          <div className="w-full border-b border-slate-200 bg-slate-50 p-2 sm:w-52 sm:border-b-0 sm:border-r">
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Select Health Center
            </p>
            <div className="flex flex-row gap-1 overflow-x-auto sm:flex-col">
              {centers.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveTab(c.id)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold whitespace-nowrap transition-colors sm:w-full ${
                    activeTab === c.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="truncate">{c.shortName}</span>
                  <span className="ml-1 text-[10px] opacity-70">#{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{currentCenter.name}</h3>
              <p className="text-xs text-slate-500">{currentCenter.barangay}</p>
            </div>

            {/* Base Website URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Base Website URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={currentCenter.urls.websiteUrl}
                  onChange={(e) => handleBaseUrlChange(e.target.value)}
                  placeholder="e.g. http://localhost:5174 or https://aguho-health.web.app"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                />
                <a
                  href={currentCenter.urls.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50"
                  title="Test link in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Updating this will automatically format the scheduling and info links below.
              </p>
            </div>

            {/* Individual Scheduling Page URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Individual Scheduling Page URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={currentCenter.urls.schedulingUrl}
                  onChange={(e) => handleCustomFieldChange('schedulingUrl', e.target.value)}
                  placeholder="e.g. http://localhost:5174/schedule"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                />
                <a
                  href={currentCenter.urls.schedulingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50"
                  title="Test link in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Opens when users click "Schedule Appointment".
              </p>
            </div>

            {/* Individual Info Page URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Individual Information Page URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={currentCenter.urls.infoUrl}
                  onChange={(e) => handleCustomFieldChange('infoUrl', e.target.value)}
                  placeholder="e.g. http://localhost:5174/info"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-hidden"
                />
                <a
                  href={currentCenter.urls.infoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50"
                  title="Test link in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Opens when users click "Clinic Information".
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3.5">
          <p className="text-xs text-slate-500">
            Changes persist in browser storage.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
            >
              {isSaved ? <Check className="h-4 w-4" /> : null}
              <span>{isSaved ? 'Saved!' : 'Save URLs'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
