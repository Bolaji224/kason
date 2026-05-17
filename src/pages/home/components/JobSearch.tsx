import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpGetWithoutToken } from '../../../utils/http_utils';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';

interface Job {
  id: string | number;
  title: string;
  company?: string;
  location?: string;
  job_type?: string;
  description?: string;
  salary?: string;
  slug?: string;
  [key: string]: any;
}

const safeStr = (val: any): string => {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (typeof val === "object") return val?.name ?? val?.title ?? val?.label ?? "";
  return "";
};

const CARDS_PER_VIEW = 3;
const JOB_TYPE_OPTIONS = ["Virtual Assistant", "Video Editor"];

const FindJobSearchSection: React.FC = () => {
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [countries, setCountries] = useState<string[]>([]);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const fetchCountries = async () => {
    try {
      const resp = await httpGetWithoutToken("resources", {});
      if (resp?.status === "success") {
        const raw = resp?.data?.countries ?? resp?.data?.location ?? resp?.data?.locations ?? [];
        let parsed: string[] = [];
        if (Array.isArray(raw)) {
          raw.forEach((item: any) => {
            if (typeof item === "string") parsed.push(item);
            else {
              const name = safeStr(item?.country ?? item?.name ?? item?.title);
              if (name) parsed.push(name);
            }
          });
          parsed = Array.from(new Set(parsed));
        }
        setCountries(parsed.length > 0 ? parsed : []);
      }
    } catch {
      setCountries([]);
    }
  };

  // ✅ Accepts location and jobType filters — sends them to backend
  const fetchJobs = async (location = "", jobType = "") => {
    setJobsLoading(true);
    setJobsError(null);
    setCarouselIndex(0);
    setHasSearched(true);

    try {
      // Only add params that have values
      const params: Record<string, string> = {};
      if (location.trim()) params.location = location.trim();
      if (jobType.trim()) params.jobType = jobType.trim();

      const resp = await httpGetWithoutToken("jobs", params);

      if (resp?.status === "success") {
        const fetched = Array.isArray(resp.data?.data)
          ? resp.data.data
          : Array.isArray(resp.data)
          ? resp.data
          : [];
        setJobs(fetched);
      } else {
        setJobs([]);
      }
    } catch {
      setJobsError("Failed to load jobs.");
      setJobs([]);
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchJobs(); // load all jobs on mount
  }, []);

  // ✅ Auto-search when job type changes (if user already typed a location)
  useEffect(() => {
    if (hasSearched) {
      fetchJobs(locationQuery, selectedJobType);
    }
  }, [selectedJobType]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocationQuery(val);
    if (val.trim().length > 0) {
      const filtered = countries.filter((c) =>
        c.toLowerCase().includes(val.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectCountry = (country: string) => {
    setLocationQuery(country);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    fetchJobs(locationQuery, selectedJobType);
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const totalSlides = Math.ceil(jobs.length / CARDS_PER_VIEW);
  const canPrev = carouselIndex > 0;
  const canNext = carouselIndex < totalSlides - 1;
  const visibleJobs = jobs.slice(
    carouselIndex * CARDS_PER_VIEW,
    carouselIndex * CARDS_PER_VIEW + CARDS_PER_VIEW
  );

  return (
    <div>
      {/* ── Search Bar ── */}
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="flex justify-center items-center"
      >
        <div className="lg:flex md:flex justify-center items-center w-full lg:mx-[2rem] mx-[2rem] py-[2rem] lg:space-y-0 md:space-y-0 space-y-[1rem]">

          {/* Location input */}
          <div className="w-[100%] relative" ref={locationRef}>
            <input
              type="text"
              placeholder="Enter location e.g Lagos"
              value={locationQuery}
              onChange={handleLocationChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onFocus={() => {
                if (locationQuery.trim().length > 0) setShowSuggestions(true);
              }}
              className="w-[100%] p-4 rounded focus:outline-none bg-[#fff] shadow-md"
            />
            {showSuggestions && locationSuggestions.length > 0 && (
              <ul className="absolute z-50 top-full left-0 w-full bg-white border border-gray-200 rounded-b-md shadow-lg max-h-[200px] overflow-y-auto">
                {locationSuggestions.map((c, i) => (
                  <li
                    key={i}
                    onMouseDown={() => handleSelectCountry(c)}
                    className="px-4 py-2 text-[14px] text-[#1E2A38] hover:bg-[#f0f4f8] cursor-pointer"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Job type */}
          <div className="w-[100%]">
            <select
              value={selectedJobType}
              onChange={(e) => setSelectedJobType(e.target.value)}
              className="w-[100%] p-4 rounded focus:outline-none bg-[#fff] shadow-md text-[#646A73] text-[16px]"
            >
              <option value="">Select job type</option>
              {JOB_TYPE_OPTIONS.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Search button */}
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="bg-[#1E2A38] text-white lg:px-[2rem] md:px-[2rem] px-[2rem] lg:py-[0.8rem] md:py-[0.8rem] py-[0.5rem] lg:text-[18px] md:text-[18px] text-[12px] rounded-md hover:bg-[#2AA100] hover:tracking-[1px] focus:outline-none ease-in duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Carousel ── */}
      <div className="px-[2rem] pb-[2rem]">

        {jobsLoading && (
          <div className="flex justify-center items-center py-[3rem]">
            <div className="w-8 h-8 border-4 border-[#1E2A38] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!jobsLoading && jobsError && (
          <div className="text-center py-[2rem] text-red-500">{jobsError}</div>
        )}

        {/* ✅ Shows specific message when location filter returns nothing */}
        {!jobsLoading && !jobsError && jobs.length === 0 && (
          <div className="text-center py-[2rem] text-[#646A73]">
            {locationQuery
              ? `No jobs available in "${locationQuery}"${selectedJobType ? ` for "${selectedJobType}"` : ""}.`
              : "No jobs available."}
          </div>
        )}

        {!jobsLoading && jobs.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-[1rem]">
              <p className="text-[#646A73] text-[14px]">
                {jobs.length} job{jobs.length !== 1 ? "s" : ""} 
                {locationQuery ? ` in "${locationQuery}"` : " available"}
              </p>

              {totalSlides > 1 && (
                <div className="flex items-center gap-3">
                  <button
                    disabled={!canPrev}
                    onClick={() => setCarouselIndex((p) => p - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E2A38] text-white disabled:opacity-30 hover:bg-[#2AA100] transition-colors duration-200 text-[20px] leading-none"
                  >‹</button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalSlides }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-200 ${
                          idx === carouselIndex ? "bg-[#2AA100] w-4" : "bg-[#d1d5db] w-2"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    disabled={!canNext}
                    onClick={() => setCarouselIndex((p) => p + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E2A38] text-white disabled:opacity-30 hover:bg-[#2AA100] transition-colors duration-200 text-[20px] leading-none"
                  >›</button>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {visibleJobs.map((job, i) => {
                  const title = safeStr(job.title);
                  const company = safeStr(job.company ?? job.employer?.name ?? job.employer?.company_name);
                  const jobLocation = safeStr(job.location ?? job.city ?? job.state ?? job.country);
                  const jobType = safeStr(job.job_type ?? job.jobtype?.title ?? job.type);
                  const salary = safeStr(job.salary ?? job.salary_range);
                  const description = safeStr(job.description ?? job.summary);
                  const slug = safeStr(job.slug ?? job.id);

                  return (
                    <div
                      key={job.id ?? i}
                      className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-[#2AA100]"
                      onClick={() => navigate(`/login`)}
                    >
                      {title && (
                        <h3 className="text-[#1E2A38] font-semibold text-[16px] mb-1 truncate">{title}</h3>
                      )}
                      {company && (
                        <p className="text-[#2AA100] text-[14px] font-medium mb-1">{company}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {jobLocation && (
                          <span className="text-[#646A73] text-[12px] flex items-center gap-1">
                            📍 {jobLocation}
                          </span>
                        )}
                        {jobType && (
                          <span className="bg-[#f0f4f8] text-[#1E2A38] text-[11px] px-2 py-1 rounded-full">
                            {jobType}
                          </span>
                        )}
                        {salary && (
                          <span className="bg-[#e6f9e6] text-[#2AA100] text-[11px] px-2 py-1 rounded-full">
                            {salary}
                          </span>
                        )}
                      </div>
                      {description && (
                        <p className="text-[#646A73] text-[13px] mt-3 line-clamp-2">{description}</p>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobSearchSection;