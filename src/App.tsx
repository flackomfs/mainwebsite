import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HealthCenterGrid } from './components/HealthCenterGrid';
import { INITIAL_HEALTH_CENTERS, MR_FLORES_HEALTH_CENTER_URL } from './data/healthCenters';
import { HealthCenter } from './types';
import { getManilaDate, formatManilaTime } from './utils/statusCalculator';
import { Search, ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';

const centerSlides = [
  { image: '/DELFIN.png', title: 'Delfin Salonga Health Center' },
  { image: '/MASIKAP.png', title: 'Masikap Health Center' },
  { image: '/Mayor%20Juan.png', title: 'Mayor Juan Sanchez Health Center' },
  { image: '/MR%20FLORES.png', title: 'M.R Flores Health Center', url: MR_FLORES_HEALTH_CENTER_URL },
  { image: '/QUINTIN.png', title: 'Quintin De Borja Health Center' },
];

export default function App() {
  const [healthCenters] = useState<HealthCenter[]>(INITIAL_HEALTH_CENTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % centerSlides.length);
    }, 5000);
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
          c.barangay.toLowerCase().includes(q)
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
                {slide.url ? (
                  <a
                    href={slide.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${slide.title} website`}
                    className="absolute inset-0"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover object-center"
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                    />
                  </a>
                ) : (
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover object-center"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/10" />
                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-8 lg:bottom-9 lg:left-12">
                  <p className="text-xs font-semibold uppercase text-white/80 sm:text-sm">
                    Municipality of Pateros
                  </p>
                  <h1 className="mt-1 text-xl font-bold sm:text-3xl lg:text-4xl">
                    {slide.url ? (
                      <a
                        href={slide.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      >
                        {slide.title}
                      </a>
                    ) : (
                      slide.title
                    )}
                  </h1>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => showSlide(activeSlide - 1)}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5"
            aria-label="Previous health center photo"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => showSlide(activeSlide + 1)}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5"
            aria-label="Next health center photo"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/40 p-1 backdrop-blur-xs sm:right-5 sm:top-5 sm:gap-2">
            <button
              type="button"
              onClick={() => setIsCarouselPaused((paused) => !paused)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={isCarouselPaused ? 'Play slideshow' : 'Pause slideshow'}
            >
              {isCarouselPaused
                ? <Play className="h-4 w-4" aria-hidden="true" />
                : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
            <div className="flex items-center gap-0.5" aria-label="Choose a health center photo">
              {centerSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => showSlide(index)}
                  className="flex h-11 w-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`Show ${slide.title}`}
                  aria-current={activeSlide === index ? 'true' : undefined}
                >
                  <span className={`h-2.5 rounded-full transition-all ${activeSlide === index ? 'w-6 bg-white' : 'w-2.5 bg-white/55 hover:bg-white/85'}`} />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Health Center Directory */}
        <section
          id="health-centers"
          aria-labelledby="health-centers-title"
          className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 to-slate-50 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                  Pateros Health Directory
                </p>
                <h2
                  id="health-centers-title"
                  className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
                >
                  Find Near Health Center
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                  Choose a center below or search by its name or barangay.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-80 sm:items-end">
                <span
                  className="self-start rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-900 sm:self-end"
                  aria-live="polite"
                >
                  {filteredCenters.length} of {healthCenters.length} centers
                </span>
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search centers or barangays"
                    aria-label="Search health centers by name or barangay"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-12 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-1.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-700"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {filteredCenters.length > 0 ? (
              <HealthCenterGrid healthCenters={filteredCenters} />
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-5 py-12 text-center">
                <Search className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
                <h3 className="mt-3 text-base font-bold text-slate-900">No centers found</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Try another center or barangay name.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 min-h-11 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  Show all centers
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

    </div>
  );
}
