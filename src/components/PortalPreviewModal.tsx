import React, { useState } from 'react';
import { X, ExternalLink, RefreshCw, AlertCircle, Globe, Shield } from 'lucide-react';

interface PortalPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export const PortalPreviewModal: React.FC<PortalPreviewModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
}) => {
  const [iframeError, setIframeError] = useState(false);
  const [key, setKey] = useState(0);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-6 backdrop-blur-xs animate-in fade-in"
    >
      <div className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden dark:border-slate-800 dark:bg-slate-900">
        {/* Mock Browser Topbar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-2 font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
              {title}
            </span>
          </div>

          {/* Address Box */}
          <div className="hidden sm:flex max-w-md flex-1 items-center gap-2 mx-4 rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <span className="truncate font-mono">{url}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIframeError(false);
                setKey((k) => k + 1);
              }}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Refresh frame"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-lg bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-800"
              title="Open full page in a new window"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content / Frame Area */}
        <div className="relative flex-1 bg-slate-50 dark:bg-slate-950">
          {iframeError ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                Browser Security Header (X-Frame-Options)
              </h3>
              <p className="mt-2 max-w-md text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Many modern web apps restrict direct embedding inside iframe windows for privacy. You can launch this health center site directly in its own tab:
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800"
              >
                <span>Launch {title} in New Tab</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <iframe
              key={key}
              src={url}
              title={title}
              onError={() => setIframeError(true)}
              className="h-full w-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )}
        </div>
      </div>
    </div>
  );
};
