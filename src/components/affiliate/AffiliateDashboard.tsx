import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import {
  Copy,
  Share2,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
  BarChart2,
  FileText,
  CreditCard,
  User,
  Home,
  Link2,
  ChevronRight,
  Network,
  HandCoins,
} from 'lucide-react';
import affiliateService, {
  AffiliateProfile,
  AffiliateDashboardStats,
  AffiliateReferral,
  AffiliateCommission,
  AffiliateRegistrationData,
} from '../../services/affiliateService';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab =
  | 'overview'
  | 'referral-link'
  | 'referrals'
  | 'commissions'
  | 'payments'
  | 'profile'
  | 'terms';

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  pink?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, pink }) => (
  <div className="bg-white border border-gray-200 rounded-[5px] p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-sans font-medium text-gray-500 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-xl font-bold font-sans text-gray-900">{value}</p>
      </div>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          pink ? 'bg-[#EE009D]/10' : 'bg-[#2AA100]/10'
        }`}
      >
        <Icon
          className={`w-5 h-5 ${pink ? 'text-[#EE009D]' : 'text-[#2AA100]'}`}
        />
      </div>
    </div>
  </div>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  Clicked: 'bg-blue-50 text-blue-700',
  Registered: 'bg-purple-50 text-purple-700',
  Pending: 'bg-yellow-50 text-yellow-700',
  Converted: 'bg-green-50 text-[#2AA100]',
  Rejected: 'bg-red-50 text-red-600',
  Cancelled: 'bg-gray-100 text-gray-600',
  Approved: 'bg-green-50 text-[#2AA100]',
  Paid: 'bg-green-100 text-[#2AA100]',
};

const StatusBadge: React.FC<{ status?: string }> = ({ status = 'Pending' }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-sans ${
      statusColors[status] ?? 'bg-gray-100 text-gray-600'
    }`}
  >
    {status}
  </span>
);

// ─── Registration Form ────────────────────────────────────────────────────────

const AffiliateRegistrationForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<AffiliateRegistrationData>({
    how_you_heard: '',
    promotion_method: '',
    network_description: '',
    agree_to_terms: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof AffiliateRegistrationData, string>>
  >({});

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.promotion_method?.trim())
      e.promotion_method = 'Please describe how you plan to promote Workason.';
    if (!form.agree_to_terms)
      e.agree_to_terms = 'You must agree to the affiliate terms to continue.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const resp = await affiliateService.register(form);
    setLoading(false);
    if (resp?.status === 'success' || resp?.data) {
      toast({
        status: 'success',
        title: 'Welcome to the Affiliate Programme!',
        description: 'Your affiliate account has been created.',
        isClosable: true,
        duration: 5000,
      });
      onSuccess();
    } else {
      toast({
        status: 'error',
        title: 'Registration failed',
        description:
          resp?.error || resp?.message || 'Something went wrong. Please try again.',
        isClosable: true,
        duration: 6000,
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#EE009D]/10 flex items-center justify-center mx-auto mb-4">
          <Network className="w-8 h-8 text-[#EE009D]" />
        </div>
        <h2 className="text-2xl font-bold font-sans text-gray-900 mb-2">
          Join the Affiliate Programme
        </h2>
        <p className="text-gray-600 font-sans text-sm leading-relaxed">
          Complete the form below to become a Workason Affiliate and start earning commissions
          from your referrals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* How did you hear */}
        <div>
          <label className="block text-sm font-semibold font-sans text-gray-800 mb-1.5">
            How did you hear about the Affiliate Programme?{' '}
            <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <select
            className="w-full border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm font-sans text-gray-800 focus:outline-none focus:border-[#2AA100] focus:ring-1 focus:ring-[#2AA100]"
            value={form.how_you_heard}
            onChange={(e) => setForm((f) => ({ ...f, how_you_heard: e.target.value }))}
          >
            <option value="">Select an option</option>
            <option value="social_media">Social Media</option>
            <option value="friend_colleague">Friend or Colleague</option>
            <option value="email">Email</option>
            <option value="website">Workason Website</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Promotion method */}
        <div>
          <label className="block text-sm font-semibold font-sans text-gray-800 mb-1.5">
            How do you plan to promote Workason? <span className="text-[#EE009D]">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Through my LinkedIn network, business WhatsApp groups, email newsletter..."
            className={`w-full border rounded-[5px] px-4 py-2.5 text-sm font-sans text-gray-800 focus:outline-none focus:border-[#2AA100] focus:ring-1 focus:ring-[#2AA100] resize-none ${
              errors.promotion_method ? 'border-red-400' : 'border-gray-200'
            }`}
            value={form.promotion_method}
            onChange={(e) =>
              setForm((f) => ({ ...f, promotion_method: e.target.value }))
            }
          />
          {errors.promotion_method && (
            <p className="mt-1 text-xs text-red-500 font-sans">{errors.promotion_method}</p>
          )}
        </div>

        {/* Network description */}
        <div>
          <label className="block text-sm font-semibold font-sans text-gray-800 mb-1.5">
            Describe your network{' '}
            <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="e.g. 500+ LinkedIn connections, business owners in Lagos, freelancers community..."
            className="w-full border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm font-sans text-gray-800 focus:outline-none focus:border-[#2AA100] focus:ring-1 focus:ring-[#2AA100] resize-none"
            value={form.network_description}
            onChange={(e) =>
              setForm((f) => ({ ...f, network_description: e.target.value }))
            }
          />
        </div>

        {/* Terms agreement */}
        <div
          className={`rounded-[5px] p-4 border ${
            errors.agree_to_terms
              ? 'border-red-300 bg-red-50'
              : 'border-gray-200 bg-[#f5f5f5]'
          }`}
        >
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-[#2AA100]"
              checked={form.agree_to_terms}
              onChange={(e) =>
                setForm((f) => ({ ...f, agree_to_terms: e.target.checked }))
              }
            />
            <span className="text-sm font-sans text-gray-700 leading-relaxed">
              I agree to the{' '}
              <span className="text-[#2AA100] font-semibold">
                Workason Affiliate Terms & Conditions
              </span>
              . I understand that commission eligibility is subject to qualifying criteria set
              by Workason.
            </span>
          </label>
          {errors.agree_to_terms && (
            <p className="mt-2 text-xs text-red-500 font-sans">{errors.agree_to_terms}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full font-sans text-[14px] font-medium text-white bg-[#EE009D] hover:bg-[#2AA100] disabled:opacity-60 disabled:cursor-not-allowed py-3 px-6 rounded-[5px] transition-colors duration-200 ease-in flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Registering...
            </>
          ) : (
            <>
              JOIN THE AFFILIATE PROGRAMME
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

// ─── Referral Link Card ───────────────────────────────────────────────────────

const ReferralLinkCard: React.FC<{
  affiliateId?: string;
  referralLink?: string;
}> = ({ affiliateId, referralLink }) => {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      const el = document.createElement('textarea');
      el.value = referralLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    toast({
      status: 'success',
      title: 'Link copied!',
      description: 'Your referral link has been copied to clipboard.',
      duration: 2500,
      isClosable: true,
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShare = async () => {
    if (!referralLink) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Workason via my referral link',
          text: 'I use Workason for professional services. Use my link to get started!',
          url: referralLink,
        });
      } catch { /* user cancelled */ }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-[5px] p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-[#EE009D]/10 flex items-center justify-center">
          <Link2 className="w-5 h-5 text-[#EE009D]" />
        </div>
        <div>
          <h3 className="text-base font-bold font-sans text-gray-900">My Referral Link</h3>
          <p className="text-xs font-sans text-gray-500">
            Share this link to start earning commissions
          </p>
        </div>
      </div>

      {/* Affiliate ID */}
      <div className="mb-4">
        <p className="text-xs font-semibold font-sans text-gray-500 uppercase tracking-wide mb-1">
          Affiliate ID
        </p>
        <div className="flex items-center gap-2 bg-[#f5f5f5] rounded-[5px] px-4 py-2.5 border border-gray-200">
          <span className="text-sm font-bold font-sans text-[#2AA100] tracking-wider">
            {affiliateId || '—'}
          </span>
        </div>
      </div>

      {/* Referral URL */}
      <div className="mb-5">
        <p className="text-xs font-semibold font-sans text-gray-500 uppercase tracking-wide mb-1">
          Referral Link
        </p>
        <div className="flex items-center gap-2 bg-[#f5f5f5] rounded-[5px] px-4 py-2.5 border border-gray-200 overflow-hidden">
          <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm font-sans text-gray-700 truncate flex-1">
            {referralLink || 'Loading your referral link...'}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          disabled={!referralLink}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-[5px] font-sans font-medium text-sm transition-colors duration-200 ease-in ${
            copied
              ? 'bg-[#2AA100] text-white'
              : 'bg-[#2AA100]/10 text-[#2AA100] hover:bg-[#2AA100] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'COPY LINK'}
        </button>
        <button
          onClick={handleShare}
          disabled={!referralLink}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-[5px] font-sans font-medium text-sm bg-[#EE009D]/10 text-[#EE009D] hover:bg-[#EE009D] hover:text-white transition-colors duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share2 className="w-4 h-4" />
          SHARE
        </button>
      </div>
    </div>
  );
};

// ─── Referrals Table ──────────────────────────────────────────────────────────

const ReferralsTable: React.FC<{
  referrals: AffiliateReferral[];
  loading: boolean;
  error?: string;
}> = ({ referrals, loading, error }) => {
  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <span className="inline-block w-8 h-8 border-4 border-[#2AA100]/20 border-t-[#2AA100] rounded-full animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <AlertCircle className="w-10 h-10 text-red-400 mb-3" />
        <p className="text-sm font-sans text-gray-600">{error}</p>
      </div>
    );
  if (!referrals.length)
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <Users className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-base font-semibold font-sans text-gray-800 mb-1">
          No referrals yet
        </h3>
        <p className="text-sm font-sans text-gray-500 max-w-xs">
          Share your referral link to start tracking your referrals here.
        </p>
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-[5px] border border-gray-200">
      <table className="w-full text-sm font-sans">
        <thead>
          <tr className="bg-[#f5f5f5] border-b border-gray-200">
            {[
              'Referral ID',
              'Date',
              'Customer',
              'Status',
              'Conversion',
              'Commission',
              'Comm. Status',
            ].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {referrals.map((row, i) => (
            <tr
              key={row.id ?? i}
              className="border-b border-gray-100 hover:bg-[#f5f5f5] transition-colors"
            >
              <td className="px-4 py-3 font-mono text-xs text-[#2AA100]">
                {row.referral_id ?? '—'}
              </td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {row.date ?? '—'}
              </td>
              <td className="px-4 py-3 text-gray-800 font-medium">{row.customer ?? '—'}</td>
              <td className="px-4 py-3">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={row.conversion_status} />
              </td>
              <td className="px-4 py-3 text-gray-800 font-medium">
                {row.commission ?? '—'}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={row.commission_status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── Commissions Table ────────────────────────────────────────────────────────

const CommissionsTable: React.FC<{
  commissions: AffiliateCommission[];
  loading: boolean;
  error?: string;
}> = ({ commissions, loading, error }) => {
  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <span className="inline-block w-8 h-8 border-4 border-[#2AA100]/20 border-t-[#2AA100] rounded-full animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <AlertCircle className="w-10 h-10 text-red-400 mb-3" />
        <p className="text-sm font-sans text-gray-600">{error}</p>
      </div>
    );
  if (!commissions.length)
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <DollarSign className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-base font-semibold font-sans text-gray-800 mb-1">
          No records yet
        </h3>
        <p className="text-sm font-sans text-gray-500 max-w-xs">
          Commissions are recorded when your referrals convert to customers.
        </p>
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-[5px] border border-gray-200">
      <table className="w-full text-sm font-sans">
        <thead>
          <tr className="bg-[#f5f5f5] border-b border-gray-200">
            {['Date', 'Referral', 'Amount', 'Status', 'Payment Date'].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {commissions.map((row, i) => (
            <tr
              key={row.id ?? i}
              className="border-b border-gray-100 hover:bg-[#f5f5f5] transition-colors"
            >
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.date ?? '—'}</td>
              <td className="px-4 py-3 font-mono text-xs text-[#2AA100]">
                {row.referral ?? '—'}
              </td>
              <td className="px-4 py-3 text-gray-900 font-bold">{row.amount ?? '—'}</td>
              <td className="px-4 py-3">
                <StatusBadge status={row.status} />
              </td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {row.payment_date ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── Terms Content ────────────────────────────────────────────────────────────

const TermsContent: React.FC<{
  content: string | null;
  loading: boolean;
  error?: string;
}> = ({ content, loading, error }) => {
  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <span className="inline-block w-8 h-8 border-4 border-[#2AA100]/20 border-t-[#2AA100] rounded-full animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <AlertCircle className="w-10 h-10 text-red-400 mb-3" />
        <p className="text-sm font-sans text-gray-600">{error}</p>
      </div>
    );
  if (!content)
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <FileText className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-sm font-sans text-gray-500">
          Terms & Conditions content is not available at this time.
        </p>
      </div>
    );
  return (
    <div
      className="prose prose-sm max-w-none font-sans text-gray-700 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

// ─── Tab Config ───────────────────────────────────────────────────────────────

interface TabItem {
  id: Tab;
  label: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'referral-link', label: 'My Referral Link', icon: Link2 },
  { id: 'referrals', label: 'Referrals', icon: Users },
  { id: 'commissions', label: 'Commissions', icon: DollarSign },
  { id: 'payments', label: 'Payment History', icon: CreditCard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'terms', label: 'Terms & Conditions', icon: FileText },
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const AffiliateDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [profile, setProfile] = useState<AffiliateProfile | null>(null);

  const [stats, setStats] = useState<AffiliateDashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  const [referrals, setReferrals] = useState<AffiliateReferral[]>([]);
  const [referralsLoading, setReferralsLoading] = useState(false);
  const [referralsError, setReferralsError] = useState<string | null>(null);

  const [commissions, setCommissions] = useState<AffiliateCommission[]>([]);
  const [commissionsLoading, setCommissionsLoading] = useState(false);
  const [commissionsError, setCommissionsError] = useState<string | null>(null);

  const [payments, setPayments] = useState<AffiliateCommission[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [paymentsError, setPaymentsError] = useState<string | null>(null);

  const [termsContent, setTermsContent] = useState<string | null>(null);
  const [termsLoading, setTermsLoading] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Check affiliate status on mount
  useEffect(() => {
    const loadProfile = async () => {
      setProfileLoading(true);
      const resp = await affiliateService.getProfile();
      setProfileLoading(false);
      if (resp?.error) {
        const isNotFound =
          resp.status === 404 ||
          resp.error?.toLowerCase().includes('not found') ||
          resp.error?.toLowerCase().includes('no affiliate');
        if (isNotFound) {
          setIsAffiliate(false);
        } else {
          setProfileError(resp.error);
        }
      } else if (resp?.data || resp?.affiliate_id || resp?.id) {
        setIsAffiliate(true);
        setProfile(resp.data ?? resp);
      } else {
        setIsAffiliate(false);
      }
    };
    loadProfile();
  }, []);

  // Load dashboard stats once affiliate is confirmed
  useEffect(() => {
    if (!isAffiliate) return;
    const loadStats = async () => {
      setStatsLoading(true);
      const resp = await affiliateService.getDashboard();
      setStatsLoading(false);
      if (!resp?.error) setStats(resp?.data ?? resp);
    };
    loadStats();
  }, [isAffiliate]);

  // Lazy-load tab data
  const loadReferrals = useCallback(async () => {
    if (referrals.length || referralsLoading) return;
    setReferralsLoading(true);
    const resp = await affiliateService.getReferrals();
    setReferralsLoading(false);
    if (resp?.error) setReferralsError(resp.error);
    else setReferrals(resp?.data ?? resp ?? []);
  }, [referrals.length, referralsLoading]);

  const loadCommissions = useCallback(async () => {
    if (commissions.length || commissionsLoading) return;
    setCommissionsLoading(true);
    const resp = await affiliateService.getCommissions();
    setCommissionsLoading(false);
    if (resp?.error) setCommissionsError(resp.error);
    else setCommissions(resp?.data ?? resp ?? []);
  }, [commissions.length, commissionsLoading]);

  const loadPayments = useCallback(async () => {
    if (payments.length || paymentsLoading) return;
    setPaymentsLoading(true);
    const resp = await affiliateService.getPaymentHistory();
    setPaymentsLoading(false);
    if (resp?.error) setPaymentsError(resp.error);
    else setPayments(resp?.data ?? resp ?? []);
  }, [payments.length, paymentsLoading]);

  const loadTerms = useCallback(async () => {
    if (termsContent || termsLoading) return;
    setTermsLoading(true);
    const resp = await affiliateService.getTerms();
    setTermsLoading(false);
    if (resp?.error) setTermsError(resp.error);
    else setTermsContent(resp?.data?.content ?? resp?.content ?? null);
  }, [termsContent, termsLoading]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'referrals') loadReferrals();
    if (tab === 'commissions') loadCommissions();
    if (tab === 'payments') loadPayments();
    if (tab === 'terms') loadTerms();
  };

  const handleRegistrationSuccess = () => {
    setIsAffiliate(true);
    setProfileLoading(true);
    affiliateService.getProfile().then((resp) => {
      setProfileLoading(false);
      if (resp?.data || resp?.id) setProfile(resp.data ?? resp);
    });
  };

  // ── Loading ──
  if (profileLoading) {
    return (
      <div className="mt-20 lg:ml-64 min-h-screen bg-[#FFF5F8] flex items-center justify-center">
        <div className="text-center">
          <span className="inline-block w-10 h-10 border-4 border-[#2AA100]/20 border-t-[#2AA100] rounded-full animate-spin mb-4" />
          <p className="text-sm font-sans text-gray-500">Loading your affiliate profile...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (profileError) {
    return (
      <div className="mt-20 lg:ml-64 min-h-screen bg-[#FFF5F8] flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-lg font-bold font-sans text-gray-900 mb-2">
            Unable to load affiliate data
          </h2>
          <p className="text-sm font-sans text-gray-500 mb-5">{profileError}</p>
          <button
            onClick={() => window.location.reload()}
            className="font-sans text-[14px] font-medium text-white bg-[#2AA100] hover:bg-[#EE009D] py-2.5 px-6 rounded-[5px] transition-colors duration-200 ease-in"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Not yet an affiliate — show registration ──
  if (!isAffiliate) {
    return (
      <div className="mt-20 lg:ml-64 min-h-screen bg-[#FFF5F8]">
        <div className="max-w-2xl mx-auto py-10 px-4">
          {/* Info banner */}
          <div className="bg-[#f5f5f5] border border-gray-200 rounded-[5px] p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold font-sans text-gray-900 mb-1">
                Affiliate Programme
              </h1>
              <p className="text-sm font-sans text-gray-600">
                Turn your network into income. Earn commissions for qualifying referrals.
              </p>
            </div>
            <button
              onClick={() => navigate('/affiliate')}
              className="flex-shrink-0 font-sans text-xs font-semibold text-[#2AA100] border border-[#2AA100] px-4 py-2 rounded-[5px] hover:bg-[#2AA100] hover:text-white transition-colors duration-200 ease-in flex items-center gap-1.5"
            >
              Learn more <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-[5px] p-8">
            <AffiliateRegistrationForm onSuccess={handleRegistrationSuccess} />
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  const displayStats = stats ?? {
    affiliate_id: profile?.affiliate_id,
    total_referrals: profile?.total_referrals,
    converted_customers: profile?.converted_customers,
    commission_earned: profile?.commission_earned,
    commission_paid: profile?.commission_paid,
    pending_commission: profile?.pending_commission,
    referral_link: profile?.referral_link,
  };

  return (
    <div className="mt-20 lg:ml-64 min-h-screen bg-[#FFF5F8]">
      <div className="max-w-6xl mx-auto py-8 px-4">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-sans text-gray-900">
            Affiliate Programme
          </h1>
          <p className="text-sm font-sans text-gray-500 mt-1">
            Affiliate ID:{' '}
            <span className="font-bold text-[#2AA100]">
              {displayStats.affiliate_id ?? profile?.affiliate_id ?? '—'}
            </span>
          </p>
        </div>

        {/* Stats grid */}
        {statsLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-[5px] h-24 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <StatCard
              label="Total Referrals"
              value={displayStats.total_referrals ?? '—'}
              icon={Users}
            />
            <StatCard
              label="Converted"
              value={displayStats.converted_customers ?? '—'}
              icon={CheckCircle}
            />
            <StatCard
              label="Commission Earned"
              value={displayStats.commission_earned ?? '—'}
              icon={TrendingUp}
              pink
            />
            <StatCard
              label="Commission Paid"
              value={displayStats.commission_paid ?? '—'}
              icon={HandCoins}
            />
            <StatCard
              label="Pending"
              value={displayStats.pending_commission ?? '—'}
              icon={Clock}
              pink
            />
            <StatCard
              label="Affiliate ID"
              value={displayStats.affiliate_id ?? '—'}
              icon={BarChart2}
            />
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-[5px] overflow-hidden">
          {/* Tab bar */}
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex min-w-max">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-5 py-4 text-sm font-sans font-semibold border-b-2 whitespace-nowrap transition-colors duration-150 ${
                    activeTab === tab.id
                      ? 'border-[#EE009D] text-[#EE009D]'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab content */}
          <div className="p-6">

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ReferralLinkCard
                    affiliateId={displayStats.affiliate_id ?? profile?.affiliate_id}
                    referralLink={displayStats.referral_link ?? profile?.referral_link}
                  />

                  {/* Quick Tips */}
                  <div className="bg-[#f5f5f5] border border-gray-200 rounded-[5px] p-6">
                    <h3 className="text-base font-bold font-sans text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#2AA100]" />
                      Quick Tips
                    </h3>
                    <ul className="space-y-3">
                      {[
                        'Share your referral link in WhatsApp groups, LinkedIn, or email.',
                        'Focus on people who need professional services or businesses looking for customers.',
                        'Every qualifying referral who signs up and transacts earns you a commission.',
                        'Track your referrals and commissions in real time from this dashboard.',
                      ].map((tip, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm font-sans text-gray-700"
                        >
                          <ChevronRight className="w-4 h-4 text-[#EE009D] flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA strip */}
                <div className="bg-[#f5f5f5] border border-gray-200 rounded-[5px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold font-sans text-gray-900">
                      Ready to earn more?
                    </p>
                    <p className="text-xs font-sans text-gray-500 mt-0.5">
                      View your referrals and track your commissions.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleTabChange('referrals')}
                      className="font-sans text-xs font-medium text-white bg-[#2AA100] hover:bg-[#EE009D] py-2 px-4 rounded-[5px] transition-colors duration-200 ease-in"
                    >
                      View Referrals
                    </button>
                    <button
                      onClick={() => handleTabChange('commissions')}
                      className="font-sans text-xs font-medium text-white bg-[#EE009D] hover:bg-[#2AA100] py-2 px-4 rounded-[5px] transition-colors duration-200 ease-in"
                    >
                      View Commissions
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* REFERRAL LINK */}
            {activeTab === 'referral-link' && (
              <div className="max-w-lg">
                <p className="text-sm font-sans text-gray-600 mb-5 leading-relaxed">
                  This is your unique referral link. Every time someone clicks it and becomes a
                  qualifying Workason customer, you earn a commission. Share it anywhere — social
                  media, email, WhatsApp, or your website.
                </p>
                <ReferralLinkCard
                  affiliateId={displayStats.affiliate_id ?? profile?.affiliate_id}
                  referralLink={displayStats.referral_link ?? profile?.referral_link}
                />
              </div>
            )}

            {/* REFERRALS */}
            {activeTab === 'referrals' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold font-sans text-gray-900">My Referrals</h3>
                  <span className="text-xs font-sans text-gray-500 bg-[#f5f5f5] border border-gray-200 px-3 py-1 rounded-full">
                    {referrals.length} referral{referrals.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <ReferralsTable
                  referrals={referrals}
                  loading={referralsLoading}
                  error={referralsError ?? undefined}
                />
              </div>
            )}

            {/* COMMISSIONS */}
            {activeTab === 'commissions' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold font-sans text-gray-900">
                    Commission History
                  </h3>
                  <span className="text-xs font-sans text-gray-500 bg-[#f5f5f5] border border-gray-200 px-3 py-1 rounded-full">
                    {commissions.length} record{commissions.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <CommissionsTable
                  commissions={commissions}
                  loading={commissionsLoading}
                  error={commissionsError ?? undefined}
                />
              </div>
            )}

            {/* PAYMENT HISTORY */}
            {activeTab === 'payments' && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-base font-bold font-sans text-gray-900">Payment History</h3>
                  <span className="text-xs font-sans text-gray-500 bg-[#f5f5f5] border border-gray-200 px-3 py-1 rounded-full">
                    {payments.length} payment{payments.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <CommissionsTable
                  commissions={payments}
                  loading={paymentsLoading}
                  error={paymentsError ?? undefined}
                />
              </div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div className="max-w-lg">
                <h3 className="text-base font-bold font-sans text-gray-900 mb-5">
                  Affiliate Profile
                </h3>
                <div className="space-y-0 border border-gray-200 rounded-[5px] overflow-hidden">
                  {[
                    { label: 'Affiliate ID', value: profile?.affiliate_id },
                    { label: 'Status', value: profile?.status },
                    { label: 'Member Since', value: profile?.created_at },
                    { label: 'Total Referrals', value: profile?.total_referrals?.toString() },
                    {
                      label: 'Converted Customers',
                      value: profile?.converted_customers?.toString(),
                    },
                    { label: 'Commission Earned', value: profile?.commission_earned },
                    { label: 'Commission Paid', value: profile?.commission_paid },
                    { label: 'Pending Commission', value: profile?.pending_commission },
                  ].map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between px-4 py-3 ${
                        i % 2 === 0 ? 'bg-[#f5f5f5]' : 'bg-white'
                      } border-b border-gray-200 last:border-b-0`}
                    >
                      <span className="text-sm font-sans text-gray-500">{row.label}</span>
                      <span className="text-sm font-semibold font-sans text-gray-900">
                        {row.value ?? '—'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4 border border-gray-200 rounded-[5px] bg-[#f5f5f5]">
                  <p className="text-xs font-sans text-gray-600 leading-relaxed">
                    To update your personal information (name, email, contact details), please visit
                    your{' '}
                    <button
                      className="text-[#2AA100] font-semibold hover:text-[#EE009D] transition-colors"
                      onClick={() => navigate('/profile-list')}
                    >
                      profile settings
                    </button>
                    .
                  </p>
                </div>
              </div>
            )}

            {/* TERMS */}
            {activeTab === 'terms' && (
              <div>
                <h3 className="text-base font-bold font-sans text-gray-900 mb-5">
                  Affiliate Terms & Conditions
                </h3>
                <TermsContent
                  content={termsContent}
                  loading={termsLoading}
                  error={termsError ?? undefined}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
