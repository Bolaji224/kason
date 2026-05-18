import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpGetWithoutToken } from '../../../utils/http_utils';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Building2,
  SlidersHorizontal,
  X,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  id: string | number;
  title: string;
  company?: string;
  location?: string;
  city?: string;
  state?: string;
  country?: string;
  job_type?: string;
  jobtype?: { title?: string };
  type?: string;
  description?: string;
  summary?: string;
  salary?: string;
  salary_range?: string;
  budget?: string;
  slug?: string;
  employer?: { name?: string; company_name?: string };
  skills?: string;
  requirements?: string;
  [key: string]: any;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CARDS_PER_VIEW = 3;

const DEFAULT_JOB_TYPES = [
  'Virtual Assistant',
  'Editor',
  'Designer',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const safeStr = (val: any): string => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val.trim();
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') return (val?.name ?? val?.title ?? val?.label ?? '').trim();
  return '';
};

/** Lowercase + trim a value for comparison */
const normalize = (val: any): string => safeStr(val).toLowerCase();

/**
 * Collect ALL non-empty values from multiple fields into one string.
 * Unlike the `??` operator, this never short-circuits — every field is
 * always included so numeric FK columns don't shadow the real title.
 */
const collectFields = (...vals: any[]): string =>
  vals.map(safeStr).filter(Boolean).join(' ');

/**
 * Returns true if ANY of the supplied fields contain the needle.
 * Empty needle always returns true (no filter active).
 */
const matchesQuery = (needle: string, ...fields: any[]): boolean => {
  const n = normalize(needle);
  if (!n) return true;
  return normalize(collectFields(...fields)).includes(n);
};

// ─── Component ────────────────────────────────────────────────────────────────

const JobSearch: React.FC = () => {
  // ── Inputs
  const [titleQuery, setTitleQuery]       = useState('');
  const [debouncedTitle, setDebouncedTitle] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');

  // ── Location autocomplete
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [countries, setCountries]         = useState<string[]>([]);

  // ── Data
  const [allJobs, setAllJobs]             = useState<Job[]>([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [hasLoaded, setHasLoaded]         = useState(false);

  // ── Carousel
  const [carouselIndex, setCarouselIndex] = useState(0);

  const locationRef = useRef<HTMLDivElement>(null);
  const navigate    = useNavigate();

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  // ── Debounce title input (300 ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedTitle(titleQuery), 300);
    return () => clearTimeout(t);
  }, [titleQuery]);

  // ── Reset carousel whenever filters change
  useEffect(() => {
    setCarouselIndex(0);
  }, [debouncedTitle, locationQuery, selectedJobType]);

  // ── Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Fetch resources (countries for suggestions)
  const fetchCountries = useCallback(async () => {
    try {
      const resp = await httpGetWithoutToken('resources', {});
      if (resp?.status === 'success') {
        const raw =
          resp?.data?.countries ??
          resp?.data?.location ??
          resp?.data?.locations ??
          [];
        const parsed = Array.isArray(raw)
          ? Array.from(
              new Set(
                raw
                  .map((item: any) =>
                    typeof item === 'string'
                      ? item
                      : safeStr(item?.country ?? item?.name ?? item?.title)
                  )
                  .filter(Boolean)
              )
            )
          : [];
        setCountries(parsed);
      }
    } catch {
      setCountries([]);
    }
  }, []);

  // ── Fetch all jobs (initial load + manual re-fetch)
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await httpGetWithoutToken('jobs', {});
      if (resp?.status === 'success') {
        const data = Array.isArray(resp.data?.data)
          ? resp.data.data
          : Array.isArray(resp.data)
          ? resp.data
          : [];
        setAllJobs(data);
      } else {
        setAllJobs([]);
      }
    } catch {
      setError('Failed to load jobs. Please try again.');
      setAllJobs([]);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchCountries();
    fetchJobs();
  }, [fetchCountries, fetchJobs]);

  // ─── Derived: all unique locations from loaded jobs + country list
  const allLocations = useMemo(() => {
    const locs = new Set<string>(countries);
    allJobs.forEach((job) => {
      [job.location, job.city, job.state, job.country].forEach((v) => {
        const s = safeStr(v);
        if (s) locs.add(s);
      });
    });
    return Array.from(locs).sort((a, b) => a.localeCompare(b));
  }, [allJobs, countries]);

  // ─── Derived: all unique job types from loaded jobs + defaults
  const allJobTypes = useMemo(() => {
    const types = new Set<string>(DEFAULT_JOB_TYPES);
    allJobs.forEach((job) => {
      // Check ALL three type fields independently — never short-circuit with ??
      // Skip pure-numeric values (backend FK IDs like 1, 2, 3)
      [job.job_type, job.jobtype?.title, job.type].forEach((val) => {
        const t = safeStr(val);
        if (t && isNaN(Number(t))) types.add(t);
      });
    });
    return Array.from(types).sort((a, b) => a.localeCompare(b));
  }, [allJobs]);

  // ─── Derived: location autocomplete suggestions
  const locationSuggestions = useMemo(() => {
    if (!locationQuery.trim()) return [];
    return allLocations
      .filter((loc) => matchesQuery(locationQuery, loc))
      .slice(0, 8);
  }, [allLocations, locationQuery]);

  // ─── Core filter — all three filters run simultaneously via useMemo
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Keyword / title: searches title + description + summary + skills + requirements
      if (!matchesQuery(
        debouncedTitle,
        job.title, job.description, job.summary, job.skills, job.requirements
      )) return false;

      // Location: searches location + city + state + country
      if (!matchesQuery(
        locationQuery,
        job.location, job.city, job.state, job.country
      )) return false;

      // Job type: checks ALL three type fields — never short-circuits on a numeric FK
      if (!matchesQuery(
        selectedJobType,
        job.job_type, job.jobtype?.title, job.type
      )) return false;

      return true;
    });
  }, [allJobs, debouncedTitle, locationQuery, selectedJobType]);

  // ─── Pagination derived values
  const totalSlides = Math.ceil(filteredJobs.length / CARDS_PER_VIEW);
  const canPrev     = carouselIndex > 0;
  const canNext     = carouselIndex < totalSlides - 1;
  const visibleJobs = filteredJobs.slice(
    carouselIndex * CARDS_PER_VIEW,
    carouselIndex * CARDS_PER_VIEW + CARDS_PER_VIEW
  );

  // ─── Handlers
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocationQuery(val);
    setShowSuggestions(val.trim().length > 0);
  };

  const handleSelectSuggestion = (loc: string) => {
    setLocationQuery(loc);
    setShowSuggestions(false);
  };

  // Search button = re-fetch fresh data then re-filter
  const handleSearch = () => {
    fetchJobs();
  };

  // ─── Active filters summary (for empty state + result count)
  const activeFilters = [
    debouncedTitle && `"${debouncedTitle}"`,
    locationQuery && `in "${locationQuery}"`,
    selectedJobType && `(${selectedJobType})`,
  ]
    .filter(Boolean)
    .join(' ');

  // ─── Empty state message
  const emptyMessage =
    activeFilters
      ? `No jobs found for ${activeFilters}. Try adjusting your filters.`
      : 'No jobs available right now. Check back soon.';

  // ─── Result count label
  const resultLabel = activeFilters
    ? `${filteredJobs.length} result${filteredJobs.length !== 1 ? 's' : ''} for ${activeFilters}`
    : `${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} available`;

  return (
    <div ref={sectionRef}>
      {/* ─── Search Bar ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="px-4 lg:px-[2rem] pt-6 pb-4"
      >
        {/* Search card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-visible">
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

            {/* ── Title / keyword field */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 group">
              <Search
                size={18}
                className="text-gray-400 shrink-0 group-focus-within:text-[#2AA100] transition-colors"
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Job title or keyword…"
                  value={titleQuery}
                  onChange={(e) => setTitleQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full text-[15px] text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
                />
              </div>
              {titleQuery && (
                <button
                  onClick={() => setTitleQuery('')}
                  className="text-gray-300 hover:text-gray-500 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* ── Location field */}
            <div
              ref={locationRef}
              className="flex items-center gap-3 flex-1 px-4 py-3 relative group"
            >
              <MapPin
                size={18}
                className="text-gray-400 shrink-0 group-focus-within:text-[#2AA100] transition-colors"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="City, country or Remote…"
                  value={locationQuery}
                  onChange={handleLocationChange}
                  onFocus={() => {
                    if (locationQuery.trim()) setShowSuggestions(true);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full text-[15px] text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
                />
              </div>
              {locationQuery && (
                <button
                  onClick={() => { setLocationQuery(''); setShowSuggestions(false); }}
                  className="text-gray-300 hover:text-gray-500 transition-colors"
                >
                  <X size={14} />
                </button>
              )}

              {/* Autocomplete dropdown */}
              <AnimatePresence>
                {showSuggestions && locationSuggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-[220px] overflow-y-auto"
                  >
                    {locationSuggestions.map((loc, i) => (
                      <li
                        key={i}
                        onMouseDown={() => handleSelectSuggestion(loc)}
                        className="flex items-center gap-2 px-4 py-2.5 text-[14px] text-gray-700 hover:bg-[#f0fdf4] hover:text-[#2AA100] cursor-pointer transition-colors"
                      >
                        <MapPin size={13} className="text-gray-400 shrink-0" />
                        {loc}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* ── Job type select */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 group">
              <SlidersHorizontal
                size={18}
                className="text-gray-400 shrink-0 group-focus-within:text-[#2AA100] transition-colors"
              />
              <select
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
                className="flex-1 text-[15px] bg-transparent focus:outline-none text-gray-700 cursor-pointer"
              >
                <option value="">All job types</option>
                {allJobTypes.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* ── Search button */}
            <div className="flex items-center px-4 py-3 lg:py-0">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#2AA100] hover:bg-[#248e00] disabled:opacity-60 text-white font-semibold text-[15px] px-7 py-3 rounded-xl transition-all duration-200 active:scale-95"
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ── Active filter chips */}
        {(debouncedTitle || locationQuery || selectedJobType) && (
          <div className="flex items-center gap-2 flex-wrap mt-3 px-1">
            <span className="text-xs text-gray-400 font-medium">Active:</span>
            {debouncedTitle && (
              <FilterChip
                icon={<Briefcase size={11} />}
                label={debouncedTitle}
                onRemove={() => setTitleQuery('')}
              />
            )}
            {locationQuery && (
              <FilterChip
                icon={<MapPin size={11} />}
                label={locationQuery}
                onRemove={() => setLocationQuery('')}
              />
            )}
            {selectedJobType && (
              <FilterChip
                icon={<SlidersHorizontal size={11} />}
                label={selectedJobType}
                onRemove={() => setSelectedJobType('')}
              />
            )}
            <button
              onClick={() => {
                setTitleQuery('');
                setLocationQuery('');
                setSelectedJobType('');
              }}
              className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </motion.div>

      {/* ─── Results ─────────────────────────────────────────────────────────── */}
      <div className="px-4 lg:px-[2rem] pb-[2rem]">

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 border-[3px] border-[#2AA100] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center py-12 gap-3">
            <p className="text-red-500 text-sm">{error}</p>
            <button
              onClick={fetchJobs}
              className="text-sm text-[#2AA100] hover:underline font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && hasLoaded && filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-14 gap-3 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <Search size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-600 font-medium text-[15px] max-w-sm">{emptyMessage}</p>
            {activeFilters && (
              <button
                onClick={() => {
                  setTitleQuery('');
                  setLocationQuery('');
                  setSelectedJobType('');
                }}
                className="text-sm text-[#2AA100] hover:underline font-medium mt-1"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}

        {/* Results grid */}
        {!loading && !error && filteredJobs.length > 0 && (
          <div>
            {/* Result count + carousel nav */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500 text-[13px] font-medium">{resultLabel}</p>

              {totalSlides > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    disabled={!canPrev}
                    onClick={() => setCarouselIndex((p) => p - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E2A38] text-white disabled:opacity-30 hover:bg-[#2AA100] transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-200 ${
                          idx === carouselIndex ? 'bg-[#2AA100] w-5' : 'bg-gray-200 w-1.5'
                        }`}
                        aria-label={`Page ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    disabled={!canNext}
                    onClick={() => setCarouselIndex((p) => p + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E2A38] text-white disabled:opacity-30 hover:bg-[#2AA100] transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {visibleJobs.map((job, i) => (
                  <JobCard key={job.id ?? i} job={job} onClick={() => navigate('/login')} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FilterChipProps {
  icon: React.ReactNode;
  label: string;
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ icon, label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-xs font-medium px-2.5 py-1 rounded-full">
    {icon}
    {label}
    <button
      onClick={onRemove}
      className="ml-0.5 text-[#166534]/60 hover:text-[#166534] transition-colors"
    >
      <X size={10} />
    </button>
  </span>
);

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const title       = safeStr(job.title);
  const company     = safeStr(job.company ?? job.employer?.name ?? job.employer?.company_name);
  const jobLocation = safeStr(job.location ?? job.city ?? job.state ?? job.country);
  const jobType     = safeStr(job.job_type ?? job.jobtype?.title ?? job.type);
  const salary      = safeStr(job.salary ?? job.salary_range ?? job.budget);
  const description = safeStr(job.description ?? job.summary);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-[#2AA100]/40 p-5 cursor-pointer transition-all duration-200 flex flex-col gap-3"
    >
      {/* Title + company */}
      <div>
        {title && (
          <h3 className="text-[#1E2A38] font-semibold text-[15px] leading-snug line-clamp-2 mb-1">
            {title}
          </h3>
        )}
        {company && (
          <div className="flex items-center gap-1.5 text-[#2AA100] text-[13px] font-medium">
            <Building2 size={13} className="shrink-0" />
            {company}
          </div>
        )}
      </div>

      {/* Metadata chips */}
      <div className="flex flex-wrap gap-2">
        {jobLocation && (
          <span className="inline-flex items-center gap-1 text-gray-500 text-[12px]">
            <MapPin size={12} className="shrink-0 text-gray-400" />
            {jobLocation}
          </span>
        )}
        {jobType && (
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
            <Briefcase size={10} />
            {jobType}
          </span>
        )}
        {salary && (
          <span className="inline-flex items-center gap-1 bg-[#f0fdf4] text-[#2AA100] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            <DollarSign size={10} />
            {salary}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2">{description}</p>
      )}

      {/* CTA */}
      <div className="mt-auto pt-1">
        <span className="text-[#2AA100] text-[13px] font-semibold hover:underline">
          View job →
        </span>
      </div>
    </motion.div>
  );
};

export default JobSearch;
