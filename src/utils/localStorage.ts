// src/utils/localstorage.ts


// src/utils/localstorage.ts

// ---------------------------
// Auth Keys
// ---------------------------
export const LS_AUTH_KEY = "auth";

// ---------------------------
// Types
// ---------------------------
export type AuthData = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    // add more fields if needed
  };
};

// Save auth info
export function saveAuth(auth: AuthData) {
  localStorage.setItem(LS_AUTH_KEY, JSON.stringify(auth));
}

// Load auth info
export function loadAuth(): AuthData | null {
  const raw = localStorage.getItem(LS_AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthData;
  } catch {
    return null;
  }
}

// Remove auth info (logout)
export function clearAuth() {
  localStorage.removeItem(LS_AUTH_KEY);
}

// Get token only
export function getToken(): string | null {
  const auth = loadAuth();
  return auth?.token || null;
}

// ---------------------------
// Types
// ---------------------------
export type GuideBlock = {
  id: string;
  title: string;
  category: "VA" | "Editor";
  level: "Beginner" | "Advanced";
  roleOverview: string;
  clientAcquisition: string[];
  pricingPackages: string[];
  toolsTemplates: string[];
  serviceStandards: string[];
  quickWins: string[];
  aiAutomationTips: string[];
};

// ---------------------------
// LocalStorage Key
// ---------------------------
export const LS_KEY = "smartGuides";

// ---------------------------
// Seed Data
// ---------------------------
export const seedGuides: GuideBlock[] = [
  {
    id: "va-beginner",
    title: "SmartGuide™ – Beginner Virtual Assistant (VA)",
    category: "VA",
    level: "Beginner",
    roleOverview: "Intro to VA work, basic admin tasks, communication support, and simple online tools.",
    clientAcquisition: [
      "Target LinkedIn, Workason, and beginner-friendly job boards (e.g., Fiverr, Upwork).",
      "Send 5–10 personalised proposals daily.",
      "Join 3 Facebook/LinkedIn groups for VA opportunities.",
    ],
    pricingPackages: [
      "Start low to build a portfolio (e.g., £5–$10/hour or ₦5,000–₦8,000/hour).",
      "Offer fixed packages (10 hours/month basic admin support).",
    ],
    toolsTemplates: ["Google Workspace, Zoom, Canva.", "Starter templates: task tracker, basic invoice."],
    serviceStandards: ["Respond within 24 hours.", "Send weekly progress updates."],
    quickWins: [
      "Create a SmartCV.",
      "Offer the first client a discount in exchange for a testimonial.",
      "Use AI to help draft emails quickly.",
    ],
    aiAutomationTips: ["Use ChatGPT for drafting responses.", "Automate scheduling with Calendly."],
  },
  {
    id: "va-advanced",
    title: "SmartGuide™ – Advanced Virtual Assistant (VA)",
    category: "VA",
    level: "Advanced",
    roleOverview: "Experienced VA handling complex tasks: project management, CRM, advanced research, and automation.",
    clientAcquisition: [
      "Target high-paying clients on LinkedIn, via cold outreach, and premium platforms.",
      "Leverage referrals and testimonials from past work.",
    ],
    pricingPackages: ["$20–$40/hour (₦15,000–₦25,000/hour).", "Offer premium retainers (40+ hours/month)."],
    toolsTemplates: [
      "Asana, Notion, Zapier integrations, and advanced Canva branding kits.",
      "Templates: client onboarding forms, SOP guides, multi-project trackers.",
    ],
    serviceStandards: ["4–6 hour response time.", "Deliver work ahead of deadlines."],
    quickWins: ["Run a LinkedIn content series sharing VA tips.", "Create a portfolio page with client results."],
    aiAutomationTips: ["Use AI for summarising client meetings.", "Automate recurring workflows in Zapier or Make."],
  },
  {
    id: "editor-beginner",
    title: "SmartGuide™ – Beginner Editor",
    category: "Editor",
    level: "Beginner",
    roleOverview: "Focus on proofreading and basic grammar correction for small businesses and individuals.",
    clientAcquisition: [
      "Target LinkedIn, Workason, student networks.",
      "Offer free sample edits (up to 500 words) to attract first clients.",
    ],
    pricingPackages: ["$5–$10 per 1,000 words (₦5,000–₦8,000).", "Bundle: edit + basic formatting."],
    toolsTemplates: ["Grammarly, Google Docs.", "Style guide checklist (APA, Chicago)."],
    serviceStandards: ["24–48 hour turnaround for small jobs.", "One free revision included."],
    quickWins: [
      "Create portfolio samples by editing public domain texts.",
      "Join writing communities for potential clients.",
    ],
    aiAutomationTips: ["Use AI grammar checks as a second layer after manual editing."],
  },
  {
    id: "editor-advanced",
    title: "SmartGuide™ – Advanced Editor",
    category: "Editor",
    level: "Advanced",
    roleOverview: "A freelancer already established on Workason, aiming to scale, increase rates, and win premium clients.",
    clientAcquisition: ["Leverage AI Matching for high-value leads.", "Pitch to repeat clients for long-term contracts."],
    pricingPackages: [
      "Increase rates by 20–50% based on portfolio strength.",
      "Offer VIP packages (priority delivery, extra revisions, monthly retainers).",
    ],
    toolsTemplates: ["CRM integration to track clients.", "Personalised proposal templates for faster pitching."],
    serviceStandards: ["2–4 hour response time.", "Deliver work 1–2 days ahead of deadline."],
    quickWins: [],
    aiAutomationTips: [],
  },
];

// ---------------------------
// Helpers
// ---------------------------
export function loadGuides(): GuideBlock[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GuideBlock[];
  } catch {
    return [];
  }
}

export function saveGuides(guides: GuideBlock[]): void {
  localStorage.setItem(LS_KEY, JSON.stringify(guides));
}

export function seedGuidesIfEmpty(): void {
  const existing = loadGuides();
  if (existing.length === 0) {
    saveGuides(seedGuides);
  }
}
