import React, { useEffect, useRef, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { httpGetWithToken, httpPostWithToken, APP_API_URL } from "../../../utils/http_utils";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ls from "localstorage-slim";
import {
  MapPin,
  Briefcase,
  DollarSign,
  MessageSquare,
  Lock,
  ShieldCheck,
  Clock,
  X,
  Download,
  FileText,
  GraduationCap,
  User,
  Send,
} from "lucide-react";
import ReviewSummaryBadge from "../../../components/reviews/ReviewSummaryBadge";

const FILE_BASE_URL = APP_API_URL.replace("/api/v1", "");

const resolveAvatar = (avatar: string | null | undefined): string => {
  if (!avatar) return "/default-avatar.png";
  if (avatar.startsWith("http://") || avatar.startsWith("https://")) return avatar;
  return `${FILE_BASE_URL}${avatar.startsWith("/") ? "" : "/"}${avatar}`;
};

const resolveFileUrl = (path: string | null | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${FILE_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

// ── Talent Vault Plans ─────────────────────────────────────────────────────

const VAULT_PLANS = [
  { days: 3,  gbp: 9,  naira: 18000, label: "3-Day Access",  kobo: 18000 * 100 },
  { days: 7,  gbp: 15, naira: 30000, label: "7-Day Access",  kobo: 30000 * 100 },
  { days: 14, gbp: 25, naira: 50000, label: "14-Day Access", kobo: 50000 * 100 },
];

// ── Candidate Detail Modal ─────────────────────────────────────────────────

interface CandidateModalProps {
  candidate: any;
  onClose: () => void;
  onMessage: (candidate: any) => void;
}

const CandidateDetailModal: React.FC<CandidateModalProps> = ({ candidate, onClose, onMessage }) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const avatarUrl = resolveAvatar(candidate.avatar);
  const smartCvUrl = resolveFileUrl(candidate.smartcv);
  const cvUrl = resolveFileUrl(candidate.cv);

  console.log("SmartCV raw:", candidate.smartcv);
  console.log("SmartCV final URL:", smartCvUrl);
  console.log("FILE_BASE_URL:", FILE_BASE_URL);

  const displayName = candidate.first_name
    ? `${candidate.first_name} ${candidate.last_name || ""}`.trim()
    : candidate.name || "Unnamed Candidate";

  const skills: string[] = candidate.skills
    ? candidate.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6"
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ animation: "modalIn 0.2s ease-out" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-1.5 transition"
        >
          <X size={18} />
        </button>

        {/* Header band */}
        <div className="bg-gradient-to-br from-green-700 to-green-500 rounded-t-3xl px-8 pt-10 pb-16 text-white">
          <div className="flex items-center gap-5">
            <img
              src={avatarUrl}
              alt={displayName}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/default-avatar.png"; }}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/40 shadow-lg flex-shrink-0"
            />
            <div>
              <h2 className="text-2xl font-bold leading-tight">{displayName}</h2>
              <p className="text-green-100 text-sm mt-0.5">
                {candidate.experience || "Freelancer"}
              </p>
              {(candidate.city || candidate.country) && (
                <p className="flex items-center gap-1 text-green-100 text-xs mt-1">
                  <MapPin size={12} />
                  {[candidate.city, candidate.country].filter(Boolean).join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Body — overlaps header */}
        <div className="px-8 pb-8 -mt-8">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 bg-white rounded-2xl shadow-md p-4 mb-6">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">
                {candidate.completed_jobs ?? 0}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Jobs Done</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-xl font-bold text-gray-800">
                {candidate.expected_salary ? `₦${Number(candidate.expected_salary).toLocaleString()}` : "—"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Salary / hr</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-700">✓</p>
              <p className="text-xs text-gray-400 mt-0.5">Verified</p>
            </div>
          </div>

          {/* About */}
          <Section icon={<User size={16} />} title="About">
            <p className="text-sm text-gray-600 leading-relaxed">
              {candidate.bio || "No bio provided."}
            </p>
          </Section>

          {/* Skills */}
          {skills.length > 0 && (
            <Section icon={<Briefcase size={16} />} title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-green-50 text-green-700 border border-green-200 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Experience */}
          {candidate.experience && (
            <Section icon={<Briefcase size={16} />} title="Experience">
              <p className="text-sm text-gray-600 whitespace-pre-line">{candidate.experience}</p>
            </Section>
          )}

          {/* Education */}
          {candidate.education && (
            <Section icon={<GraduationCap size={16} />} title="Education">
              <p className="text-sm text-gray-600 whitespace-pre-line">{candidate.education}</p>
            </Section>
          )}

          {/* Documents */}
          {(cvUrl || smartCvUrl) && (
            <Section icon={<FileText size={16} />} title="Documents">
              <div className="flex flex-wrap gap-3">
                {cvUrl && (
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-xl transition font-medium"
                  >
                    <Download size={14} /> Download CV
                  </a>
                )}
                {smartCvUrl && (
                  <a
                    href={smartCvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-sm px-4 py-2 rounded-xl transition font-medium"
                  >
                    <FileText size={14} /> View SmartCV
                  </a>
                )}
              </div>
            </Section>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={() => { onClose(); onMessage(candidate); }}
              className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white py-3 rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
              <Send size={16} /> Message Candidate
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 border border-gray-200 rounded-2xl text-gray-600 hover:bg-gray-50 text-sm font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({
  icon, title, children,
}) => (
  <div className="mb-5">
    <h3 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
      {icon} {title}
    </h3>
    {children}
  </div>
);

// ── Message Modal ──────────────────────────────────────────────────────────

const MessageModal: React.FC<{
  candidate: any;
  onClose: () => void;
  onSend: (candidate: any, text: string) => void;
  sending: boolean;
}> = ({ candidate, onClose, onSend, sending }) => {
  const [text, setText] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full p-1.5 transition"
        >
          <X size={18} />
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          Send Message
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          to {candidate?.first_name || candidate?.name || "Candidate"}
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-300 focus:outline-none resize-none"
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
            onClick={() => onSend(candidate, text)}
            disabled={sending || !text.trim()}
            className="bg-green-700 text-white px-5 py-2 rounded-xl hover:bg-green-800 transition text-sm font-semibold disabled:opacity-50"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Candidate Card ─────────────────────────────────────────────────────────

const CandidateCard: React.FC<{
  candidate: any;
  onViewDetails: (c: any) => void;
  onMessage: (c: any) => void;
}> = ({ candidate, onViewDetails, onMessage }) => {
  const avatarUrl = resolveAvatar(candidate.avatar);
  const displayName = candidate.first_name
    ? `${candidate.first_name} ${candidate.last_name || ""}`.trim()
    : candidate.name || "Unnamed";
  const skills: string[] = candidate.skills
    ? candidate.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group overflow-hidden">
      {/* Card top */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Avatar + name row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={avatarUrl}
              alt={displayName}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/default-avatar.png"; }}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-green-100 group-hover:ring-green-300 transition"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-gray-900 text-base leading-tight truncate">{displayName}</h2>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {candidate.experience?.split("\n")[0] || "Freelancer"}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <ReviewSummaryBadge
            freelancerId={candidate.id}
            freelancerName={displayName}
            theme="light"
          />
        </div>

        {/* Location + salary */}
        <div className="text-xs text-gray-500 space-y-1 mb-3">
          {(candidate.city || candidate.country) && (
            <p className="flex items-center gap-1.5">
              <MapPin size={12} className="text-gray-400 flex-shrink-0" />
              {[candidate.city, candidate.country].filter(Boolean).join(", ")}
            </p>
          )}
          <p className="flex items-center gap-1.5">
            <DollarSign size={12} className="text-gray-400 flex-shrink-0" />
            {candidate.expected_salary
              ? `₦${Number(candidate.expected_salary).toLocaleString()} / hr`
              : "Rate not set"}
          </p>
          <p className="flex items-center gap-1.5">
            <Briefcase size={12} className="text-gray-400 flex-shrink-0" />
            {candidate.completed_jobs || 0} jobs completed
          </p>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skills.slice(0, 4).map((skill, i) => (
              <span key={i} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full">
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="text-[11px] text-gray-400 px-1">+{skills.length - 4} more</span>
            )}
          </div>
        )}

        {/* Bio snippet */}
        {candidate.bio && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-1 flex-1">
            {candidate.bio}
          </p>
        )}
      </div>

      {/* Card footer */}
      <div className="px-5 pb-5 flex gap-2">
        <button
          onClick={() => onViewDetails(candidate)}
          className="flex-1 py-2 text-sm font-semibold border-2 border-green-600 text-green-700 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-200"
        >
          View Details
        </button>
        <button
          onClick={() => onMessage(candidate)}
          className="flex items-center justify-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all"
        >
          <MessageSquare size={14} />
        </button>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────

const BrowseCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [hasPaid, setHasPaid] = useState(false);
  const [isSmartStart, setIsSmartStart] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [detailCandidate, setDetailCandidate] = useState<any>(null);
  const [messageCandidate, setMessageCandidate] = useState<any>(null);

  const toast = useToast();
  const navigate = useNavigate();

  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY!;

  const userEmail: string = (() => {
    const plain = localStorage.getItem("email");
    if (plain) return plain;
    const u = ls.get("wwph_usr", { decrypt: true }) as any;
    return u?.email || "";
  })();

  const [payRefs] = useState(() =>
    VAULT_PLANS.map((p) => `talentvault_${p.days}d_${Date.now() + p.days}`)
  );

  const initPay3  = usePaystackPayment({ reference: payRefs[0], email: userEmail, amount: VAULT_PLANS[0].kobo, publicKey, currency: "NGN" });
  const initPay7  = usePaystackPayment({ reference: payRefs[1], email: userEmail, amount: VAULT_PLANS[1].kobo, publicKey, currency: "NGN" });
  const initPay14 = usePaystackPayment({ reference: payRefs[2], email: userEmail, amount: VAULT_PLANS[2].kobo, publicKey, currency: "NGN" });
  const payInitFns = [initPay3, initPay7, initPay14];

  const fetchCandidates = async () => {
    try {
      const res = await httpGetWithToken("employer/browse-candidates");
      const payload = res?.data ?? res;

      console.log("[TalentVault] raw response:", res);

      if (!payload || res?.error) {
        toast({ status: "error", title: "Failed to fetch candidates" });
        setLoading(false);
        return;
      }

      if (payload.smartstart_required) {
        setIsSmartStart(false);
      } else if (payload.payment_required) {
        setIsSmartStart(true);
        setHasPaid(false);
        setCandidates([]);
      } else {
        const list = Array.isArray(payload) ? payload : payload.data ?? [];
        console.log("[TalentVault] candidates:", list);
        if (list.length > 0) console.log("[TalentVault] first avatar:", list[0]?.avatar);
        setIsSmartStart(true);
        setCandidates(list);
        setHasPaid(true);
      }
    } catch {
      toast({ status: "error", title: "Failed to fetch candidates" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlanPayment = (planIndex: number) => {
    const plan = VAULT_PLANS[planIndex];
    const initFn = payInitFns[planIndex] as any;
    try {
      initFn({
        onSuccess: async (ref: any) => {
          try {
            await httpPostWithToken("employer/record-payment", {
              reference: ref.reference,
              amount: plan.naira,
              status: "success",
              days: plan.days,
            });
            toast({ status: "success", title: `Access granted for ${plan.days} days!` });
            fetchCandidates();
          } catch {
            toast({ status: "error", title: "Payment recorded but access failed. Contact support." });
          }
        },
        onClose: () => {},
      });
    } catch (err) {
      console.error("Payment init error:", err);
      toast({ status: "error", title: "Could not open payment. Please refresh." });
    }
  };

  const sendMessage = async (candidate: any, text: string) => {
    if (!text.trim()) {
      toast({ status: "error", title: "Please enter a message" });
      return;
    }
    setSending(true);
    try {
      const res = await httpPostWithToken("chat/send-chat", {
        receiver_id: candidate.id,
        message: text,
      });
      const chatId = res?.data?.id ?? res?.data?.chat_id ?? null;
      toast({ status: "success", title: `Message sent to ${candidate?.first_name || "candidate"}!`, isClosable: true, duration: 5000 });
      setMessageCandidate(null);
      if (chatId) navigate("/employers-messages", { state: { chatId } });
      else navigate("/employers-messages");
    } catch {
      toast({ status: "error", title: "Failed to send message.", isClosable: true, duration: 5000 });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="lg:ml-64 p-6 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm">Loading Talent Vault…</p>
        </div>
      </div>
    );
  }

  if (isSmartStart === false) {
    return (
      <div className="lg:ml-64 p-6 bg-gray-50 min-h-screen flex items-center justify-center py-[8rem]">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">SmartStart™ Members Only</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            The Talent Vault is exclusively available to employers who have activated a
            SmartStart™ plan. Upgrade to unlock access to our verified talent pool.
          </p>
          <button
            onClick={() => navigate("/employer-smartstart")}
            className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition-all"
          >
            Activate SmartStart™
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-64 p-6 bg-gray-50 min-h-screen py-[8rem]">
      {/* Header */}
      <header className="mb-8 border-b pb-5">
        <div className="flex items-center gap-3 mb-1">
          <ShieldCheck className="w-6 h-6 text-green-700" />
          <h1 className="text-2xl font-bold text-gray-800">Talent Vault</h1>
          <span className="bg-green-700 text-green-50 text-xs font-semibold px-3 py-1 rounded-full">
            SmartStart™ Exclusive
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Access verified freelancers hand-picked from our talent pool.
        </p>
      </header>

      {/* Pricing wall */}
      {!hasPaid ? (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access the Verified Talent Vault</h2>
            <p className="text-gray-500 text-sm">Choose a plan to unlock the full verified candidate list.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VAULT_PLANS.map((plan, i) => (
              <div
                key={plan.days}
                className={`bg-white rounded-2xl border-2 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all ${
                  i === 1 ? "border-green-600 scale-105" : "border-gray-200"
                }`}
              >
                {i === 1 && (
                  <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{plan.label}</span>
                </div>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-gray-900">£{plan.gbp}</span>
                </div>
                <p className="text-xs text-gray-400 mb-6">≈ ₦{plan.naira.toLocaleString()}</p>
                <button
                  onClick={() => handlePlanPayment(i)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    i === 1
                      ? "bg-green-700 text-white hover:bg-green-800"
                      : "bg-green-50 text-green-800 border border-green-300 hover:bg-green-100"
                  }`}
                >
                  Get {plan.days}-Day Access
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Candidate grid */
        <>
          <p className="text-sm text-gray-400 mb-5">
            {candidates.length} verified candidate{candidates.length !== 1 ? "s" : ""} available
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {candidates.length > 0 ? (
              candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onViewDetails={setDetailCandidate}
                  onMessage={setMessageCandidate}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center py-12">No candidates found.</p>
            )}
          </div>
        </>
      )}

      {/* Detail modal */}
      {detailCandidate && (
        <CandidateDetailModal
          candidate={detailCandidate}
          onClose={() => setDetailCandidate(null)}
          onMessage={(c) => { setDetailCandidate(null); setMessageCandidate(c); }}
        />
      )}

      {/* Message modal */}
      {messageCandidate && (
        <MessageModal
          candidate={messageCandidate}
          onClose={() => setMessageCandidate(null)}
          onSend={sendMessage}
          sending={sending}
        />
      )}
    </div>
  );
};

export default BrowseCandidates;
