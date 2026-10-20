import React from 'react';
import { Clock } from 'lucide-react';

interface NavbarProps {
  timeString: string;
}

export const Navbar: React.FC<NavbarProps> = ({ timeString }) => {
  const compactTimeString = timeString.replace(/:\d{2}(?= [AP]M PHT$)/, '');

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src="/pateros_logo.jpg"
            alt="Municipality of Pateros Official Logo"
            className="h-9 w-9 shrink-0 rounded-full border border-slate-200 object-contain shadow-2xs sm:h-10 sm:w-10"
          />
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold leading-none tracking-tight text-slate-900 sm:text-base">
              Pateros Health Portal
            </h1>
            <p className="mt-1 hidden text-[11px] leading-none text-slate-500 sm:block">
              Bayan ng Pateros · Metro Manila
            </p>
          </div>
        </div>

        {/* Right side: Live Manila Time */}
        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 font-mono text-[10px] tabular-nums text-slate-700 shadow-2xs sm:gap-1.5 sm:px-3 sm:text-xs">
          <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          <span className="sm:hidden">{compactTimeString}</span>
          <span className="hidden sm:inline">{timeString}</span>
        </div>
      </div>
    </header>
  );
};
