import { httpGetWithToken, httpPostWithToken } from '../utils/http_utils';

export interface AffiliateProfile {
  id?: number;
  affiliate_id?: string;
  status?: string;
  referral_link?: string;
  total_referrals?: number;
  converted_customers?: number;
  commission_earned?: string;
  commission_paid?: string;
  pending_commission?: string;
  created_at?: string;
  user_id?: number;
}

export interface AffiliateDashboardStats {
  affiliate_id?: string;
  total_referrals?: number;
  converted_customers?: number;
  commission_earned?: string;
  commission_paid?: string;
  pending_commission?: string;
  referral_link?: string;
}

export interface AffiliateReferral {
  id?: number;
  referral_id?: string;
  date?: string;
  customer?: string;
  status?: string;
  conversion_status?: string;
  commission?: string;
  commission_status?: string;
}

export interface AffiliateCommission {
  id?: number;
  date?: string;
  referral?: string;
  amount?: string;
  status?: string;
  payment_date?: string;
}

export interface AffiliateRegistrationData {
  how_you_heard?: string;
  promotion_method?: string;
  network_description?: string;
  agree_to_terms?: boolean;
}

// Expected backend endpoints — update paths once backend routes are confirmed.
// Base URL is resolved from REACT_APP_API_URL in http_utils.
const affiliateService = {
  // GET affiliate/profile — returns AffiliateProfile or null if not an affiliate
  getProfile: () => httpGetWithToken('affiliate/profile'),

  // POST affiliate/register — registers current authenticated user as affiliate
  register: (data: AffiliateRegistrationData) => httpPostWithToken('affiliate/register', data),

  // GET affiliate/dashboard — returns AffiliateDashboardStats
  getDashboard: () => httpGetWithToken('affiliate/dashboard'),

  // GET affiliate/referral-link — returns { affiliate_id, referral_link }
  getReferralLink: () => httpGetWithToken('affiliate/referral-link'),

  // GET affiliate/referrals — returns AffiliateReferral[]
  getReferrals: () => httpGetWithToken('affiliate/referrals'),

  // GET affiliate/conversions — returns converted referrals
  getConversions: () => httpGetWithToken('affiliate/conversions'),

  // GET affiliate/commissions — returns AffiliateCommission[]
  getCommissions: () => httpGetWithToken('affiliate/commissions'),

  // GET affiliate/payments — returns payment history
  getPaymentHistory: () => httpGetWithToken('affiliate/payments'),

  // GET affiliate/terms — returns terms and conditions content
  getTerms: () => httpGetWithToken('affiliate/terms'),
};

export default affiliateService;
