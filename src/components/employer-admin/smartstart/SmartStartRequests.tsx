import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ls from "localstorage-slim";
import { APP_API_URL } from "../../../utils/http_utils";

// ── Types ──────────────────────────────────────────────────────────────────

interface SmartStartRequest {
  id: number;
  project_type: string;
  title: string;
  status: "pending_review" | "talent_pack_ready" | "freelancer_selected" | "completed";
  created_at: string;
  budget_min: string;
  budget_max: string;
  deadline: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  SmartStartRequest["status"],
  { label: string; color: string; dot: string }
> = {
  pending_review: {
    label: "Under Review",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
  },
  talent_pack_ready: {
    label: "Talent Pack Ready",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  freelancer_selected: {
    label: "Freelancer Selected",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    color: "bg-gray-100 text-gray-500 border-gray-200",
    dot: "bg-gray-400",
  },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Component ──────────────────────────────────────────────────────────────

export default function SmartStartRequests(): JSX.Element {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<SmartStartRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = ls.get("wwph_token", { decrypt: true });
        const res = await fetch(`${APP_API_URL}/employer/smartstart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setRequests(data.data ?? data);
      } catch {
        setError("Could not load your SmartStart requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen mt-20 bg-stone-50 px-4 py-10 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xl font-bold text-gray-900 tracking-tight">Workason</span>
              <span className="bg-emerald-700 text-emerald-50 text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
                SmartStart™
              </span>
            </div>
            <p className="text-sm text-gray-500">Your project matching requests</p>
          </div>
          <button
            onClick={() => navigate("/smartstart")}
            className="text-sm font-semibold bg-emerald-700 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-800 transition-all active:scale-95"
          >
            + New request
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <svg className="animate-spin h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && requests.length === 0 && (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="12" y2="13" />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold mb-1">No SmartStart requests yet</p>
            <p className="text-sm text-gray-400 mb-5">Submit your first project and we'll hand-pick the best freelancers for you.</p>
            <button
              onClick={() => navigate("/smartstart")}
              className="text-sm font-semibold bg-emerald-700 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-all"
            >
              Start with SmartStart™
            </button>
          </div>
        )}

        {/* Request list */}
        {!loading && !error && requests.length > 0 && (
          <div className="flex flex-col gap-3">
            {requests.map((req) => {
              const cfg = STATUS_CONFIG[req.status] ?? STATUS_CONFIG.pending_review;
              const canViewPack = req.status === "talent_pack_ready" || req.status === "freelancer_selected";
              const budget =
                req.budget_min || req.budget_max
                  ? `£${req.budget_min || "0"} – £${req.budget_max || "?"}`
                  : "Budget not set";

              return (
                <div
                  key={req.id}
                  className="bg-white border border-stone-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900 truncate">
                        {req.title || req.project_type}
                      </span>
                      <span className="text-[10px] text-gray-400 bg-stone-100 px-2 py-0.5 rounded-full shrink-0">
                        {req.project_type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                      <span>{budget}</span>
                      {req.deadline && <span>· Due {formatDate(req.deadline)}</span>}
                      <span>· Submitted {formatDate(req.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Status badge */}
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${cfg.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>

                    {canViewPack && (
                      <button
                        onClick={() => navigate(`/smartstart/${req.id}/talent-pack`)}
                        className="text-xs font-semibold text-emerald-700 border border-emerald-300 px-3 py-1.5 rounded-xl hover:bg-emerald-50 transition-all"
                      >
                        View Talent Pack →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info banner */}
        {!loading && !error && (
          <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 flex gap-3">
            <span className="text-emerald-600 text-lg shrink-0">ℹ</span>
            <p className="text-xs text-emerald-800 leading-relaxed">
              After submitting a request, our team reviews it within <strong>24–48 hours</strong> and sends you a curated Talent Pack of 3–5 verified freelancers. You'll be notified by email when it's ready.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
