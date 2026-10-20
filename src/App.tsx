import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HealthCenterGrid } from './components/HealthCenterGrid';
import { ClinicInfoModal } from './components/ClinicInfoModal';
import { INITIAL_HEALTH_CENTERS } from './data/healthCenters';
import { HealthCenter } from './types';
import { getManilaDate, formatManilaTime } from './utils/statusCalculator';
import { Search, Building2 } from 'lucide-react';

export default function App() {
  const [healthCenters] = useState<HealthCenter[]>(INITIAL_HEALTH_CENTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenterForInfo, setSelectedCenterForInfo] = useState<HealthCenter | null>(null);

  // Live Philippine Standard Time (PHT) Clock
  const [manilaDate, setManilaDate] = useState<Date>(() => getManilaDate());
  useEffect(() => {
    const timer = setInterval(() => {
      setManilaDate(getManilaDate());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { timeString } = useMemo(() => formatManilaTime(manilaDate), [manilaDate]);

  // Filter centers by search term
  const filteredCenters = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return healthCenters;
    return healthCenters.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.barangay.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
    );
  }, [healthCenters, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <Navbar timeString={timeString} />

      <main className="flex-1">
        {/* Header Hero Section */}
        <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <img
                  src={paterosLogo}
                  alt="Official Seal of Pateros"
                  className="hidden sm:block h-16 w-16 md:h-20 md:w-20 rounded-full object-contain border border-slate-200 shadow-xs shrink-0 bg-white p-0.5"
                />
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                    <Building2 className="h-4 w-4" />
                    <span>Municipality of Pateros Public Health Gateway</span>
                  </div>
                  <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                    Barangay Health Centers Portal Directory
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-slate-600 leading-relaxed">
                    Direct gateway to all 5 Barangay Health Centers in Pateros. Access real-time clinic status and direct links to each center's individual scheduling and information page.
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-80">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by barangay or center..."
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Health Centers Directory Section */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                All 5 Health Centers in Pateros
              </span>
              <span>Showing {filteredCenters.length} centers</span>
            </div>

            {/* Health Center Cards */}
            <HealthCenterGrid
              healthCenters={filteredCenters}
              onOpenInfoModal={(center) => setSelectedCenterForInfo(center)}
            />
          </div>
        </section>
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Pateros Health Portal · Bayan ng Pateros
          </p>
          <div className="flex items-center gap-4">
            <span>5 Barangay Health Centers Directory</span>
            <span>·</span>
            <span>Clinic Hours: 8:00 AM – 5:00 PM (PHT)</span>
          </div>
        </div>
      </footer>

      {/* Quick Clinic Info Modal */}
      <ClinicInfoModal
        center={selectedCenterForInfo}
        onClose={() => setSelectedCenterForInfo(null)}
      />
    </div>
  );
}
