import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// ── Module Types ─────────────────────────────────────────────────────────────
// Each interface mirrors exactly what the Laravel seeder puts in that module's
// 'content' JSON column. Add new fields here when the seeder is extended.

export interface HomepageCMS {
  // ── Legacy (backward compat) ────────────────────────────────────────────────
  hero_title: string;
  hero_subtitle: string;
  hero_cta_employer: string;
  hero_cta_candidate: string;
  stats_jobs: string;
  stats_employers: string;
  stats_candidates: string;
  section_features_title: string;
  section_features_subtitle: string;

  // ── Hero Slider ─────────────────────────────────────────────────────────────
  hero_slides_json: string;

  // ── FindJobSection ──────────────────────────────────────────────────────────
  features_heading: string;
  features_cta_heading: string;
  features_cta_subtitle: string;
  features_cta_button: string;
  features_cards_json: string;

  // ── ProductivitySection ─────────────────────────────────────────────────────
  productivity_heading: string;
  productivity_highlight: string;
  productivity_stats_json: string;

  // ── OneStepSection ──────────────────────────────────────────────────────────
  career_badge: string;
  career_heading: string;
  career_highlight: string;
  career_description: string;
  career_button_text: string;
  career_button_url: string;
  services_heading: string;
  services_cards_json: string;

  // ── SimpleProcessSection ────────────────────────────────────────────────────
  process_badge: string;
  process_heading: string;
  process_highlight: string;
  process_description: string;
  process_button_text: string;
  process_button_url: string;
  process_steps_json: string;

  // ── WorkasonLanding ─────────────────────────────────────────────────────────
  landing_heading: string;
  landing_subtitle: string;
  landing_cta_primary: string;
  landing_cta_secondary: string;
  landing_how_heading: string;
  landing_steps_json: string;
  landing_referral_heading: string;
  landing_referral_subheading: string;
  landing_referral_description: string;
  landing_referral_button: string;
  landing_why_matters: string;
  landing_benefits_json: string;
  landing_features_json: string;

  // ── OurPlatformSection ──────────────────────────────────────────────────────
  tips_badge: string;
  tips_heading: string;
  tips_highlight: string;
  tips_description: string;
  tips_button_text: string;
  tips_button_url: string;

  // ── Verified / Hiring Options ────────────────────────────────────────────────
  hiring_heading: string;
  hiring_subtitle: string;
  hiring_cta_primary: string;
  hiring_bottom_heading: string;
  hiring_bottom_cta: string;
  hiring_options_json: string;

  // ── ReviewSection ────────────────────────────────────────────────────────────
  reviews_heading: string;
  reviews_subtitle: string;
  reviews_stat_rating: string;
  reviews_stat_clients: string;
  reviews_stat_freelancers: string;
  reviews_bottom_heading: string;
  reviews_bottom_desc: string;
  reviews_stats_avg: string;
  reviews_stats_total: string;
  reviews_stats_satisfaction: string;
  reviews_stats_active: string;
  reviews_cards_json: string;
}

export interface AboutCMS {
  // ── Hero ─────────────────────────────────────────────────────────────────────
  about_hero_heading: string;
  about_hero_highlight: string;
  about_intro_heading: string;
  about_intro_description_html: string;

  // ── Problems (Built for the Modern Workforce) ─────────────────────────────────
  about_built_heading: string;
  about_built_description: string;
  about_problems_json: string;

  // ── Solutions ─────────────────────────────────────────────────────────────────
  about_solutions_heading: string;
  about_solutions_subtext: string;
  about_solutions_json: string;
  about_platform_description: string;

  // ── AI Matching ───────────────────────────────────────────────────────────────
  about_ai_heading: string;
  about_ai_subtext: string;
  about_ai_features_json: string;

  // ── Culture ───────────────────────────────────────────────────────────────────
  about_culture_label: string;
  about_culture_description: string;

  // ── Our Users ─────────────────────────────────────────────────────────────────
  about_users_heading: string;
  about_users_freelancer_tab: string;
  about_users_employer_tab: string;
  about_freelancer_subtitle: string;
  about_employer_subtitle: string;
  about_freelancer_path_heading: string;
  about_freelancer_path_description: string;
  about_freelancer_steps_json: string;
  about_employer_heading: string;
  about_employer_description: string;
  about_employer_benefits_json: string;

  // ── Vision ────────────────────────────────────────────────────────────────────
  about_vision_label: string;
  about_vision_description: string;
}

export interface EmployersCMS {
  // ── HeroSection ─────────────────────────────────────────────────────────────
  emp_hero_badge: string;
  emp_hero_heading: string;
  emp_hero_description: string;
  emp_hero_cta_primary: string;
  emp_hero_cta_secondary: string;

  // ── EasyManageSection (Why SkillStamp™ Matters) ─────────────────────────────
  emp_why_heading: string;
  emp_why_highlight: string;
  emp_why_subtitle: string;
  emp_why_freelancer_heading: string;
  emp_why_client_heading: string;
  emp_why_freelancer_benefits_json: string;
  emp_why_client_benefits_json: string;

  // ── EasyStepSection (Badge Types) ───────────────────────────────────────────
  emp_badges_heading: string;
  emp_badges_highlight: string;
  emp_badges_subtitle: string;
  emp_badge_types_json: string;

  // ── VideoCallSection (How It Works) ─────────────────────────────────────────
  emp_how_heading: string;
  emp_how_highlight: string;
  emp_how_subtitle: string;
  emp_how_steps_json: string;

  // ── WhatTheySayingSection (Testimonials) ────────────────────────────────────
  emp_testimonials_badge: string;
  emp_testimonials_heading: string;
  emp_testimonials_highlight: string;
  emp_testimonials_description: string;
  emp_testimonials_button: string;
  emp_testimonials_url: string;

  // ── JoinUsSection ───────────────────────────────────────────────────────────
  emp_join_heading: string;
  emp_join_highlight: string;
  emp_join_button: string;
  emp_join_url: string;
}

export interface EmployersOrdinaryCMS {
  // ── Hero ────────────────────────────────────────────────────────────────────
  emp_ord_heading: string;
  emp_ord_description: string;
  emp_ord_button: string;
  emp_ord_button_url: string;
  emp_ord_stats_count: string;
  emp_ord_stats_text: string;

  // ── Key Features ────────────────────────────────────────────────────────────
  emp_ord_features_heading: string;
  emp_ord_features_subtitle: string;
  emp_ord_features_json: string;
  emp_ord_best_for: string;
}

export interface EmployersSmartStartCMS {
  // ── Hero ────────────────────────────────────────────────────────────────────
  emp_ss_heading: string;
  emp_ss_description: string;
  emp_ss_button: string;
  emp_ss_button_url: string;
  emp_ss_stats_count: string;
  emp_ss_stats_text: string;

  // ── Features ────────────────────────────────────────────────────────────────
  emp_ss_features_heading: string;
  emp_ss_features_subtitle: string;
  emp_ss_features_json: string;
  emp_ss_best_for: string;
}

export interface FreelancersOrdinaryCMS {
  // ── Hero ────────────────────────────────────────────────────────────────────
  fl_ord_badge: string;
  fl_ord_heading: string;
  fl_ord_description: string;

  // ── How It Works ────────────────────────────────────────────────────────────
  fl_ord_how_heading: string;
  fl_ord_steps_json: string;

  // ── Included / Not Included ─────────────────────────────────────────────────
  fl_ord_included_heading: string;
  fl_ord_included_json: string;
  fl_ord_not_included_heading: string;
  fl_ord_not_included_json: string;

  // ── CTA ─────────────────────────────────────────────────────────────────────
  fl_ord_best_for: string;
  fl_ord_cta_button: string;
  fl_ord_cta_url: string;
}

export interface FreelancersSmartStartCMS {
  // ── Hero ────────────────────────────────────────────────────────────────────
  fl_ss_badge: string;
  fl_ss_heading: string;
  fl_ss_description: string;

  // ── How It Works ────────────────────────────────────────────────────────────
  fl_ss_how_heading: string;
  fl_ss_steps_json: string;

  // ── What You Get ────────────────────────────────────────────────────────────
  fl_ss_included_heading: string;
  fl_ss_included_json: string;

  // ── CTA ─────────────────────────────────────────────────────────────────────
  fl_ss_cta_button: string;
  fl_ss_cta_url: string;
}

export interface FreelancersTalentVaultCMS {
  // ── Hero ────────────────────────────────────────────────────────────────────
  fl_tv_badge: string;
  fl_tv_heading: string;
  fl_tv_description: string;
  fl_tv_access_label: string;
  fl_tv_access_options_json: string;
  fl_tv_button: string;
  fl_tv_button_url: string;
  fl_tv_best_for: string;

  // ── Key Features ────────────────────────────────────────────────────────────
  fl_tv_features_heading: string;
  fl_tv_features_json: string;

  // ── What You Get ────────────────────────────────────────────────────────────
  fl_tv_what_you_get_heading: string;
  fl_tv_what_you_get_json: string;

  // ── Talents Carousel ────────────────────────────────────────────────────────
  fl_tv_talents_heading: string;
  fl_tv_talents_subtitle: string;

  // ── CTA ─────────────────────────────────────────────────────────────────────
  fl_tv_cta_heading: string;
  fl_tv_cta_description: string;
  fl_tv_cta_button: string;
  fl_tv_cta_url: string;
}

export interface FreelancersInHouseCMS {
  // ── Hero ────────────────────────────────────────────────────────────────────
  fl_ih_badge: string;
  fl_ih_heading: string;
  fl_ih_heading_highlight: string;
  fl_ih_description: string;
  fl_ih_plan_label: string;
  fl_ih_plan_monthly: string;
  fl_ih_plan_project: string;
  fl_ih_button: string;
  fl_ih_button_url: string;
  fl_ih_best_for: string;

  // ── Key Features ────────────────────────────────────────────────────────────
  fl_ih_features_heading: string;
  fl_ih_features_json: string;

  // ── How It Works ────────────────────────────────────────────────────────────
  fl_ih_how_heading: string;
  fl_ih_how_subtitle: string;
  fl_ih_steps_json: string;

  // ── What You Get ────────────────────────────────────────────────────────────
  fl_ih_what_you_get_heading: string;
  fl_ih_what_you_get_json: string;

  // ── Pricing ─────────────────────────────────────────────────────────────────
  fl_ih_pricing_badge: string;
  fl_ih_pricing_heading: string;
  fl_ih_pricing_description: string;
  fl_ih_plans_json: string;

  // ── CTA ─────────────────────────────────────────────────────────────────────
  fl_ih_cta_badge: string;
  fl_ih_cta_heading: string;
  fl_ih_cta_description: string;
  fl_ih_cta_button: string;
  fl_ih_cta_url: string;
}

export interface EmployerDashboardCMS {
  welcome_text: string;
  page_heading: string;
  active_jobs_label: string;
  new_applicants_label: string;
  profile_views_label: string;
  engagement_label: string;
  empty_jobs_message: string;
  empty_applicants_message: string;
  applicant_trends_heading: string;
  applicant_sources_heading: string;
}

export interface CandidateDashboardCMS {
  welcome_text: string;
  applied_jobs_label: string;
  saved_jobs_label: string;
  profile_strength_label: string;
  job_engagements_label: string;
  empty_applied_message: string;
  empty_saved_message: string;
  profile_incomplete_banner: string;
  app_activity_heading: string;
  app_status_heading: string;
  profile_modal_heading: string;
  profile_modal_description: string;
  profile_modal_cta: string;
  profile_modal_skip: string;
  saved_jobs_heading: string;
  saved_jobs_empty: string;
}

export interface EmployerDashboardPostJobCMS {
  page_heading: string;
  job_details_section: string;
  skills_section: string;
  location_section: string;
  job_title_label: string;
  job_title_placeholder: string;
  job_desc_label: string;
  job_desc_placeholder: string;
  job_req_label: string;
  job_req_placeholder: string;
  job_category_label: string;
  job_type_label: string;
  work_type_label: string;
  salary_label: string;
  budget_label: string;
  budget_placeholder: string;
  skills_label: string;
  skills_placeholder: string;
  experience_label: string;
  experience_placeholder: string;
  cancel_button: string;
  post_button: string;
  posting_button: string;
}

export interface EmployerDashboardTalentVaultCMS {
  page_heading: string;
  page_badge: string;
  page_description: string;
  loading_text: string;
  smartstart_only_heading: string;
  smartstart_only_description: string;
  smartstart_only_button: string;
  pricing_heading: string;
  pricing_description: string;
  popular_badge: string;
  candidates_empty: string;
  view_details_button: string;
  send_message_button: string;
}

export interface EmployerDashboardSmartStartCMS {
  header_badge: string;
  header_description: string;
  fee_label: string;
  fee_subtitle: string;
  fee_amount: string;
  fee_naira: string;
  terms_text: string;
  submit_button: string;
  payment_loading_text: string;
  success_heading: string;
  success_description: string;
}

export interface CandidateDashboardSmartStartCMS {
  page_heading: string;
  page_description: string;
  step_personal_title: string;
  step_role_title: string;
  step_portfolio_title: string;
  step_package_title: string;
  step_availability_title: string;
  step_consent_title: string;
  personal_details_subtitle: string;
  role_skills_subtitle: string;
  portfolio_subtitle: string;
  package_subtitle: string;
  availability_subtitle: string;
  consent_subtitle: string;
  terms_checkbox_text: string;
  consent_checkbox_text: string;
  next_button: string;
  prev_button: string;
  submit_button: string;
}

export interface CandidateDashboardSmartGuideCMS {
  modules_heading: string;
  quickwins_heading: string;
  ai_tips_heading: string;
  upgrade_button: string;
  not_found_message: string;
  progress_label: string;
  of_text: string;
  modules_completed_text: string;
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
  about?: Partial<AboutCMS>;
  employers?: Partial<EmployersCMS>;
  employers_ordinary?: Partial<EmployersOrdinaryCMS>;
  employers_smartstart?: Partial<EmployersSmartStartCMS>;
  freelancers_ordinary?: Partial<FreelancersOrdinaryCMS>;
  freelancers_smartstart?: Partial<FreelancersSmartStartCMS>;
  freelancers_talentvault?: Partial<FreelancersTalentVaultCMS>;
  freelancers_inhouse?: Partial<FreelancersInHouseCMS>;
  employer_dashboard?: Partial<EmployerDashboardCMS>;
  employer_dashboard_post_job?: Partial<EmployerDashboardPostJobCMS>;
  employer_dashboard_talent_vault?: Partial<EmployerDashboardTalentVaultCMS>;
  employer_dashboard_smartstart?: Partial<EmployerDashboardSmartStartCMS>;
  candidate_dashboard?: Partial<CandidateDashboardCMS>;
  candidate_dashboard_smartstart?: Partial<CandidateDashboardSmartStartCMS>;
  candidate_dashboard_smartguide?: Partial<CandidateDashboardSmartGuideCMS>;
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

export const ABOUT_DEFAULTS: AboutCMS = {
  about_hero_heading: 'We are here to assist',
  about_hero_highlight: 'in recruiting.',
  about_intro_heading: 'Making marketplace hunt easier',
  about_intro_description_html: '<p>Workason is a next-generation freelance marketplace designed for global clients who want trusted, verified talent without the stress of unreliable freelancers or complicated hiring processes.</p><p>We combine AI matching, SkillStamps™ verification, and our TalentVault to help businesses hire virtual assistants, editors, and digital talent with confidence.</p>',
  about_built_heading: 'Built for the Modern Workforce',
  about_built_description: "Workason was created to solve three major problems in today's freelance industry",
  about_problems_json: '',
  about_solutions_heading: 'Our Solution',
  about_solutions_subtext: 'Comprehensive tools designed for excellence',
  about_solutions_json: '',
  about_platform_description: 'Every feature is designed to ensure high-quality work, fair payments, and complete transparency for both freelancers and employers.',
  about_ai_heading: 'AI Matching That Works for You',
  about_ai_subtext: 'Our AI engine reads job requirements and instantly recommends the most suitable freelancers',
  about_ai_features_json: '',
  about_culture_label: 'Our culture',
  about_culture_description: 'We love what we do and collaborate every day, driven to change the world of work',
  about_users_heading: 'Our Users',
  about_users_freelancer_tab: 'For Freelancers',
  about_users_employer_tab: 'For Employers',
  about_freelancer_subtitle: 'Workason gives freelancers a clearer path to success with step-by-step progression.',
  about_employer_subtitle: 'We support businesses of all sizes from UK diaspora clients to global brands.',
  about_freelancer_path_heading: 'Your Path to Success',
  about_freelancer_path_description: 'Progress through our structured upgrade system to unlock better opportunities at every level',
  about_freelancer_steps_json: '',
  about_employer_heading: 'Why Employers Choose Workason',
  about_employer_description: 'Everything you need to hire top talent quickly, securely, and with confidence',
  about_employer_benefits_json: '',
  about_vision_label: 'Our Vision',
  about_vision_description: 'To become the leading platform for trusted global freelance work—powered by verification, structured learning, and smart matching.',
};

export const EMPLOYERS_DEFAULTS: EmployersCMS = {
  emp_hero_badge: 'Verified Badge System',
  emp_hero_heading: 'SkillStamp™',
  emp_hero_description: "A verified badge system that gives freelancers credibility and proof of skill on their profile. Think of it as a 'Verified' badge for skills, not just identity.",
  emp_hero_cta_primary: 'Apply for SkillStamp',
  emp_hero_cta_secondary: 'Learn More',
  emp_why_heading: 'Why',
  emp_why_highlight: 'SkillStamp™',
  emp_why_subtitle: 'SkillStamp benefits both freelancers and clients by creating a trusted ecosystem of verified professionals.',
  emp_why_freelancer_heading: 'For Freelancers',
  emp_why_client_heading: 'For Clients',
  emp_why_freelancer_benefits_json: '',
  emp_why_client_benefits_json: '',
  emp_badges_heading: 'Types of',
  emp_badges_highlight: 'SkillStamps',
  emp_badges_subtitle: 'Each badge has a unique meaning and helps freelancers stand out based on their status and performance.',
  emp_badge_types_json: '',
  emp_how_heading: 'How It',
  emp_how_highlight: 'Works',
  emp_how_subtitle: 'Getting your SkillStamp™ is a simple 3-step process designed to verify your skills and expertise.',
  emp_how_steps_json: '',
  emp_testimonials_badge: 'Testimonials',
  emp_testimonials_heading: 'What are they',
  emp_testimonials_highlight: 'saying?',
  emp_testimonials_description: 'Our customers have testified to the quality of our services and the support system we offer. Clients say we are easy to talk to and very supportive.',
  emp_testimonials_button: 'View All',
  emp_testimonials_url: '/testimonial',
  emp_join_heading: 'Come join us and enjoy our',
  emp_join_highlight: 'interesting features.',
  emp_join_button: 'Get Started',
  emp_join_url: '/register',
};

export const EMPLOYERS_ORDINARY_DEFAULTS: EmployersOrdinaryCMS = {
  emp_ord_heading: 'Hire Freelancers on the Workason Marketplace',
  emp_ord_description: 'Post a job and receive proposals from freelancers across video editing and virtual assistance. Review profiles, chat securely, and hire with confidence using our escrow system.',
  emp_ord_button: 'Start Hiring',
  emp_ord_button_url: '/login',
  emp_ord_stats_count: '100',
  emp_ord_stats_text: 'employers cutting across various industries have trusted us over the past years.',
  emp_ord_features_heading: 'Key Features',
  emp_ord_features_subtitle: 'Everything you need to hire with confidence and get exceptional results',
  emp_ord_features_json: '',
  emp_ord_best_for: 'Clients who want flexibility and competitive pricing.',
};

export const EMPLOYERS_SMARTSTART_DEFAULTS: EmployersSmartStartCMS = {
  emp_ss_heading: 'SmartStart – Get Matched with Verified Talent',
  emp_ss_description: 'SmartStart uses AI matching to pair you with pre-screened, SkillStamps™ verified talents based on your exact needs, workflow, and budget — without browsing or trial-and-error.',
  emp_ss_button: 'Start Hiring',
  emp_ss_button_url: '/login',
  emp_ss_stats_count: '23,000',
  emp_ss_stats_text: 'employers cutting across various industries have trusted us over the past years.',
  emp_ss_features_heading: 'Key Features',
  emp_ss_features_subtitle: 'Everything you need to hire with confidence and get exceptional results',
  emp_ss_features_json: '',
  emp_ss_best_for: 'Busy founders, professionals, and diaspora clients who want speed + certainty',
};

export const FREELANCERS_ORDINARY_DEFAULTS: FreelancersOrdinaryCMS = {
  fl_ord_badge: 'Open Marketplace Path',
  fl_ord_heading: 'Ordinary Freelancers',
  fl_ord_description: 'Join Workason as an Ordinary Freelancer and access open job opportunities on the marketplace. This path provides flexibility and open access to jobs, allowing clients to choose freelancers based on their profiles and proposals without verification or guaranteed outcomes.',
  fl_ord_how_heading: 'How it works',
  fl_ord_steps_json: '',
  fl_ord_included_heading: 'What you get',
  fl_ord_included_json: '',
  fl_ord_not_included_heading: 'What is NOT included',
  fl_ord_not_included_json: '',
  fl_ord_best_for: 'Freelancers who want open access and flexibility, are comfortable competing for jobs, and prefer to manage their work independently without additional verification or onboarding.',
  fl_ord_cta_button: 'Join as an Ordinary Freelancer',
  fl_ord_cta_url: '/login',
};

export const FREELANCERS_SMARTSTART_DEFAULTS: FreelancersSmartStartCMS = {
  fl_ss_badge: 'Verified & Prepared Path',
  fl_ss_heading: 'SmartStart Talents',
  fl_ss_description: 'Join Workason as a SmartStart™ Talent and complete a structured onboarding process designed to prepare you for professional work on the platform.',
  fl_ss_how_heading: 'How it works',
  fl_ss_steps_json: '',
  fl_ss_included_heading: 'What you get through SmartStart™',
  fl_ss_included_json: '',
  fl_ss_cta_button: 'Apply for SmartStart',
  fl_ss_cta_url: '/login',
};

export const FREELANCERS_TALENTVAULT_DEFAULTS: FreelancersTalentVaultCMS = {
  fl_tv_badge: 'Exclusive Access',
  fl_tv_heading: 'Access the Talent Vault',
  fl_tv_description: 'Browse a curated vault of verified Workason talents for a limited time. View smart CVs, profiles, portfolios, SkillStamps™ scores, and shortlist candidates directly.',
  fl_tv_access_label: 'Access Options:',
  fl_tv_access_options_json: '',
  fl_tv_button: 'View Talent Vault',
  fl_tv_button_url: '/login',
  fl_tv_best_for: 'Clients who want control + privacy without full outsourcing',
  fl_tv_features_heading: 'Key features',
  fl_tv_features_json: '',
  fl_tv_what_you_get_heading: 'What you get with Talent Vault access',
  fl_tv_what_you_get_json: '',
  fl_tv_talents_heading: 'Meet our talents',
  fl_tv_talents_subtitle: 'A glimpse of verified professionals in the vault',
  fl_tv_cta_heading: 'Ready to unlock premium talent?',
  fl_tv_cta_description: 'Get exclusive access to verified professionals. No crowds, no delays—just quality candidates ready to hire.',
  fl_tv_cta_button: 'View Talent Vault',
  fl_tv_cta_url: '/login',
};

export const FREELANCERS_INHOUSE_DEFAULTS: FreelancersInHouseCMS = {
  fl_ih_badge: 'In-House · Managed by Workason',
  fl_ih_heading: 'Work with Workason',
  fl_ih_heading_highlight: 'Directly',
  fl_ih_description: 'Let Workason handle everything. We assign, manage, and supervise dedicated virtual assistants and editors on your behalf — so you focus on growth, not people management.',
  fl_ih_plan_label: 'Plan Type:',
  fl_ih_plan_monthly: 'Monthly Plan',
  fl_ih_plan_project: 'Project-Based',
  fl_ih_button: 'Get Managed Services',
  fl_ih_button_url: '/contact',
  fl_ih_best_for: 'Businesses that want hands-off execution with accountability.',
  fl_ih_features_heading: 'Key features',
  fl_ih_features_json: '',
  fl_ih_how_heading: 'How it works',
  fl_ih_how_subtitle: 'From brief to execution in four simple steps — fully handled by Workason.',
  fl_ih_steps_json: '',
  fl_ih_what_you_get_heading: 'What you get with Managed Services',
  fl_ih_what_you_get_json: '',
  fl_ih_pricing_badge: 'In-House Pricing',
  fl_ih_pricing_heading: 'From £249/month',
  fl_ih_pricing_description: 'One flat monthly fee. No hidden costs. Your dedicated professional, fully supervised by Workason.',
  fl_ih_plans_json: '',
  fl_ih_cta_badge: 'Fully Managed',
  fl_ih_cta_heading: 'Ready for hands-off execution?',
  fl_ih_cta_description: 'Stop managing people. Start scaling your business. Workason handles everything — from assignment to accountability.',
  fl_ih_cta_button: 'Get Managed Services',
  fl_ih_cta_url: '/login',
};

export const CMS_DEFAULTS: Required<CMSData> = {
  homepage: {
    // ── Legacy ───────────────────────────────────────────────────────────────
    hero_title: 'Find Top Talent. Build Great Teams.',
    hero_subtitle: 'Connect with verified freelancers across Africa and beyond.',
    hero_cta_employer: 'Post a Job',
    hero_cta_candidate: 'Find Work',
    stats_jobs: '10,000+ Jobs',
    stats_employers: '5,000+ Employers',
    stats_candidates: '50,000+ Candidates',
    section_features_title: 'Why Workason?',
    section_features_subtitle: 'Everything you need to hire or get hired on one platform.',
    // ── Hero Slider ──────────────────────────────────────────────────────────
    hero_slides_json: '',
    // ── FindJobSection ────────────────────────────────────────────────────────
    features_heading: 'Why Choose Workason',
    features_cta_heading: 'Ready to Get Started?',
    features_cta_subtitle: 'Join thousands of professionals who trust Workason for their freelancing needs.',
    features_cta_button: 'Start Your Journey',
    features_cards_json: '',
    // ── ProductivitySection ───────────────────────────────────────────────────
    productivity_heading: 'performance',
    productivity_highlight: 'Our productivity',
    productivity_stats_json: '',
    // ── OneStepSection ────────────────────────────────────────────────────────
    career_badge: 'Find Jobs',
    career_heading: 'One easy step to change',
    career_highlight: 'your future.',
    career_description: "Take the first step towards a rewarding career. Whether you're a recent graduate, a seasoned professional, or exploring new opportunities, our platform has everything you need.",
    career_button_text: 'Learn more',
    career_button_url: '/career-tips',
    services_heading: 'Explore Our Services',
    services_cards_json: '',
    // ── SimpleProcessSection ──────────────────────────────────────────────────
    process_badge: 'Started',
    process_heading: 'The fast and',
    process_highlight: 'simple process.',
    process_description: 'Workason carries the theme of technology in helping you find a Job with an easy and fast process.',
    process_button_text: 'Get Started',
    process_button_url: '/register',
    process_steps_json: '',
    // ── WorkasonLanding ───────────────────────────────────────────────────────
    landing_heading: 'The diaspora-first platform for Verified Virtual Assistants & Editors',
    landing_subtitle: 'SmartStart™ AI matching, SkillStamp™ verification, and ProofToPay protection — all in one service.',
    landing_cta_primary: 'Get Started',
    landing_cta_secondary: 'See How It Works',
    landing_how_heading: 'How It Works',
    landing_steps_json: '',
    landing_referral_heading: 'Work Referral',
    landing_referral_subheading: 'Workason UK',
    landing_referral_description: "Completing our training means you can add Workason UK on your CV — a UK-based referral partner that boosts your credibility.",
    landing_referral_button: 'Start Training',
    landing_why_matters: "Your CV won't just show skills — it shows endorsement from a UK-based company, increasing trust with employers and clients worldwide.",
    landing_benefits_json: '',
    landing_features_json: '',
    // ── OurPlatformSection ────────────────────────────────────────────────────
    tips_badge: 'Career Tips',
    tips_heading: 'One platform for multiple solutions.',
    tips_highlight: 'Your future.',
    tips_description: 'You can find various solutions just by accessing our platform. Because we are committed to maintaining the quality of user service.',
    tips_button_text: 'Learn more',
    tips_button_url: '/career-tips',
    // ── Hiring Options ────────────────────────────────────────────────────────
    hiring_heading: 'Hire verified freelancers safely, with or without our help.',
    hiring_subtitle: 'Get the right talent for your business, stress-free.',
    hiring_cta_primary: 'GET STARTED',
    hiring_bottom_heading: 'Ready to find the right freelancer?',
    hiring_bottom_cta: 'GET STARTED NOW',
    hiring_options_json: '',
    // ── Reviews ───────────────────────────────────────────────────────────────
    reviews_heading: 'What Our Community Says',
    reviews_subtitle: "Real stories from freelancers and clients who've transformed their careers and businesses with Workason.",
    reviews_stat_rating: '4.9★',
    reviews_stat_clients: '100',
    reviews_stat_freelancers: '150',
    reviews_bottom_heading: 'Join Thousands of Satisfied Users',
    reviews_bottom_desc: 'Our community continues to grow with freelancers and clients who trust Workason for their professional needs.',
    reviews_stats_avg: '4.9/5',
    reviews_stats_total: '2,847',
    reviews_stats_satisfaction: '98%',
    reviews_stats_active: '1,200+',
    reviews_cards_json: '',
  },
  employer_dashboard: {
    welcome_text: 'Welcome back',
    page_heading: 'Employer Dashboard',
    active_jobs_label: 'Active Jobs',
    new_applicants_label: 'New Applicants',
    profile_views_label: 'Profile Views',
    engagement_label: 'Engagement Rate',
    empty_jobs_message: 'You have no active jobs. Post a job to get started.',
    empty_applicants_message: 'No new applicants yet. Check back soon.',
    applicant_trends_heading: 'Applicant Trends',
    applicant_sources_heading: 'Applicant Sources',
  },
  employer_dashboard_post_job: {
    page_heading: 'Post a New Job',
    job_details_section: 'Job Details',
    skills_section: 'Skills & Experience',
    location_section: 'Location',
    job_title_label: 'Job Title*',
    job_title_placeholder: 'Ex: Product Designer',
    job_desc_label: 'Job Description*',
    job_desc_placeholder: 'Write about the job in details...',
    job_req_label: 'Job Requirement*',
    job_req_placeholder: 'Write about the job requirements...',
    job_category_label: 'Job Category*',
    job_type_label: 'Job Type*',
    work_type_label: 'Work Type*',
    salary_label: 'Salary*',
    budget_label: 'Budgeted Amount*',
    budget_placeholder: 'Enter budgeted amount',
    skills_label: 'Skills*',
    skills_placeholder: 'Add skills and press Enter to save',
    experience_label: 'Experience*',
    experience_placeholder: 'e.g. 2 years',
    cancel_button: 'Cancel',
    post_button: 'Post Job',
    posting_button: 'Submitting...',
  },
  employer_dashboard_talent_vault: {
    page_heading: 'Talent Vault',
    page_badge: 'SmartStart™ Exclusive',
    page_description: 'Access verified freelancers hand-picked from our talent pool.',
    loading_text: 'Loading Talent Vault…',
    smartstart_only_heading: 'SmartStart™ Members Only',
    smartstart_only_description: 'The Talent Vault is exclusively available to employers who have activated a SmartStart™ plan. Upgrade to unlock access to our verified talent pool.',
    smartstart_only_button: 'Activate SmartStart™',
    pricing_heading: 'Access the Verified Talent Vault',
    pricing_description: 'Choose a plan to unlock the full verified candidate list.',
    popular_badge: 'Most Popular',
    candidates_empty: 'No candidates found.',
    view_details_button: 'View Details',
    send_message_button: 'Message Candidate',
  },
  employer_dashboard_smartstart: {
    header_badge: 'SmartStart™',
    header_description: "Tell us about your project. We’ll hand-pick 3–5 verified freelancers from our talent pool — no searching required.",
    fee_label: 'SmartStart service fee',
    fee_subtitle: 'Covers curated matching + guided hiring',
    fee_amount: '£39',
    fee_naira: '≈ ₦78,000',
    terms_text: "I agree to Workason’s terms of service and understand the SmartStart fee is non-refundable once freelancer matching begins.",
    submit_button: 'Submit & pay £39 →',
    payment_loading_text: 'Opening payment...',
    success_heading: 'Payment successful!',
    success_description: "We’re reviewing your project and will send you a curated Talent Pack of 3–5 verified freelancers within 24–48 hours. Check your email for next steps.",
  },
  candidate_dashboard: {
    welcome_text: 'Welcome back',
    applied_jobs_label: 'Applied Jobs',
    saved_jobs_label: 'Saved Jobs',
    profile_strength_label: 'Profile Strength',
    job_engagements_label: 'Job Engagements',
    empty_applied_message: 'You have not applied to any jobs yet.',
    empty_saved_message: 'You have no saved jobs.',
    profile_incomplete_banner: 'Complete your profile to improve your visibility to employers.',
    app_activity_heading: 'Application Activity',
    app_status_heading: 'Application Status',
    profile_modal_heading: 'Complete Your Profile',
    profile_modal_description: "Welcome! To get the best experience and start getting hired, please set up your profile first. It only takes a few minutes. Without this your profile won’t be recognised",
    profile_modal_cta: 'Set Up Profile',
    profile_modal_skip: 'Do It Later',
    saved_jobs_heading: 'Saved Jobs',
    saved_jobs_empty: 'No saved jobs found!',
  },
  candidate_dashboard_smartstart: {
    page_heading: 'SmartStart™ Application',
    page_description: 'Transform your freelance career with our comprehensive program',
    step_personal_title: 'Personal Details',
    step_role_title: 'Role & Skills',
    step_portfolio_title: 'Portfolio',
    step_package_title: 'Package & Payment',
    step_availability_title: 'Availability & Preferences',
    step_consent_title: 'Consent & Agreement',
    personal_details_subtitle: 'Tell us about yourself to get started',
    role_skills_subtitle: 'Define your expertise and experience level',
    portfolio_subtitle: 'Showcase your work and experience',
    package_subtitle: 'Choose your SmartStart™ package',
    availability_subtitle: 'Set your schedule and client preferences',
    consent_subtitle: 'Final agreements to complete your application',
    terms_checkbox_text: 'I agree to the SmartStart™ Terms & Conditions',
    consent_checkbox_text: 'I consent to my profile being listed for job matching',
    next_button: 'Next Step',
    prev_button: 'Previous',
    submit_button: 'Submit Application',
  },
  candidate_dashboard_smartguide: {
    modules_heading: 'Learning Modules',
    quickwins_heading: 'Quick Wins',
    ai_tips_heading: 'AI Automation Tips',
    upgrade_button: 'Upgrade Role',
    not_found_message: 'Guide not found. Please complete the assessment.',
    progress_label: 'Progress',
    of_text: 'of',
    modules_completed_text: 'modules completed',
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
  about: { ...ABOUT_DEFAULTS },
  employers: { ...EMPLOYERS_DEFAULTS },
  employers_ordinary: { ...EMPLOYERS_ORDINARY_DEFAULTS },
  employers_smartstart: { ...EMPLOYERS_SMARTSTART_DEFAULTS },
  freelancers_ordinary: { ...FREELANCERS_ORDINARY_DEFAULTS },
  freelancers_smartstart: { ...FREELANCERS_SMARTSTART_DEFAULTS },
  freelancers_talentvault: { ...FREELANCERS_TALENTVAULT_DEFAULTS },
  freelancers_inhouse: { ...FREELANCERS_INHOUSE_DEFAULTS },
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
    about: { ...CMS_DEFAULTS.about, ...(apiData.about ?? {}) },
    employers: { ...CMS_DEFAULTS.employers, ...(apiData.employers ?? {}) },
    employers_ordinary: { ...CMS_DEFAULTS.employers_ordinary, ...(apiData.employers_ordinary ?? {}) },
    employers_smartstart: { ...CMS_DEFAULTS.employers_smartstart, ...(apiData.employers_smartstart ?? {}) },
    freelancers_ordinary: { ...CMS_DEFAULTS.freelancers_ordinary, ...(apiData.freelancers_ordinary ?? {}) },
    freelancers_smartstart: { ...CMS_DEFAULTS.freelancers_smartstart, ...(apiData.freelancers_smartstart ?? {}) },
    freelancers_talentvault: { ...CMS_DEFAULTS.freelancers_talentvault, ...(apiData.freelancers_talentvault ?? {}) },
    freelancers_inhouse: { ...CMS_DEFAULTS.freelancers_inhouse, ...(apiData.freelancers_inhouse ?? {}) },
    employer_dashboard: { ...CMS_DEFAULTS.employer_dashboard, ...(apiData.employer_dashboard ?? {}) },
    employer_dashboard_post_job: { ...CMS_DEFAULTS.employer_dashboard_post_job, ...(apiData.employer_dashboard_post_job ?? {}) },
    employer_dashboard_talent_vault: { ...CMS_DEFAULTS.employer_dashboard_talent_vault, ...(apiData.employer_dashboard_talent_vault ?? {}) },
    employer_dashboard_smartstart: { ...CMS_DEFAULTS.employer_dashboard_smartstart, ...(apiData.employer_dashboard_smartstart ?? {}) },
    candidate_dashboard: { ...CMS_DEFAULTS.candidate_dashboard, ...(apiData.candidate_dashboard ?? {}) },
    candidate_dashboard_smartstart: { ...CMS_DEFAULTS.candidate_dashboard_smartstart, ...(apiData.candidate_dashboard_smartstart ?? {}) },
    candidate_dashboard_smartguide: { ...CMS_DEFAULTS.candidate_dashboard_smartguide, ...(apiData.candidate_dashboard_smartguide ?? {}) },
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

export const selectCMSAbout = (state: { cms: CMSState }): AboutCMS =>
  ({ ...ABOUT_DEFAULTS, ...(state.cms.data.about ?? {}) }) as AboutCMS;

export const selectCMSEmployerDashboard = (state: { cms: CMSState }): EmployerDashboardCMS =>
  ({ ...CMS_DEFAULTS.employer_dashboard, ...(state.cms.data.employer_dashboard ?? {}) }) as EmployerDashboardCMS;

export const selectCMSEmployerDashboardPostJob = (state: { cms: CMSState }): EmployerDashboardPostJobCMS =>
  ({ ...CMS_DEFAULTS.employer_dashboard_post_job, ...(state.cms.data.employer_dashboard_post_job ?? {}) }) as EmployerDashboardPostJobCMS;

export const selectCMSEmployerDashboardTalentVault = (state: { cms: CMSState }): EmployerDashboardTalentVaultCMS =>
  ({ ...CMS_DEFAULTS.employer_dashboard_talent_vault, ...(state.cms.data.employer_dashboard_talent_vault ?? {}) }) as EmployerDashboardTalentVaultCMS;

export const selectCMSEmployerDashboardSmartStart = (state: { cms: CMSState }): EmployerDashboardSmartStartCMS =>
  ({ ...CMS_DEFAULTS.employer_dashboard_smartstart, ...(state.cms.data.employer_dashboard_smartstart ?? {}) }) as EmployerDashboardSmartStartCMS;

export const selectCMSCandidateDashboard = (state: { cms: CMSState }): CandidateDashboardCMS =>
  ({ ...CMS_DEFAULTS.candidate_dashboard, ...(state.cms.data.candidate_dashboard ?? {}) }) as CandidateDashboardCMS;

export const selectCMSCandidateDashboardSmartStart = (state: { cms: CMSState }): CandidateDashboardSmartStartCMS =>
  ({ ...CMS_DEFAULTS.candidate_dashboard_smartstart, ...(state.cms.data.candidate_dashboard_smartstart ?? {}) }) as CandidateDashboardSmartStartCMS;

export const selectCMSCandidateDashboardSmartGuide = (state: { cms: CMSState }): CandidateDashboardSmartGuideCMS =>
  ({ ...CMS_DEFAULTS.candidate_dashboard_smartguide, ...(state.cms.data.candidate_dashboard_smartguide ?? {}) }) as CandidateDashboardSmartGuideCMS;

export const selectCMSFooter = (state: { cms: CMSState }): FooterCMS =>
  ({ ...CMS_DEFAULTS.footer, ...(state.cms.data.footer ?? {}) }) as FooterCMS;

export const selectCMSGlobal = (state: { cms: CMSState }): GlobalCMS =>
  ({ ...CMS_DEFAULTS.global, ...(state.cms.data.global ?? {}) }) as GlobalCMS;

export const selectCMSIsLoaded = (state: { cms: CMSState }): boolean =>
  state.cms.isLoaded;

export const selectCMSIsLoading = (state: { cms: CMSState }): boolean =>
  state.cms.isLoading;

export const selectCMSEmployers = (state: { cms: CMSState }): EmployersCMS =>
  ({ ...EMPLOYERS_DEFAULTS, ...(state.cms.data.employers ?? {}) }) as EmployersCMS;

export const selectCMSEmployersOrdinary = (state: { cms: CMSState }): EmployersOrdinaryCMS =>
  ({ ...EMPLOYERS_ORDINARY_DEFAULTS, ...(state.cms.data.employers_ordinary ?? {}) }) as EmployersOrdinaryCMS;

export const selectCMSEmployersSmartStart = (state: { cms: CMSState }): EmployersSmartStartCMS =>
  ({ ...EMPLOYERS_SMARTSTART_DEFAULTS, ...(state.cms.data.employers_smartstart ?? {}) }) as EmployersSmartStartCMS;

export const selectCMSFreelancersOrdinary = (state: { cms: CMSState }): FreelancersOrdinaryCMS =>
  ({ ...FREELANCERS_ORDINARY_DEFAULTS, ...(state.cms.data.freelancers_ordinary ?? {}) }) as FreelancersOrdinaryCMS;

export const selectCMSFreelancersSmartStart = (state: { cms: CMSState }): FreelancersSmartStartCMS =>
  ({ ...FREELANCERS_SMARTSTART_DEFAULTS, ...(state.cms.data.freelancers_smartstart ?? {}) }) as FreelancersSmartStartCMS;

export const selectCMSFreelancersTalentVault = (state: { cms: CMSState }): FreelancersTalentVaultCMS =>
  ({ ...FREELANCERS_TALENTVAULT_DEFAULTS, ...(state.cms.data.freelancers_talentvault ?? {}) }) as FreelancersTalentVaultCMS;

export const selectCMSFreelancersInHouse = (state: { cms: CMSState }): FreelancersInHouseCMS =>
  ({ ...FREELANCERS_INHOUSE_DEFAULTS, ...(state.cms.data.freelancers_inhouse ?? {}) }) as FreelancersInHouseCMS;

export default cmsSlice.reducer;
