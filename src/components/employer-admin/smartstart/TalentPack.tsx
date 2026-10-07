import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ls from "localstorage-slim";
import { APP_API_URL, httpPostWithToken } from "../../../utils/http_utils";
import { useToast } from "@chakra-ui/react";
import { X, Send } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

interface Freelancer {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string | null;
  bio?: string;
  rate?: string;
  hourly_rate?: string;
  skills?: string[];
  skillstamp_badge?: string | null;
  portfolio_url?: string | null;
  reviews_count?: number;
  rating?: number;
  reviews?: Review[];
}

interface SmartStartDetail {
  id: number;
  project_type: string;
  title: string;
  description: string;
  status: string;
  freelancers: Freelancer[];
  selected_freelancer_id: number | null;
}

// ── Star rating ────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }): JSX.Element {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={n <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

// ── Message Modal ──────────────────────────────────────────────────────────

function MessageModal({
  freelancer,
  onClose,
  onSend,
  sending,
}: {
  freelancer: Freelancer;
  onClose: () => void;
  onSend: (freelancer: Freelancer, text: string) => void;
  sending: boolean;
}): JSX.Element {
  const [text, setText] = useState("");
  const displayName =
    freelancer.name ||
    [freelancer.first_name, freelancer.last_name].filter(Boolean).join(" ") ||
    "Freelancer";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-1.5 transition"
        >
          <X size={18} />
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Send Message</h2>
        <p className="text-sm text-gray-400 mb-4">to {displayName}</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-300 focus:outline-none resize-none"
          rows={4}
          placeholder="Type your message here..."
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 text-sm transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSend(freelancer, text)}
            disabled={sending || !text.trim()}
            className="flex items-center gap-2 bg-emerald-700 text-white px-5 py-2 rounded-xl hover:bg-emerald-800 transition text-sm font-semibold disabled:opacity-50"
          >
            <Send size={14} />
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Freelancer Card ────────────────────────────────────────────────────────

interface FreelancerCardProps {
  freelancer: Freelancer;
  selected: boolean;
  alreadyChosen: boolean;
  onSelect: (id: number) => void;
  onMessage: (id: number) => void;
  isLoading: boolean;
}

function FreelancerCard({ freelancer, selected, alreadyChosen, onSelect, onMessage, isLoading }: FreelancerCardProps): JSX.Element {
  const displayName =
    freelancer.name ||
    [freelancer.first_name, freelancer.last_name].filter(Boolean).join(" ") ||
    "Freelancer";

  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const rating = freelancer.rating ?? 0;
  const reviewsCount = freelancer.reviews_count ?? 0;
  const rate = freelancer.rate || freelancer.hourly_rate || null;
  const skills = freelancer.skills ?? [];
  const reviews = freelancer.reviews ?? [];

  return (
    <div
      className={`bg-white border rounded-2xl p-5 transition-all  duration-150 ${
        selected
          ? "border-emerald-500 ring-2 ring-emerald-200"
          : "border-stone-200 hover:border-stone-300"
      }`}
    >
      {/* Profile row */}
      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0">
          {freelancer.avatar ? (
            <img
              src={freelancer.avatar}
              alt={displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
              {initials}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-gray-900">{displayName}</p>
            {freelancer.skillstamp_badge && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-700 text-white px-2 py-0.5 rounded-full">
                ✦ {freelancer.skillstamp_badge}
              </span>
            )}
          </div>
          {rating > 0 && (
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <Stars rating={rating} />
              <span className="text-xs text-gray-400">
                {rating.toFixed(1)} ({reviewsCount} review{reviewsCount !== 1 ? "s" : ""})
              </span>
            </div>
          )}
          {rate && <p className="text-sm font-semibold text-emerald-700 mt-0.5">{rate}</p>}
        </div>
      </div>

      {/* Bio */}
      {freelancer.bio && (
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">{freelancer.bio}</p>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {skills.map((s) => (
            <span key={s} className="text-[10px] font-medium bg-stone-100 text-gray-600 px-2 py-1 rounded-full">
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Reviews preview */}
      {reviews.length > 0 && (
        <div className="bg-stone-50 rounded-xl px-3 py-2.5 mb-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Latest review</p>
          <p className="text-xs text-gray-600 italic leading-relaxed line-clamp-2">
            "{reviews[0].comment}"
          </p>
          <p className="text-[10px] text-gray-400 mt-1">— {reviews[0].reviewer}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-1">
        {/* Portfolio + Message row */}
        <div className="flex items-center gap-2">
          {freelancer.portfolio_url && (
            <a
              href={freelancer.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl hover:bg-emerald-50 transition-all font-medium"
            >
              View portfolio ↗
            </a>
          )}
          <button
            onClick={() => onMessage(freelancer.id)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-stone-200 px-3 py-1.5 rounded-xl hover:bg-stone-50 transition-all"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Message
          </button>
        </div>

        {/* Select / chosen button */}
        {!alreadyChosen && (
          <button
            onClick={() => onSelect(freelancer.id)}
            disabled={isLoading}
            className={`w-full text-xs font-semibold py-2 rounded-xl transition-all duration-150 active:scale-95 ${
              selected
                ? "bg-emerald-700 text-white"
                : "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100"
            } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {selected ? "✓ Selected" : "Choose this freelancer"}
          </button>
        )}
        {alreadyChosen && selected && (
          <span className="w-full text-center text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 py-2 rounded-xl">
            ✓ Your chosen freelancer
          </span>
        )}
      </div>
    </div>
  );
}

// ── Root Component ─────────────────────────────────────────────────────────

export default function TalentPack(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [detail, setDetail] = useState<SmartStartDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selecting, setSelecting] = useState(false);
  const [selectError, setSelectError] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [messageFreelancer, setMessageFreelancer] = useState<Freelancer | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = ls.get("wwph_token", { decrypt: true });
        const res = await fetch(`${APP_API_URL}/employer/smartstart/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const raw = data.data ?? data;
        const freelancers = (raw.talent_pack ?? []).map((item: any) => {
          const f = item.freelancer ?? item;
          return {
            id: f.id,
            name: f.name,
            avatar: f.avatar ?? null,
            bio: f.bio ?? "",
            rate: f.expected_salary
              ? `₦${Number(f.expected_salary).toLocaleString()}`
              : null,
            skills: typeof f.skills === "string"
              ? f.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
              : (f.skills ?? []),
            skillstamp_badge: f.skillstamps?.[0]?.course_name ?? null,
            portfolio_url: f.portfolio?.[0]?.file_url ?? null,
            reviews_count: f.total_reviews ?? 0,
            rating: f.avg_rating ?? 0,
            reviews: f.latest_review
              ? [{
                  reviewer: f.latest_review.client_name ?? "Client",
                  rating: f.latest_review.rating ?? 0,
                  comment: f.latest_review.snippet ?? "",
                }]
              : [],
          };
        });
        const req: SmartStartDetail = { ...raw, freelancers };
        setDetail(req);
        if (req.selected_freelancer_id) {
          setSelectedId(req.selected_freelancer_id);
        }
      } catch {
        setError("Could not load the Talent Pack. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleMessage = (freelancerId: number) => {
    const freelancer = detail?.freelancers.find((f) => f.id === freelancerId) ?? null;
    setMessageFreelancer(freelancer);
  };

  const sendMessage = async (freelancer: Freelancer, text: string) => {
    if (!text.trim()) return;
    setSending(true);
    try {
      const res = await httpPostWithToken("chat/send-chat", {
        receiver_id: freelancer.id,
        message: text,
      });
      const chatId = res?.data?.id ?? res?.data?.chat_id ?? null;
      const displayName =
        freelancer.name ||
        [freelancer.first_name, freelancer.last_name].filter(Boolean).join(" ") ||
        "the freelancer";
      toast({
        status: "success",
        title: `Message sent to ${displayName}!`,
        isClosable: true,
        duration: 5000,
      });
      setMessageFreelancer(null);
      if (chatId) navigate("/employers-messages", { state: { chatId } });
      else navigate("/employers-messages");
    } catch {
      toast({ status: "error", title: "Failed to send message.", isClosable: true, duration: 5000 });
    } finally {
      setSending(false);
    }
  };

  const handleSelect = async (freelancerId: number) => {
    if (!detail) return;
    setSelectedId(freelancerId);
    setSelectError("");
    setSelecting(true);
    try {
      const token = ls.get("wwph_token", { decrypt: true });
      const res = await fetch(`${APP_API_URL}/employer/smartstart/${id}/select`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ freelancer_id: freelancerId }),
      });
      if (!res.ok) throw new Error();
      setConfirmed(true);
    } catch {
      setSelectError("Selection failed. Please try again.");
      setSelectedId(detail.selected_freelancer_id);
    } finally {
      setSelecting(false);
    }
  };

  // ── Confirmed state ──────────────────────────────────────────────────────

  if (confirmed) {
    const chosen = detail?.freelancers.find((f) => f.id === selectedId);
    return (
      <div className="min-h-screen bg-stone-50 flex justify-center px-4 py-10 font-sans">
        <div className="w-full max-w-lg text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Freelancer selected!</h2>
          {chosen && (
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto mb-6">
              You've chosen <strong className="text-gray-700">
                {chosen.name || [chosen.first_name, chosen.last_name].filter(Boolean).join(" ") || "the freelancer"}
              </strong>. They will receive your project details and send you a proposal shortly.
            </p>
          )}
          <div className="bg-stone-100 rounded-2xl px-5 py-4 text-left mb-6 text-sm text-gray-600 leading-relaxed">
            <p className="font-semibold text-gray-800 mb-2">What happens next</p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-gray-500">
              <li>The freelancer receives your project brief</li>
              <li>They send you a formal proposal</li>
              <li>You fund the escrow to start the work</li>
              <li>Work begins and payment releases on delivery</li>
            </ol>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/employers-messages")}
              className="text-sm font-semibold bg-emerald-700 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-all"
            >
              Go to Messages
            </button>
            <button
              onClick={() => navigate("/smartstart-requests")}
              className="text-sm font-semibold text-gray-500 border border-stone-200 px-5 py-2.5 rounded-xl hover:bg-stone-100 transition-all"
            >
              My requests
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────

  if (error || !detail) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">{error || "Something went wrong."}</p>
          <button
            onClick={() => navigate("/smartstart-requests")}
            className="text-sm text-emerald-700 underline"
          >
            ← Back to my requests
          </button>
        </div>
      </div>
    );
  }

  const alreadyChosen = !!detail.selected_freelancer_id;

  // ── Main view ────────────────────────────────────────────────────────────

  return (
    <>
    <div className="min-h-screen bg-stone-50 px-4 py-10 font-sans mt-20">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
        <button
          onClick={() => navigate("/smartstart-requests")}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors mb-6 flex items-center gap-1"
        >
          ← My SmartStart requests
        </button>

        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl font-bold text-gray-900 tracking-tight">SmartStart™</span>
            <span className="bg-emerald-700 text-emerald-50 text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              Talent Pack
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-800">
            {detail.title || detail.project_type}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Our team hand-picked {detail.freelancers.length} verified freelancer{detail.freelancers.length !== 1 ? "s" : ""} for your project. Review each one and choose the best fit.
          </p>
        </div>

        {alreadyChosen && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-xl px-4 py-3 mb-5">
            You have already selected a freelancer for this project. Awaiting their proposal.
          </div>
        )}

        {selectError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-5">
            {selectError}
          </div>
        )}

        {/* Freelancer cards */}
        {detail.freelancers.length === 0 ? (
          <div className="text-center py-16 text-sm text-gray-400">
            No freelancers have been assigned yet. Check back shortly.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {detail.freelancers.map((f) => (
              <FreelancerCard
                key={f.id}
                freelancer={f}
                selected={selectedId === f.id}
                alreadyChosen={alreadyChosen}
                onSelect={handleSelect}
                onMessage={handleMessage}
                isLoading={selecting}
              />
            ))}
          </div>
        )}

      </div>
    </div>

    {messageFreelancer && (
      <MessageModal
        freelancer={messageFreelancer}
        onClose={() => setMessageFreelancer(null)}
        onSend={sendMessage}
        sending={sending}
      />
    )}
    </>
  );
}
