import React, { useEffect, useState, useRef } from "react";
import { httpGetWithToken, httpGetWithoutToken, httpPostWithToken } from "../../../../utils/http_utils";
import { Button, useToast } from "@chakra-ui/react";
import { UilEye, UilShareAlt, UilSearch, UilTimes } from "@iconscout/react-unicons";
import { useJobNotifications } from "../../../job-alert-system/JobNotificationContext";
import { Link } from "react-router-dom";

const JOB_TYPE_OPTIONS = ["Virtual Assistant", "Video Editor"];

const safeStr = (val: any): string => {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") return val?.name ?? val?.title ?? "";
  return "";
};

const JobAlertTable: React.FC = () => {
  const [profile, setProfile] = useState<any>({});
  const [jobAlerts, setJobAlerts] = useState<any[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [action, setAction] = useState<"View" | "Apply" | "Share" | null>(null);
  const [fetchingJobs, setFetchingJobs] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // ── Filter state ──
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const locationRef = useRef<HTMLDivElement>(null);

  const toast = useToast();
  const { setNewJobsCount, setJobAlerts: setGlobalJobAlerts } = useJobNotifications();

  // ── Fetch countries for autocomplete ──
  const fetchCountries = async () => {
    try {
      const resp = await httpGetWithoutToken("resources", {});
      if (resp?.status === "success") {
        const raw = resp?.data?.countries ?? resp?.data?.location ?? resp?.data?.locations ?? [];
        let parsed: string[] = [];
        if (Array.isArray(raw)) {
          raw.forEach((item: any) => {
            const name = typeof item === "string" ? item : safeStr(item?.country ?? item?.name);
            if (name) parsed.push(name);
          });
          parsed = Array.from(new Set(parsed));
        }
        setCountries(parsed);
      }
    } catch {
      setCountries([]);
    }
  };

  // ── Fetch jobs with optional filters ──
  const getJobAlert = async (pageNumber = 1, location = "", jobType = "") => {
    setFetchingJobs(true);
    try {
      let url = `jobs-alert?page=${pageNumber}`;
      if (location.trim()) url += `&location=${encodeURIComponent(location.trim())}`;
      if (jobType.trim()) url += `&jobType=${encodeURIComponent(jobType.trim())}`;

        console.log("Fetching:", url); 

      const res = await httpGetWithToken(url);
      const jobs: any[] = res?.data?.data || res?.data || [];

      if (!Array.isArray(jobs)) {
        setJobAlerts([]);
        setNewJobsCount(0);
        setGlobalJobAlerts([]);
        return;
      }

      if (pageNumber === 1) {
        setJobAlerts(jobs);
      } else {
        setJobAlerts((prev) => [...prev, ...jobs]);
      }

      setNewJobsCount(jobs.length);
      setGlobalJobAlerts(jobs);
      setHasMore(jobs.length >= 10);
    } catch (err) {
      console.error("Failed to fetch job alerts:", err);
      setJobAlerts([]);
      setNewJobsCount(0);
      setGlobalJobAlerts([]);
    } finally {
      setFetchingJobs(false);
    }
  };

  const loadNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getJobAlert(nextPage, locationQuery, selectedJobType);
  };

  const getProfile = async () => {
    try {
      const res = await httpGetWithToken("profile");
      setProfile(res.data);
    } catch (err) {
      console.error("Profile load failed:", err);
    }
  };

  useEffect(() => {
    getProfile();
    fetchCountries();
    getJobAlert(1);
  }, []);

  // ── Close suggestions on outside click ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
    setPage(1);
    getJobAlert(1, country, selectedJobType);
  };

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedJobType(val);
    setPage(1);
    getJobAlert(1, locationQuery, val);
  };

  const handleSearch = () => {
    setPage(1);
    getJobAlert(1, locationQuery, selectedJobType);
  };

  const handleClearFilters = () => {
    setLocationQuery("");
    setSelectedJobType("");
    setPage(1);
    getJobAlert(1, "", "");
  };

  const handleApplySuccess = async (jobId: number) => {
    setSelectedAlert(null);
    setAction(null);
    setPage(1);
    await getJobAlert(1, locationQuery, selectedJobType);
  };

  const renderSmartCV = () => {
    if (profile.smartcv) {
      const url = String(profile.smartcv);
      return React.createElement(
        "a",
        {
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex w-auto shrink-0 bg-green-600 hover:bg-green-700 text-white px-2 py-1.5 rounded-md font-medium transition text-sm",
        },
        "View SmartCV"
      );
    }
    return (
      <p className="text-red-500 text-sm">
        No SmartCV available.{" "}
        <Link to="/smart-cv" className="text-green-600 underline hover:text-green-700 font-medium">
          Go to SmartCV
        </Link>{" "}
        to generate one.
      </p>
    );
  };

  const hasActiveFilters = locationQuery.trim() || selectedJobType;

  return (
    <section className="mt-12 px-6 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-green-700">Job Alerts</h2>
        <button
          onClick={() => { setPage(1); getJobAlert(1, locationQuery, selectedJobType); }}
          disabled={fetchingJobs}
          className="text-sm text-green-700 border border-green-600 px-3 py-1.5 rounded-lg hover:bg-green-50 transition disabled:opacity-50"
        >
          {fetchingJobs ? "Refreshing..." : "↻ Refresh"}
        </button>
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
        {/* Location input */}
        <div className="flex-1 relative" ref={locationRef}>
          <div className="relative">
            <UilSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by location e.g Lagos"
              value={locationQuery}
              onChange={handleLocationChange}
              onFocus={() => { if (locationQuery.trim().length > 0) setShowSuggestions(true); }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          {showSuggestions && locationSuggestions.length > 0 && (
            <ul className="absolute z-50 top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg max-h-[180px] overflow-y-auto">
              {locationSuggestions.map((c, i) => (
                <li
                  key={i}
                  onMouseDown={() => handleSelectCountry(c)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-green-50 cursor-pointer"
                >
                  📍 {c}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Job type select */}
        <select
          value={selectedJobType}
          onChange={handleJobTypeChange}
          className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All job types</option>
          {JOB_TYPE_OPTIONS.map((type, i) => (
            <option key={i} value={type}>{type}</option>
          ))}
        </select>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition whitespace-nowrap"
        >
          Search
        </button>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition whitespace-nowrap px-2"
          >
            <UilTimes size={16} /> Clear
          </button>
        )}
      </div>

      {/* Active filter tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {locationQuery && (
            <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
              📍 {locationQuery}
              <button onClick={() => { setLocationQuery(""); setPage(1); getJobAlert(1, "", selectedJobType); }}>
                <UilTimes size={12} />
              </button>
            </span>
          )}
          {selectedJobType && (
            <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
              💼 {selectedJobType}
              <button onClick={() => { setSelectedJobType(""); setPage(1); getJobAlert(1, locationQuery, ""); }}>
                <UilTimes size={12} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* ── Job List ── */}
      <div className="space-y-6">
        {fetchingJobs && page === 1 ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : jobAlerts.length > 0 ? (
          <>
            <p className="text-sm text-gray-500">
              {jobAlerts.length} job{jobAlerts.length !== 1 ? "s" : ""} found
              {locationQuery ? ` in "${locationQuery}"` : ""}
              {selectedJobType ? ` · ${selectedJobType}` : ""}
            </p>
            {jobAlerts.map((job, i) => (
              <div
                key={job.id ?? i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      🕐 {job.posted || "recently"}
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mt-1">
                      {job.title || "Untitled Job"}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {job.company?.name || "Unknown Company"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {job.type || "Full-time"} • {job.level || "Intermediate"} •{" "}
                      {job.duration || "6+ months"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSelectedAlert(job); setAction("Apply"); }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => { setSelectedAlert(job); setAction("Share"); }}
                      className="border border-green-600 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition flex items-center gap-1"
                    >
                      <UilShareAlt size={16} /> Share
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mt-3 leading-relaxed line-clamp-3">
                  {job.description || "No job description available."}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills && job.skills.length > 0 ? (
                    job.skills.map((skill: string, idx: number) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">No skills listed</span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span>⭐ {job.rating || "5.0"}</span>
                    <span>${job.salary || "N/A"}</span>
                    <span>📍 {job.location || "Remote"}</span>
                  </div>
                  <button
                    onClick={() => { setSelectedAlert(job); setAction("View"); }}
                    className="text-green-700 font-medium hover:underline flex items-center gap-1"
                  >
                    <UilEye size={16} /> View
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              {hasActiveFilters
                ? `No jobs found${locationQuery ? ` in "${locationQuery}"` : ""}${selectedJobType ? ` for "${selectedJobType}"` : ""}.`
                : "No new job alerts available."}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              {hasActiveFilters ? "Try adjusting your filters." : "Check back later or refresh to see new postings."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="mt-3 text-green-600 underline text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Load More */}
      {hasMore && !fetchingJobs && jobAlerts.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadNextPage}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Load More Jobs
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40 px-4">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg relative">
            <button
              onClick={() => { setSelectedAlert(null); setAction(null); }}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              ✕
            </button>

            {action === "View" && (
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">{selectedAlert.title}</h3>
                <p className="text-gray-700 text-sm mb-2">{selectedAlert.description}</p>
                <p className="text-gray-500 text-xs mt-3">
                  {selectedAlert.city && `${selectedAlert.city}, `}{selectedAlert.country}
                </p>
              </div>
            )}

            {action === "Share" && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">Share this Job</h3>
                <input type="email" placeholder="Enter email to share" className="w-full border rounded-md p-2 mb-4" />
                <Button colorScheme="green" w="full">Send Invite</Button>
              </div>
            )}

            {action === "Apply" && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-600">
                  Apply for {selectedAlert.title}
                </h3>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const reason = (e.target as HTMLFormElement).reason.value;
                    if (!profile.smartcv) {
                      toast({ status: "error", title: "You must generate your SmartCV before applying" });
                      return;
                    }
                    const formData = new FormData();
                    formData.append("cv_url", profile.smartcv);
                    formData.append("experience_years", "0");
                    formData.append("reason", reason);
                    try {
                      const res = await httpPostWithToken(`apply-job/${selectedAlert.id}`, formData);
                      if (res.status === "success") {
                        toast({ status: "success", title: "Application submitted successfully!" });
                        await handleApplySuccess(selectedAlert.id);
                      } else {
                        toast({ status: "error", title: res.message || "Failed to submit application" });
                      }
                    } catch (error) {
                      toast({ status: "error", title: "Something went wrong. Please try again." });
                    }
                  }}
                >
                  {renderSmartCV()}
                  <textarea
                    name="reason"
                    placeholder="Why are you a good fit?"
                    className="border p-2 rounded-md"
                    rows={4}
                    required
                  />
                  <Button colorScheme="green" w="full" type="submit">Submit Application</Button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default JobAlertTable;