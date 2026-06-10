import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ── Module Types ─────────────────────────────────────────────────────────────
// Each interface mirrors exactly what the Laravel seeder puts in that module's
// 'content' JSON column. Add new fields here when the seeder is extended.

export interface HomepageCMS {
  hero_title: string;
  hero_subtitle: string;
  hero_cta_employer: string;
  hero_cta_candidate: string;
  stats_jobs: string;
  stats_employers: string;
  stats_candidates: string;
  section_features_title: string;
  section_features_subtitle: string;
}

export interface EmployerDashboardCMS {
  welcome_text: string;
  active_jobs_label: string;
  new_applicants_label: string;
  profile_views_label: string;
  engagement_label: string;
  empty_jobs_message: string;
  empty_applicants_message: string;
}

export interface CandidateDashboardCMS {
  welcome_text: string;
  applied_jobs_label: string;
  saved_jobs_label: string;
  profile_strength_label: string;
  empty_applied_message: string;
  empty_saved_message: string;
  profile_incomplete_banner: string;
}

export interface FooterCMS {
  company_tagline: string;
  copyright_text: string;
  address: string;
  support_email: string;
  newsletter_title: string;
  newsletter_subtitle: string;
}

export interface GlobalCMS {
  platform_name: string;
  maintenance_mode: boolean;
  maintenance_message: string;
  announcement_banner: string;
  announcement_active: boolean;
  support_phone: string;
  social_twitter: string;
  social_linkedin: string;
  social_instagram: string;
}

export interface CMSData {
  homepage?: Partial<HomepageCMS>;
  employer_dashboard?: Partial<EmployerDashboardCMS>;
  candidate_dashboard?: Partial<CandidateDashboardCMS>;
  footer?: Partial<FooterCMS>;
  global?: Partial<GlobalCMS>;
}

interface CMSState {
  data: CMSData;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  loadedAt: string | null;
}

// ── Defaults ──────────────────────────────────────────────────────────────────
// These values are the last line of defence. The UI renders these when:
//   1. The CMS API is unreachable.
//   2. The localStorage cache is empty or expired.
//   3. A specific field is missing from the API response.
// They must always produce a working, sensible UI.

export const CMS_DEFAULTS: Required<CMSData> = {
  homepage: {
    hero_title: 'Find Top Talent. Build Great Teams.',
    hero_subtitle: 'Connect with verified freelancers across Africa and beyond.',
    hero_cta_employer: 'Post a Job',
    hero_cta_candidate: 'Find Work',
    stats_jobs: '10,000+ Jobs',
    stats_employers: '5,000+ Employers',
    stats_candidates: '50,000+ Candidates',
    section_features_title: 'Why Workason?',
    section_features_subtitle: 'Everything you need to hire or get hired on one platform.',
  },
  employer_dashboard: {
    welcome_text: 'Welcome back',
    active_jobs_label: 'Active Jobs',
    new_applicants_label: 'New Applicants',
    profile_views_label: 'Profile Views',
    engagement_label: 'Engagement Rate',
    empty_jobs_message: 'You have no active jobs. Post a job to get started.',
    empty_applicants_message: 'No new applicants yet. Check back soon.',
  },
  candidate_dashboard: {
    welcome_text: 'Welcome back',
    applied_jobs_label: 'Applied Jobs',
    saved_jobs_label: 'Saved Jobs',
    profile_strength_label: 'Profile Strength',
    empty_applied_message: 'You have not applied to any jobs yet.',
    empty_saved_message: 'You have no saved jobs.',
    profile_incomplete_banner: 'Complete your profile to improve your visibility to employers.',
  },
  footer: {
    company_tagline: 'Connecting talent with opportunity across Africa.',
    copyright_text: `© ${new Date().getFullYear()} Workason. All rights reserved.`,
    address: 'Lagos, Nigeria',
    support_email: 'contact@workason.com',
    newsletter_title: 'Come join us and don\'t miss our latest job vacancies',
    newsletter_subtitle:
      'By subscribing to our newsletter, you\'re taking a smart step toward transforming your job search.',
  },
  global: {
    platform_name: 'Workason',
    maintenance_mode: false,
    maintenance_message: 'We are performing scheduled maintenance. We will be back shortly.',
    announcement_banner: '',
    announcement_active: false,
    support_phone: '',
    social_twitter: '',
    social_linkedin: '',
    social_instagram: '',
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Merges API data over defaults field-by-field so missing fields always fall
 * back to defaults rather than becoming undefined.
 */
function mergeWithDefaults(apiData: CMSData): Required<CMSData> {
  return {
    homepage: { ...CMS_DEFAULTS.homepage, ...(apiData.homepage ?? {}) },
    employer_dashboard: { ...CMS_DEFAULTS.employer_dashboard, ...(apiData.employer_dashboard ?? {}) },
    candidate_dashboard: { ...CMS_DEFAULTS.candidate_dashboard, ...(apiData.candidate_dashboard ?? {}) },
    footer: { ...CMS_DEFAULTS.footer, ...(apiData.footer ?? {}) },
    global: { ...CMS_DEFAULTS.global, ...(apiData.global ?? {}) },
  };
}

// ── Slice ─────────────────────────────────────────────────────────────────────

const initialState: CMSState = {
  data: CMS_DEFAULTS,
  isLoaded: false,
  isLoading: false,
  error: null,
  loadedAt: null,
};

const cmsSlice = createSlice({
  name: 'cms',
  initialState,
  reducers: {
    setCMSLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    setCMS(state, action: PayloadAction<CMSData>) {
      // Deep merge: API data wins field-by-field; missing fields fall to defaults.
      state.data = mergeWithDefaults(action.payload);
      state.isLoaded = true;
      state.isLoading = false;
      state.loadedAt = new Date().toISOString();
    },

    setCMSError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      // Never wipe state.data on error — keep defaults or whatever was loaded.
    },

    updateCMSModule<K extends keyof CMSData>(
      state: CMSState,
      action: PayloadAction<{ module: K; content: CMSData[K] }>
    ) {
      const { module, content } = action.payload;
      (state.data as any)[module] = {
        ...(CMS_DEFAULTS as any)[module],
        ...((state.data as any)[module] ?? {}),
        ...(content ?? {}),
      };
    },

    clearCMS(state) {
      state.data = CMS_DEFAULTS;
      state.isLoaded = false;
      state.loadedAt = null;
      state.error = null;
    },
  },
});

export const { setCMSLoading, setCMS, setCMSError, updateCMSModule, clearCMS } = cmsSlice.actions;

// ── Selectors ──────────────────────────────────────────────────────────────────
// Always return a defined value — components never receive undefined.

export const selectCMS = (state: { cms: CMSState }): CMSData =>
  state.cms.data;

export const selectCMSHomepage = (state: { cms: CMSState }): HomepageCMS =>
  ({ ...CMS_DEFAULTS.homepage, ...(state.cms.data.homepage ?? {}) }) as HomepageCMS;

export const selectCMSEmployerDashboard = (state: { cms: CMSState }): EmployerDashboardCMS =>
  ({ ...CMS_DEFAULTS.employer_dashboard, ...(state.cms.data.employer_dashboard ?? {}) }) as EmployerDashboardCMS;

export const selectCMSCandidateDashboard = (state: { cms: CMSState }): CandidateDashboardCMS =>
  ({ ...CMS_DEFAULTS.candidate_dashboard, ...(state.cms.data.candidate_dashboard ?? {}) }) as CandidateDashboardCMS;

export const selectCMSFooter = (state: { cms: CMSState }): FooterCMS =>
  ({ ...CMS_DEFAULTS.footer, ...(state.cms.data.footer ?? {}) }) as FooterCMS;

export const selectCMSGlobal = (state: { cms: CMSState }): GlobalCMS =>
  ({ ...CMS_DEFAULTS.global, ...(state.cms.data.global ?? {}) }) as GlobalCMS;

export const selectCMSIsLoaded = (state: { cms: CMSState }): boolean =>
  state.cms.isLoaded;

export const selectCMSIsLoading = (state: { cms: CMSState }): boolean =>
  state.cms.isLoading;

export default cmsSlice.reducer;
