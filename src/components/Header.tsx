import React from 'react';
import { Accessibility, Eye, Settings, Globe } from 'lucide-react';
import { AccessibilitySettings } from '../types';
import { TRANSLATIONS } from '../data/healthCenters';

interface HeaderProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (updater: (prev: AccessibilitySettings) => AccessibilitySettings) => void;
  onOpenSettingsModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  onOpenSettingsModal,
  onNavigateSection,
}) => {
  const t = TRANSLATIONS[settings.language];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/95">
      {/* Accessibility Sub-Strip */}
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-1.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate font-medium">
            <span className="hidden sm:inline font-semibold text-slate-800 dark:text-slate-200">
              Municipality of Pateros
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="truncate">{t.capstoneNotice}</span>
          </div>

          {/* Quick Accessibility Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1" title={t.fontSizeLabel}>
              <Accessibility className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              <button
                type="button"
                onClick={() => onUpdateSettings(s => ({ ...s, fontSize: 'normal' }))}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  settings.fontSize === 'normal'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
                aria-label="Normal Font Size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings(s => ({ ...s, fontSize: 'large' }))}
                className={`px-1.5 py-0.5 rounded text-xs font-semibold transition-colors ${
                  settings.fontSize === 'large'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
                aria-label="Large Font Size"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings(s => ({ ...s, fontSize: 'xlarge' }))}
                className={`px-1.5 py-0.5 rounded text-sm font-semibold transition-colors ${
                  settings.fontSize === 'xlarge'
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
                aria-label="Extra Large Font Size"
              >
                A++
              </button>
            </div>

            <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" aria-hidden="true" />

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={() => onUpdateSettings(s => ({ ...s, highContrast: !s.highContrast }))}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                settings.highContrast
                  ? 'bg-amber-400 text-black font-bold'
                  : 'text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
              title={t.highContrastLabel}
              aria-label={t.highContrastLabel}
            >
              <Eye className="h-3 w-3" aria-hidden="true" />
              <span className="hidden sm:inline">Contrast</span>
            </button>

            <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" aria-hidden="true" />

            {/* Language Switcher */}
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-slate-500" aria-hidden="true" />
              <button
                type="button"
                onClick={() => onUpdateSettings(s => ({ ...s, language: s.language === 'en' ? 'tl' : 'en' }))}
                className="px-1.5 py-0.5 rounded text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-950 transition-colors"
                aria-label="Switch Language"
              >
                {settings.language === 'en' ? 'FIL / Tagalog' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Standard 3-Zone Contract) */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-90 dark:text-white whitespace-nowrap shrink-0"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 font-bold text-white shadow-sm">
            +
          </span>
          <span className="font-extrabold tracking-tight">Pateros HealthLink</span>
        </a>

        {/* Zone 2: 4-5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={() => onNavigateSection('health-centers')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Health Centers
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('status-board')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Live Status
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('services')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('emergency')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Emergency Hotlines
          </button>
          <button
            type="button"
            onClick={() => onNavigateSection('about')}
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            About Portal
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenSettingsModal}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition-colors whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            title="Configure Target Health Center Website URLs"
          >
            <Settings className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
            <span className="hidden sm:inline">{t.configureLinksBtn}</span>
            <span className="sm:hidden">Links</span>
          </button>
        </div>
      </div>
    </header>
  );
};
