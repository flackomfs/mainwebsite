import React from 'react';
import { Clock } from 'lucide-react';
import paterosLogo from '../assets/images/pateros_logo.jpg';

interface NavbarProps {
  timeString: string;
}

export const Navbar: React.FC<NavbarProps> = ({ timeString }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src={paterosLogo}
            alt="Municipality of Pateros Official Logo"
            className="h-10 w-10 rounded-full object-contain border border-slate-200 shadow-2xs shrink-0"
          />
          <div>
            <h1 className="text-base font-bold tracking-tight text-slate-900 leading-none">
              Pateros Health Portal
            </h1>
            <p className="text-[11px] text-slate-500 leading-none mt-1">
              Bayan ng Pateros · Metro Manila
            </p>
          </div>
        </div>

        {/* Right side: Live Manila Time */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 font-mono tabular-nums shadow-2xs">
          <Clock className="h-3.5 w-3.5 text-emerald-600" />
          <span>{timeString}</span>
        </div>
      </div>
    </header>
  );
};
