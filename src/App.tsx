import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HealthCenterGrid } from './components/HealthCenterGrid';
import { ClinicInfoModal } from './components/ClinicInfoModal';
import { INITIAL_HEALTH_CENTERS } from './data/healthCenters';
import { HealthCenter } from './types';
import { getManilaDate, formatManilaTime } from './utils/statusCalculator';
import { Search, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const centerSlides = [
  { image: '/DELFIN.png', title: 'Delfin Salonga Health Center' },
  { image: '/MASIKAP.png', title: 'Masikap Health Center' },
  { image: '/Mayor%20Juan.png', title: 'Mayor Juan Sanchez Health Center' },
  { image: '/MR%20FLORES.png', title: 'M.R. Flores Health Center' },
  { image: '/QUINTIN.png', title: 'Quintin De Borja Health Center' },
];

export default function App() {
  const [healthCenters] = useState<HealthCenter[]>(INITIAL_HEALTH_CENTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenterForInfo, setSelectedCenterForInfo] = useState<HealthCenter | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % centerSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isCarouselPaused]);

  const showSlide = (index: number) => {
    setActiveSlide((index + centerSlides.length) % centerSlides.length);
  };

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
        <section
          className="relative isolate h-[16rem] overflow-hidden bg-slate-950 sm:h-[22rem] lg:h-[30rem]"
          aria-label="Health center photo banner"
          aria-roledescription="carousel"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onFocusCapture={() => setIsCarouselPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsCarouselPaused(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') showSlide(activeSlide - 1);
            if (event.key === 'ArrowRight') showSlide(activeSlide + 1);
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const touchEndX = event.changedTouches[0]?.clientX;
            if (touchStartX.current === null || touchEndX === undefined) return;
            const swipeDistance = touchStartX.current - touchEndX;
            if (Math.abs(swipeDistance) > 50) {
              showSlide(activeSlide + (swipeDistance > 0 ? 1 : -1));
            }
            touchStartX.current = null;
          }}
        >
          <div
            className="flex h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            aria-live={isCarouselPaused ? 'polite' : 'off'}
          >
            {centerSlides.map((slide, index) => (
              <div className="relative h-full w-full shrink-0" key={slide.image}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover object-center"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/10" />
                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-8 lg:bottom-9 lg:left-12">
                  <p className="text-xs font-semibold uppercase text-white/80 sm:text-sm">
                    Municipality of Pateros
                  </p>
                  <h1 className="mt-1 text-xl font-bold sm:text-3xl lg:text-4xl">
                    {slide.title}
                  </h1>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => showSlide(activeSlide - 1)}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5"
            aria-label="Previous health center photo"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => showSlide(activeSlide + 1)}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5"
            aria-label="Next health center photo"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="absolute bottom-2 right-3 flex items-center gap-2 sm:bottom-4 sm:right-5">
            <button
              type="button"
              onClick={() => setIsCarouselPaused((paused) => !paused)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={isCarouselPaused ? 'Play slideshow' : 'Pause slideshow'}
            >
              {isCarouselPaused
                ? <Play className="h-4 w-4" aria-hidden="true" />
                : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
            <div className="flex items-center gap-1.5" aria-label="Choose a health center photo">
              {centerSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => showSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${activeSlide === index ? 'w-6 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/85'}`}
                  aria-label={`Show ${slide.title}`}
                  aria-current={activeSlide === index ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 5 Health Centers Directory Section */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center justify-between gap-4 text-xs text-slate-500 sm:justify-start">
                <span className="font-semibold text-slate-700">
                  All 5 Health Centers in Pateros
                </span>
                <span>Showing {filteredCenters.length} centers</span>
              </div>
              <div className="relative w-full sm:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by barangay or center..."
                  aria-label="Search by barangay or center"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-12 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Clear
                  </button>
                )}
              </div>
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
