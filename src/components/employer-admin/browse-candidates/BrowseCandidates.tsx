import React, { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { httpGetWithToken, httpPostWithToken } from "../../../utils/http_utils";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ls from "localstorage-slim";
import {
  Star,
  MapPin,
  Briefcase,
  DollarSign,
  MessageSquare,
  Lock,
  ShieldCheck,
  Clock,
} from "lucide-react";

// ── Modal ──────────────────────────────────────────────────────────────────

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-800 text-xl"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

// ── Talent Vault Plans ─────────────────────────────────────────────────────

const VAULT_PLANS = [
  { days: 3,  gbp: 9,  naira: 18000, label: "3-Day Access",  kobo: 18000 * 100 },
  { days: 7,  gbp: 15, naira: 30000, label: "7-Day Access",  kobo: 30000 * 100 },
  { days: 14, gbp: 25, naira: 50000, label: "14-Day Access", kobo: 50000 * 100 },
];

// ── Component ──────────────────────────────────────────────────────────────

const BrowseCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [hasPaid, setHasPaid] = useState(false);
  const [isSmartStart, setIsSmartStart] = useState<boolean | null>(null); // null = checking
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<any>(null);
  const [messageText, setMessageText] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY!;
  const BASE_URL = "https://api.workason.site";

  // Resolve email the same way Smartstart does
  const userEmail: string = (() => {
    const plain = localStorage.getItem("email");
    if (plain) return plain;
    const u = ls.get("wwph_usr", { decrypt: true }) as any;
    return u?.email || "";
  })();

  // Stable refs — one per plan
  const [payRefs] = useState(() =>
    VAULT_PLANS.map((p) => `talentvault_${p.days}d_${Date.now() + p.days}`)
  );

  const initPay3  = usePaystackPayment({ reference: payRefs[0], email: userEmail, amount: VAULT_PLANS[0].kobo, publicKey, currency: "NGN" });
  const initPay7  = usePaystackPayment({ reference: payRefs[1], email: userEmail, amount: VAULT_PLANS[1].kobo, publicKey, currency: "NGN" });
  const initPay14 = usePaystackPayment({ reference: payRefs[2], email: userEmail, amount: VAULT_PLANS[2].kobo, publicKey, currency: "NGN" });
  const payInitFns = [initPay3, initPay7, initPay14];

  // ── Data ────────────────────────────────────────────────────────────────

  const fetchCandidates = async () => {
    try {
      const res = await httpGetWithToken("employer/browse-candidates");
      const payload = res?.data ?? res;

      if (!payload || res?.error) {
        toast({ status: "error", title: "Failed to fetch candidates" });
        setLoading(false);
        return;
      }

      // Backend signals this page is SmartStart-only
      if (payload.smartstart_required) {
        setIsSmartStart(false);
      } else if (payload.payment_required) {
        setIsSmartStart(true);
        setHasPaid(false);
        setCandidates([]);
      } else {
        setIsSmartStart(true);
        setCandidates(Array.isArray(payload) ? payload : payload.data ?? []);
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

  // ── Payment ─────────────────────────────────────────────────────────────

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

  // ── Messaging ────────────────────────────────────────────────────────────

  const handleOpenModal = (candidate: any) => {
    setSelectedApplicantId(candidate);
    setMessageText("");
    setModalVisible(true);
  };

  const messageApplicant = async (candidate: any) => {
    if (!messageText.trim()) {
      toast({ status: "error", title: "Please enter a message" });
      return;
    }
    setSending(true);
    try {
      const res = await httpPostWithToken("chat/send-chat", {
        receiver_id: candidate.id,
        message: messageText,
      });
      const chatId = res?.data?.id ?? res?.data?.chat_id ?? null;
      toast({ status: "success", title: `Message sent to ${candidate?.first_name || "candidate"}!`, isClosable: true, duration: 5000 });
      setMessageText("");
      setModalVisible(false);
      if (chatId) navigate("/employers-messages", { state: { chatId } });
      else navigate("/employers-messages");
    } catch {
      toast({ status: "error", title: "Failed to send message.", isClosable: true, duration: 5000 });
    } finally {
      setSending(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  if (loading) return <div className="p-6">Loading...</div>;

  // Not a SmartStart user → hard block
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
      <header className="mb-8 border-b pb-4">
        <div className="flex items-center gap-3 mb-1">
          <ShieldCheck className="w-6 h-6 text-green-700" />
          <h1 className="text-2xl font-bold text-gray-800">Talent Vault</h1>
          <span className="bg-green-700 text-green-50 text-xs font-semibold px-3 py-1 rounded-full">
            SmartStart™ Exclusive
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          Access verified freelancers hand-picked from our talent pool.
        </p>
      </header>

      {/* ── Talent Vault Pricing Wall ── */}
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
                <p className="text-xs text-gray-400 mb-6">
                  ≈ ₦{plan.naira.toLocaleString()}
                </p>
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
        /* ── Candidate Grid ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {Array.isArray(candidates) && candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-all border border-gray-100 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={candidate.avatar || "/default-avatar.png"}
                    alt={candidate.first_name || "Candidate"}
                    className="w-14 h-14 rounded-full object-cover border mr-4"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800 text-lg">
                      {candidate.first_name || candidate.name || "Unnamed"}
                    </h2>
                    <p className="text-sm text-gray-500">{candidate.experience || "Candidate"}</p>
                  </div>
                </div>

                <div className="flex items-center text-yellow-500 text-sm mb-3">
                  <Star size={16} className="fill-yellow-400 mr-1" />
                  <span>{candidate.rating || "4.8"}</span>
                  <span className="text-gray-500 ml-1">({candidate.review_count || "23"} reviews)</span>
                </div>

                <div className="text-sm text-gray-600 space-y-1 mb-3">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} /> {candidate.city || "Unknown"}, {candidate.country || ""}
                  </p>
                  <p className="flex items-center gap-2">
                    <DollarSign size={14} />{" "}
                    {candidate.expected_salary ? `₦${candidate.expected_salary}/hr` : "Rate not set"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase size={14} /> {candidate.completed_jobs || 0} Jobs Completed
                  </p>
                </div>

                {candidate.skills && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills.split(",").slice(0, 5).map((skill: string, i: number) => (
                      <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {candidate.bio && (
                  <p
                    className="text-sm text-gray-500 mb-4"
                    style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  >
                    {candidate.bio}
                  </p>
                )}

                <div className="flex justify-between items-center mt-auto pt-4">
                  <button
                    onClick={() =>
                      navigate(`/candidate-profile/${candidate.id}`, {
                        state: {
                          applicant: {
                            cv: candidate.cv ? `${BASE_URL}/${candidate.cv}` : null,
                            smartcv: candidate.smartcv ? `${BASE_URL}/${candidate.smartcv}` : null,
                            experience_years: candidate.experience || null,
                            user: { name: candidate.name, email: candidate.email, bio: candidate.bio },
                          },
                        },
                      })
                    }
                    className="text-green-600 text-sm hover:underline"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleOpenModal(candidate)}
                    className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 transition"
                  >
                    <MessageSquare size={14} className="mr-1" /> Message
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-3 text-center">No candidates found.</p>
          )}
        </div>
      )}

      {/* Message Modal */}
      <Modal
        isOpen={modalVisible}
        onClose={() => { setModalVisible(false); setMessageText(""); }}
        title={`Send Message to ${selectedApplicantId?.first_name || "Candidate"}`}
      >
        <div className="relative">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-green-100 resize-none"
            rows={4}
            placeholder="Type your message here..."
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => { setModalVisible(false); setMessageText(""); }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => selectedApplicantId && messageApplicant(selectedApplicantId)}
              disabled={sending || !messageText.trim()}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BrowseCandidates;
