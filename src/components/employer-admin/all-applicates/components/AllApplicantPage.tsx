import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { httpGetWithToken, httpPostWithToken, APP_API_URL } from "../../../../utils/http_utils";
import { useToast } from "@chakra-ui/react";
import ReviewSummaryBadge from "../../../../components/reviews/ReviewSummaryBadge";
import ReviewFormModal from "../../../../components/reviews/ReviewFormModal";
import {
  MapPin,
  Briefcase,
  DollarSign,
  MessageSquare,
  X,
  Download,
  FileText,
  GraduationCap,
  User,
  Send,
  CheckCircle,
  XCircle,
  Search,
  ChevronDown,
} from "lucide-react";

// ── URL helpers ────────────────────────────────────────────────────────────

const FILE_BASE_URL = APP_API_URL.replace("/api/v1", "");

const resolveAvatar = (avatar?: string | null): string => {
  if (!avatar) return "/default-avatar.png";
  if (avatar.startsWith("http://") || avatar.startsWith("https://")) return avatar;
  return `${FILE_BASE_URL}${avatar.startsWith("/") ? "" : "/"}${avatar}`;
};

const resolveFileUrl = (path?: string | null): string | null => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${FILE_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

// ── Section helper ─────────────────────────────────────────────────────────

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

// ── Status helpers ─────────────────────────────────────────────────────────

const STATUS_META: Record<string, { label: string; classes: string }> = {
  approved: { label: "Approved",  classes: "bg-green-100 text-green-700" },
  rejected: { label: "Rejected",  classes: "bg-red-100 text-red-600" },
  submitted:{ label: "Pending",   classes: "bg-yellow-100 text-yellow-700" },
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const meta = STATUS_META[status?.toLowerCase()] ?? STATUS_META.submitted;
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${meta.classes}`}>
      {meta.label}
    </span>
  );
};

// ── Applicant Detail Modal ─────────────────────────────────────────────────

interface DetailModalProps {
  applicant: any;
  onClose: () => void;
  onMessage: (a: any) => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  actionLoading: boolean;
}

const ApplicantDetailModal: React.FC<DetailModalProps> = ({
  applicant, onClose, onMessage, onApprove, onReject, actionLoading,
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const u = applicant.user ?? {};
  const status = applicant.status?.toLowerCase();
  const isPending = status !== "approved" && status !== "rejected";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const avatarUrl  = resolveAvatar(u.avatar);
  const smartCvUrl = resolveFileUrl(u.smartcv);
  const cvUrl      = resolveFileUrl(u.cv);

  const displayName = u.first_name
    ? `${u.first_name} ${u.last_name || ""}`.trim()
    : u.name || "Unknown Candidate";

  const skills: string[] = u.skills
    ? u.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  console.log("Applicant SmartCV raw:", u.smartcv);
  console.log("Applicant SmartCV URL:", smartCvUrl);
  console.log("FILE_BASE_URL:", FILE_BASE_URL);
  console.log("Applicant avatar raw:", u.avatar);

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
              {u.experience && (
                <p className="text-green-100 text-sm mt-0.5">{u.experience.split("\n")[0]}</p>
              )}
              {(u.city || u.country) && (
                <p className="flex items-center gap-1 text-green-100 text-xs mt-1">
                  <MapPin size={12} />
                  {[u.city, u.country].filter(Boolean).join(", ")}
                </p>
              )}
              <div className="mt-2">
                <StatusBadge status={applicant.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 -mt-8">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 bg-white rounded-2xl shadow-md p-4 mb-6">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">
                {u.completed_jobs ?? 0}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Jobs Done</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-xl font-bold text-gray-800">
                {u.expected_salary
                  ? `₦${Number(u.expected_salary).toLocaleString()}`
                  : "—"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Salary / hr</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-600 mt-1 truncate">
                {applicant.job?.title || "—"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Applied For</p>
            </div>
          </div>

          {/* About */}
          <Section icon={<User size={16} />} title="About">
            <p className="text-sm text-gray-600 leading-relaxed">
              {u.bio || "No bio provided."}
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
          {u.experience && (
            <Section icon={<Briefcase size={16} />} title="Experience">
              <p className="text-sm text-gray-600 whitespace-pre-line">{u.experience}</p>
            </Section>
          )}

          {/* Education */}
          {u.education && (
            <Section icon={<GraduationCap size={16} />} title="Education">
              <p className="text-sm text-gray-600 whitespace-pre-line">{u.education}</p>
            </Section>
          )}

          {/* Review */}
          {u.id && (
            <Section icon={<CheckCircle size={16} />} title="Reviews">
              <ReviewSummaryBadge
                freelancerId={u.id}
                freelancerName={displayName}
                theme="light"
              />
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
          <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-100">
            <button
              onClick={() => { onClose(); onMessage(applicant); }}
              className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white py-3 rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
              <Send size={16} /> Message Candidate
            </button>

            {isPending && (
              <>
                <button
                  onClick={() => onApprove(applicant.id)}
                  disabled={actionLoading}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-3 px-5 rounded-2xl font-semibold text-sm transition-all"
                >
                  <CheckCircle size={16} />
                  {actionLoading ? "…" : "Approve"}
                </button>
                <button
                  onClick={() => onReject(applicant.id)}
                  disabled={actionLoading}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-3 px-5 rounded-2xl font-semibold text-sm transition-all"
                >
                  <XCircle size={16} />
                  {actionLoading ? "…" : "Reject"}
                </button>
              </>
            )}

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

// ── Message Modal ──────────────────────────────────────────────────────────

const MessageModal: React.FC<{
  applicant: any;
  onClose: () => void;
  onSend: (applicant: any, text: string) => void;
  sending: boolean;
}> = ({ applicant, onClose, onSend, sending }) => {
  const [text, setText] = useState("");
  const name = applicant?.user?.first_name || applicant?.user?.name || "Candidate";
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
        <p className="text-sm text-gray-400 mb-4">to {name}</p>
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
            onClick={() => onSend(applicant, text)}
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

// ── Applicant Card ─────────────────────────────────────────────────────────

interface CardProps {
  applicant: any;
  onViewDetails: (a: any) => void;
  onMessage: (a: any) => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  actionLoading: boolean;
}

const ApplicantCard: React.FC<CardProps> = ({
  applicant, onViewDetails, onMessage, onApprove, onReject, actionLoading,
}) => {
  const u = applicant.user ?? {};
  const status = applicant.status?.toLowerCase();
  const isPending = status !== "approved" && status !== "rejected";

  const avatarUrl = resolveAvatar(u.avatar);
  const displayName = u.first_name
    ? `${u.first_name} ${u.last_name || ""}`.trim()
    : u.name || "Unnamed";
  const skills: string[] = u.skills
    ? u.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  const [canReview, setCanReview] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    if (status !== "approved" || !u.id) return;
    httpGetWithToken(`employer/reviews/can-review/${u.id}`).then((res: any) => {
      if (res?.data?.can_review) setCanReview(true);
    });
  }, [status, u.id]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group overflow-hidden">
        <div className="p-5 flex-1 flex flex-col">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-shrink-0">
              <img
                src={avatarUrl}
                alt={displayName}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/default-avatar.png"; }}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-green-100 group-hover:ring-green-300 transition"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  status === "approved" ? "bg-green-500" : status === "rejected" ? "bg-red-400" : "bg-yellow-400"
                }`}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 className="font-bold text-gray-900 text-base leading-tight truncate">{displayName}</h2>
                <StatusBadge status={applicant.status} />
              </div>
              {u.experience && (
                <p className="text-xs text-gray-400 truncate mt-0.5">
                  {u.experience.split("\n")[0]}
                </p>
              )}
            </div>
          </div>

          {/* Job title */}
          {applicant.job?.title && (
            <p className="text-xs text-green-700 font-semibold bg-green-50 px-2 py-1 rounded-lg inline-block mb-3 self-start">
              Applied: {applicant.job.title}
            </p>
          )}

          {/* Rating */}
          {u.id && (
            <div className="mb-3">
              <ReviewSummaryBadge
                freelancerId={u.id}
                freelancerName={displayName}
                theme="light"
              />
            </div>
          )}

          {/* Location + salary */}
          <div className="text-xs text-gray-500 space-y-1 mb-3">
            {(u.city || u.country) && (
              <p className="flex items-center gap-1.5">
                <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                {[u.city, u.country].filter(Boolean).join(", ")}
              </p>
            )}
            <p className="flex items-center gap-1.5">
              <DollarSign size={12} className="text-gray-400 flex-shrink-0" />
              {u.expected_salary
                ? `₦${Number(u.expected_salary).toLocaleString()} / hr`
                : "Rate not set"}
            </p>
            {u.completed_jobs != null && (
              <p className="flex items-center gap-1.5">
                <Briefcase size={12} className="text-gray-400 flex-shrink-0" />
                {u.completed_jobs} jobs completed
              </p>
            )}
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
          {u.bio && (
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1 mb-1">{u.bio}</p>
          )}

          {/* Leave review */}
          {canReview && (
            <button
              onClick={() => setReviewOpen(true)}
              className="mt-2 self-start text-xs font-medium text-green-700 border border-green-300 px-3 py-1 rounded-full hover:bg-green-50 transition"
            >
              + Leave Review
            </button>
          )}
        </div>

        {/* Card footer */}
        <div className="px-5 pb-5 space-y-2">
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(applicant)}
              className="flex-1 py-2 text-sm font-semibold border-2 border-green-600 text-green-700 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-200"
            >
              View Details
            </button>
            <button
              onClick={() => onMessage(applicant)}
              className="flex items-center justify-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all"
            >
              <MessageSquare size={14} />
            </button>
          </div>

          {isPending && (
            <div className="flex gap-2">
              <button
                onClick={() => onApprove(applicant.id)}
                disabled={actionLoading}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-all"
              >
                <CheckCircle size={13} /> Approve
              </button>
              <button
                onClick={() => onReject(applicant.id)}
                disabled={actionLoading}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50 transition-all"
              >
                <XCircle size={13} /> Reject
              </button>
            </div>
          )}
        </div>
      </div>

      {u.id && (
        <ReviewFormModal
          isOpen={reviewOpen}
          onClose={() => setReviewOpen(false)}
          freelancerId={u.id}
          jobId={applicant.job?.id ?? null}
          freelancerName={displayName}
          onSuccess={() => { setCanReview(false); setReviewOpen(false); }}
        />
      )}
    </>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────

const ApplicantsPage: React.FC = () => {
  const [applicants, setApplicants]               = useState<any[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<any[]>([]);
  const [jobDetails, setJobDetails]               = useState<any>(null);
  const [loading, setLoading]                     = useState(false);
  const [actionLoading, setActionLoading]         = useState(false);
  const [searchTerm, setSearchTerm]               = useState("");
  const [statusFilter, setStatusFilter]           = useState("all");

  const [detailApplicant, setDetailApplicant]     = useState<any>(null);
  const [messageApplicant, setMessageApplicant]   = useState<any>(null);
  const [sending, setSending]                     = useState(false);

  const { slug: jobSlug } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => { fetchJobData(); }, [jobSlug]);

  useEffect(() => {
    let filtered = applicants;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter((a) =>
        a.user?.name?.toLowerCase().includes(q) ||
        a.user?.first_name?.toLowerCase().includes(q) ||
        a.user?.skills?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status?.toLowerCase() === statusFilter);
    }
    setFilteredApplicants(filtered);
  }, [searchTerm, statusFilter, applicants]);

  const fetchJobData = async () => {
    setLoading(true);
    try {
      const response = await httpGetWithToken("employer/applications");
      console.log("Applicants response:", response.data);
      const list = response.data || [];
      setApplicants(list);
      setJobDetails(list[0]?.job || null);
    } catch {
      toast({ status: "error", title: "Failed to load applications.", isClosable: true, duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const approveApplicant = async (id: number) => {
    setActionLoading(true);
    try {
      await httpPostWithToken(`employer/applications/${id}/update-status`, { status: "approved" });
      setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a)));
      setDetailApplicant((prev: any) => prev?.id === id ? { ...prev, status: "approved" } : prev);
      toast({ status: "success", title: "Applicant approved!", isClosable: true, duration: 3000 });
    } catch {
      toast({ status: "error", title: "Failed to approve applicant.", isClosable: true, duration: 5000 });
    } finally {
      setActionLoading(false);
    }
  };

  const rejectApplicant = async (id: number) => {
    setActionLoading(true);
    try {
      await httpPostWithToken(`employer/applications/${id}/update-status`, { status: "rejected" });
      setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a)));
      setDetailApplicant((prev: any) => prev?.id === id ? { ...prev, status: "rejected" } : prev);
      toast({ status: "success", title: "Applicant rejected.", isClosable: true, duration: 3000 });
    } catch {
      toast({ status: "error", title: "Failed to reject applicant.", isClosable: true, duration: 5000 });
    } finally {
      setActionLoading(false);
    }
  };

  const sendMessage = async (applicant: any, text: string) => {
    if (!text.trim()) { toast({ status: "error", title: "Please enter a message" }); return; }
    setSending(true);
    try {
      const res = await httpPostWithToken("chat/send-chat", {
        receiver_id: applicant.user?.id,
        message: text,
      });
      const chatId = res?.data?.id ?? res?.data?.chat_id ?? null;
      toast({ status: "success", title: "Message sent!", isClosable: true, duration: 5000 });
      setMessageApplicant(null);
      if (chatId) navigate("/employers-messages", { state: { chatId } });
      else navigate("/employers-messages");
    } catch {
      toast({ status: "error", title: "Failed to send message.", isClosable: true, duration: 5000 });
    } finally {
      setSending(false);
    }
  };

  const stats = {
    total:    applicants.length,
    approved: applicants.filter((a) => a.status?.toLowerCase() === "approved").length,
    rejected: applicants.filter((a) => a.status?.toLowerCase() === "rejected").length,
    pending:  applicants.filter((a) =>
      a.status?.toLowerCase() !== "approved" && a.status?.toLowerCase() !== "rejected"
    ).length,
  };

  if (loading && applicants.length === 0) {
    return (
      <div className="lg:ml-64 p-6 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm">Loading applicants…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-64 p-6 bg-gray-50 min-h-screen py-[8rem]">
      {/* Header */}
      <header className="mb-8 border-b pb-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">All Applicants</h1>
        {jobDetails && (
          <p className="text-gray-400 text-sm">{jobDetails.title}</p>
        )}
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total",    value: stats.total,    color: "text-gray-800",   bg: "bg-white" },
          { label: "Pending",  value: stats.pending,  color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Approved", value: stats.approved, color: "text-green-700",  bg: "bg-green-50" },
          { label: "Rejected", value: stats.rejected, color: "text-red-600",    bg: "bg-red-50" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 text-center border border-gray-100 shadow-sm`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or skill…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-300 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm focus:ring-2 focus:ring-green-300 focus:outline-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="submitted">Pending</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <span className="text-sm text-gray-400 whitespace-nowrap">
          {filteredApplicants.length} applicant{filteredApplicants.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      {filteredApplicants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredApplicants.map((applicant) => (
            <ApplicantCard
              key={applicant.id}
              applicant={applicant}
              onViewDetails={setDetailApplicant}
              onMessage={setMessageApplicant}
              onApprove={approveApplicant}
              onReject={rejectApplicant}
              actionLoading={actionLoading}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No applicants found</p>
          <p className="text-gray-400 text-sm mt-1">
            {searchTerm || statusFilter !== "all" ? "Try adjusting your filters." : "No one has applied yet."}
          </p>
        </div>
      )}

      {/* Detail modal */}
      {detailApplicant && (
        <ApplicantDetailModal
          applicant={detailApplicant}
          onClose={() => setDetailApplicant(null)}
          onMessage={(a) => { setDetailApplicant(null); setMessageApplicant(a); }}
          onApprove={approveApplicant}
          onReject={rejectApplicant}
          actionLoading={actionLoading}
        />
      )}

      {/* Message modal */}
      {messageApplicant && (
        <MessageModal
          applicant={messageApplicant}
          onClose={() => setMessageApplicant(null)}
          onSend={sendMessage}
          sending={sending}
        />
      )}
    </div>
  );
};

export default ApplicantsPage;
