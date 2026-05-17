import React, { useState, useEffect } from 'react';
import { httpPostWithToken } from '../../../../utils/http_utils';
import { iProfileCompany } from '../../../../models/profle';
import { useToast } from '@chakra-ui/react';
import PaystackPayment from './PaystackPayment';
import { Info, AlertCircle } from 'lucide-react';

interface PaymentBreakdown {
  base_amount: number;
  freelancer_commission: number;
  freelancer_commission_vat: number;
  freelancer_receives: number;
  employer_fee: number;
  employer_fee_vat: number;
  employer_pays_total: number;
  platform_earnings: number;
  platform_vat: number;
  platform_total: number;
}

interface AddFundsModalProps {
  onClose: () => void;
  paymentDone: () => void;
  profile: iProfileCompany;
}

const AddFundsModal: React.FC<AddFundsModalProps> = ({ onClose, profile, paymentDone }) => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [tokenValidating, setTokenValidating] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [candidateToken, setCandidateToken] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [paymentReference, setPaymentReference] = useState("");
  const [breakdown, setBreakdown] = useState<PaymentBreakdown | null>(null);
  const [loadingBreakdown, setLoadingBreakdown] = useState(false);

  const [mode, setMode] = useState<"idle" | "choose" | "escrow" | "milestone">("idle");
  const [steps, setSteps] = useState<{ title: string; percent: number | "" }[]>([
    { title: "", percent: "" },
  ]);

  const [userId, setUserId] = useState("");
  const toast = useToast();

  // Fetch breakdown when amount changes
  useEffect(() => {
    if (amount >= 100 && tokenValid) {
      fetchBreakdown();
    } else {
      setBreakdown(null);
    }
  }, [amount, tokenValid]);

  const fetchBreakdown = async () => {
    setLoadingBreakdown(true);
    try {
      const response = await httpPostWithToken('employer/payment-breakdown', {
        amount: amount,
      });

      if (response?.status === 'success') {
        setBreakdown(response.data);
      }
    } catch (error) {
      console.error('Error fetching breakdown:', error);
    } finally {
      setLoadingBreakdown(false);
    }
  };

  // Validate candidate wallet token
  const validateToken = async () => {
    if (!candidateToken.trim()) {
      return toast({
        status: "error",
        title: "Please enter a token",
        isClosable: true,
      });
    }

    setTokenValidating(true);
    try {
      const response = await httpPostWithToken("employer/validate-token", {
        wallet_token: candidateToken,
      });

      if (response.status === "success") {
        setTokenValid(true);
        setCandidateName(response.candidate_name);
        setUserId(response.user_id.toString());
        toast({
          status: "success",
          title: `Token valid! Candidate: ${response.candidate_name}`,
          isClosable: true,
        });
      } else {
        setTokenValid(false);
        toast({
          status: "error",
          title: response.error || "Invalid token",
          isClosable: true,
        });
      }
    } catch (error) {
      setTokenValid(false);
      toast({
        status: "error",
        title: "Error validating token",
        isClosable: true,
      });
    } finally {
      setTokenValidating(false);
    }
  };

  // Handle escrow payment
  const handleEscrow = async () => {
    if (loading) return;

    if (!tokenValid) {
      return toast({
        status: "error",
        title: "Please validate token first",
        isClosable: true,
      });
    }

    if (amount < 100) {
      return toast({
        status: "error",
        title: "Amount must be NGN100 and above",
        isClosable: true,
        duration: 5000,
      });
    }

    setLoading(true);

    try {
      const response = await httpPostWithToken("employer/fund-wallet", {
        amount,
        type: "escrow",
        wallet_token: candidateToken,
        user_id: userId,
      });

      if (response.status === "success") {
        setPaymentId(response.data.payment_id);
        setPaymentReference(response.data.reference);
        setShowPayment(true);
      } else {
        toast({
          status: "error",
          title: response.error || response.message,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        title: "Error creating payment",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle milestone payment
  const handleMilestoneSubmit = async () => {
    const total = steps.reduce(
      (a, b) => a + (b.percent === "" ? 0 : b.percent),
      0
    );

    if (total !== 100) {
      return toast({
        status: "error",
        title: "Milestones must total exactly 100%",
        isClosable: true,
      });
    }

    if (!tokenValid) {
      return toast({
        status: "error",
        title: "Please validate token first",
        isClosable: true,
      });
    }

    if (amount < 100) {
      return toast({
        status: "error",
        title: "Amount must be NGN100 and above",
        isClosable: true,
      });
    }

    setLoading(true);

    try {
      const response = await httpPostWithToken("employer/create-milestones", {
        amount,
        user_id: userId,
        steps,
        wallet_token: candidateToken,
      });

      if (response.status === "success") {
        setPaymentId(response.data.payment_id);
        setPaymentReference(response.data.reference);
        setShowPayment(true);
      } else {
        toast({
          status: "error",
          title: response.error || response.message,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        status: "error",
        title: "Error creating milestones",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {showPayment && paymentId ? (
          <>
            <PaystackPayment
              amount={breakdown?.employer_pays_total || amount} 
              email={profile?.email || ""}
              reference={paymentReference}
              paymentId={paymentId}
              onSuccess={() => {
                setShowPayment(false);
                setPaymentId(null);
                paymentDone();
              }}
              onClose={() => {
                setShowPayment(false);
                setPaymentId(null);
              }}
            />

            <button
              onClick={onClose}
              className="text-gray-600 font-semibold py-2 px-4 rounded w-full mt-3 border"
            >
              Close Modal
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Add Funds to Candidate</h2>

            {/* Token Validation Section */}
            {mode === "idle" && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Step 1: Validate Candidate Token</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Enter the wallet token provided by the candidate to verify their identity.
                </p>

                <input
                  type="text"
                  value={candidateToken}
                  onChange={(e) => {
                    setCandidateToken(e.target.value);
                    setTokenValid(null);
                  }}
                  placeholder="Enter candidate wallet token (e.g., WT_...)"
                  className="w-full border rounded-lg p-2 mb-2 text-sm"
                />

                <button
                  onClick={validateToken}
                  disabled={tokenValidating}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded mb-3"
                >
                  {tokenValidating ? "Validating..." : "Validate Token"}
                </button>

                {tokenValid === true && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded mb-3">
                    <p className="text-sm text-green-800">
                      ✓ Token valid! Candidate: <strong>{candidateName}</strong>
                    </p>
                  </div>
                )}

                {tokenValid === false && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded mb-3">
                    <p className="text-sm text-red-800">
                      ✗ Invalid token. Please check and try again.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Amount Input */}
            {tokenValid && mode === "idle" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Amount (NGN)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  placeholder="Enter amount"
                  className="w-full border rounded-lg p-2 mb-2"
                />

                {/* Fee Breakdown */}
                {loadingBreakdown && (
                  <div className="text-center py-3 text-sm text-gray-500">
                    Calculating fees...
                  </div>
                )}

                {breakdown && !loadingBreakdown && (
  <div className="space-y-3 mt-4">
    {/* Employer Payment Summary */}
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Payment Summary
        </span>
      </div>
      <div className="px-4 py-3 space-y-2 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Job Amount</span>
          <span className="font-medium">₦{breakdown.base_amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Workason Service Fee (5%)</span>
          <span className="font-medium">₦{breakdown.employer_fee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>VAT (7.5%)</span>
          <span className="font-medium">₦{breakdown.employer_fee_vat.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-300">
          <span>Total Payment</span>
          <span className="text-blue-600">₦{breakdown.employer_pays_total.toLocaleString()}</span>
        </div>
      </div>
    </div>

    {/* Escrow assurance message */}
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-900">
          Your payment will be securely held in escrow until the freelancer delivers the work.
        </p>
      </div>
    </div>
  </div>
)}

                {amount >= 100 && breakdown && (
                  <button
                    onClick={() => setMode("choose")}
                    className="bg-[#2AA100] text-white py-2 px-4 rounded w-full mt-4"
                  >
                    Next: Choose Payment Type
                  </button>
                )}
              </div>
            )}

            {/* Payment Type Selection */}
            {mode === "choose" && (
              <div className="space-y-4">
                <div
                  onClick={() => setMode("escrow")}
                  className="cursor-pointer border rounded-lg p-4 flex items-start gap-3 hover:border-[#2AA100] hover:bg-green-50 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2AA100] text-white flex items-center justify-center font-bold">
                    ₦
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Escrow Payment</h3>
                    <p className="text-sm text-gray-500">
                      Fund the candidate wallet with a single lump-sum payment.
                    </p>
                  </div>
                  <span className="text-[#2AA100] font-medium text-sm">Select</span>
                </div>

                <div
                  onClick={() => setMode("milestone")}
                  className="cursor-pointer border rounded-lg p-4 flex items-start gap-3 hover:border-blue-600 hover:bg-blue-50 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    %
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Milestone Payment</h3>
                    <p className="text-sm text-gray-500">
                      Split payment into stages and release funds gradually.
                    </p>
                  </div>
                  <span className="text-blue-600 font-medium text-sm">Select</span>
                </div>

                <button
                  onClick={() => setMode("idle")}
                  className="w-full text-gray-600 py-2 px-4 rounded border"
                >
                  Back
                </button>
              </div>
            )}

            {/* Escrow Confirmation */}
            {mode === "escrow" && breakdown && (
  <div className="space-y-4">
    <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Payment Summary
        </span>
      </div>
      <div className="px-4 py-3 space-y-2 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Job Amount</span>
          <span className="font-medium">₦{breakdown.base_amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Workason Service Fee (5%)</span>
          <span className="font-medium">₦{breakdown.employer_fee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>VAT (7.5%)</span>
          <span className="font-medium">₦{breakdown.employer_fee_vat.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-300">
          <span>Total Payment</span>
          <span className="text-blue-600">₦{breakdown.employer_pays_total.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <p className="text-xs text-gray-500 text-center">
      To: <strong>{candidateName}</strong>
    </p>

    <button
      onClick={handleEscrow}
      disabled={loading}
      className="bg-[#2AA100] hover:bg-[#25920a] disabled:bg-gray-400 text-white py-3 px-4 rounded w-full font-semibold"
    >
      {loading ? "Processing..." : `Pay ₦${breakdown.employer_pays_total.toLocaleString()}`}
    </button>

    <button
      onClick={() => setMode("choose")}
      className="w-full text-gray-600 py-2 px-4 rounded border"
    >
      Back
    </button>
  </div>
)}

            {/* Milestone Breakdown */}
            {mode === "milestone" && (
              <div className="space-y-4">
                <div className="bg-gray-50 border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">Milestone Breakdown</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Define each phase and how much (%) of the total payment it gets.
                  </p>

                  {steps.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 mb-2 bg-white border rounded-lg p-2"
                    >
                      <span className="text-xs font-semibold text-gray-400 w-6">
                        {i + 1}.
                      </span>

                      <input
                        placeholder="Milestone title"
                        value={s.title}
                        onChange={(e) => {
                          const copy = [...steps];
                          copy[i].title = e.target.value;
                          setSteps(copy);
                        }}
                        className="flex-1 border-0 focus:ring-0 outline-none text-sm px-2"
                      />

                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          placeholder="0"
                          min="0"
                          max="100"
                          value={s.percent}
                          onChange={(e) => {
                            const copy = [...steps];
                            const val = e.target.value;
                            copy[i].percent = val === "" ? "" : Number(val);
                            setSteps(copy);
                          }}
                          className="w-16 text-right border rounded p-1 text-sm"
                        />
                        <span className="text-xs text-gray-400">%</span>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setSteps([...steps, { title: "", percent: "" }])}
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    + Add another milestone
                  </button>
                </div>

                {breakdown && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    <div className="flex justify-between font-semibold">
                      <span>Total You'll Pay:</span>
                      <span className="text-blue-600">₦{breakdown.employer_pays_total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Candidate Will Get:</span>
                      <span className="text-green-600">₦{breakdown.freelancer_receives.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleMilestoneSubmit}
                  disabled={loading}
                  className="bg-[#2AA100] hover:bg-[#25920a] disabled:bg-gray-400 text-white py-3 px-4 rounded w-full font-semibold"
                >
                  {loading ? "Processing..." : breakdown ? `Pay ₦${breakdown.employer_pays_total.toLocaleString()}` : 'Continue to Payment'}
                </button>

                <button
                  onClick={() => setMode("choose")}
                  className="w-full text-gray-600 py-2 px-4 rounded border"
                >
                  Back
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full text-gray-600 py-2 px-4 rounded border mt-4"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddFundsModal;