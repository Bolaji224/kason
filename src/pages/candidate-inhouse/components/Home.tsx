import React, { useState, useEffect } from 'react';
import {
  Shield, Users, ChevronRight, Sparkles, Check, CheckCircle, RefreshCw, MessageSquare,
  BarChart3, CalendarDays, Layers, Building2, ArrowRight, Video, Headphones, LucideIcon,
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import ls from "localstorage-slim";
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface KeyFeature {
  label: string;
  desc: string;
}

interface HowItWorksStep {
  step: string;
  title: string;
  desc: string;
}

interface Plan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  naira: string;
  tagline: string;
  hours: string;
  items: string[];
}

const FEATURE_ICONS: LucideIcon[] = [Users, Shield, MessageSquare, CheckCircle, CalendarDays];

// Payment amounts stay hardcoded to avoid payment desync if admin edits displayed price
const PAYMENT_KOBO: Record<string, number> = {
  va: 49800000,
  editor: 55800000,
};

const DEFAULT_KEY_FEATURES: KeyFeature[] = [
  { label: 'Dedicated in-house VA or editor', desc: 'A single, consistent professional assigned exclusively to your work.' },
  { label: 'Workason-managed supervision', desc: 'Our team oversees performance, attendance, and output quality daily.' },
  { label: 'Communication via Workason systems only', desc: 'Streamlined, accountable comms — no scattered threads or lost context.' },
  { label: 'Quality control & replacements handled', desc: "Not happy? We replace fast — zero downtime on your end." },
  { label: 'Monthly or project-based plans', desc: 'Choose the engagement model that fits your workflow and budget.' },
];

const DEFAULT_HOW_IT_WORKS: HowItWorksStep[] = [
  { step: '01', title: 'Tell us what you need', desc: 'Share your role requirements, preferred skills, and working hours.' },
  { step: '02', title: 'We match & assign', desc: 'Workason selects from our vetted pool and assigns your dedicated talent.' },
  { step: '03', title: 'We supervise daily', desc: 'Our managers handle check-ins, KPIs, and performance reviews for you.' },
  { step: '04', title: 'You focus on growth', desc: 'Receive work outputs and reports — zero people management required.' },
];

const DEFAULT_WHAT_YOU_GET = [
  'Dedicated VA or editor assigned to you',
  'Full supervision by Workason management',
  'All communications through official Workason channels',
  'Weekly performance reports delivered to you',
  'Quality control enforced at every stage',
  'Instant replacements if issues arise',
  'Monthly or project-based billing flexibility',
  'Zero people management required from you',
];

const DEFAULT_PLANS: Plan[] = [
  {
    id: 'va',
    title: 'VA Services',
    subtitle: 'Virtual Assistant · Managed',
    price: '249',
    naira: '498,000',
    tagline: 'Delegate with confidence. Your assistant is supervised, accountable, and ready to work.',
    hours: '20–25 hours/month',
    items: ['Email management', 'Calendar scheduling', 'Admin support', 'Customer support', 'Basic research', 'Light social media posting'],
  },
  {
    id: 'editor',
    title: 'Video Editor',
    subtitle: 'Content Editor · Managed',
    price: '279',
    naira: '558,000',
    tagline: 'Consistent, high-quality content without delays or back-and-forth stress.',
    hours: '12–16 short-form videos/month',
    items: ['Cuts, transitions & captions', 'Basic motion graphics', 'Formatting for Reels, TikTok & Shorts', 'Each video up to 60–90 seconds', 'Fully managed by Workason'],
  },
];

const PLAN_ICONS: LucideIcon[] = [Headphones, Video];

export default function ManagedServicesPage() {
  const [activePlan, setActivePlan] = useState('monthly');
  const navigate = useNavigate();
  const { freelancersInHouse } = useCMS();

  const keyFeatures = safeJsonArray<KeyFeature>(freelancersInHouse.fl_ih_features_json, DEFAULT_KEY_FEATURES);
  const howItWorks  = safeJsonArray<HowItWorksStep>(freelancersInHouse.fl_ih_steps_json, DEFAULT_HOW_IT_WORKS);
  const whatYouGet  = safeJsonArray<string>(freelancersInHouse.fl_ih_what_you_get_json, DEFAULT_WHAT_YOU_GET);
  const plans       = safeJsonArray<Plan>(freelancersInHouse.fl_ih_plans_json, DEFAULT_PLANS);

  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY!;
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [guestEmail,   setGuestEmail]   = useState('');
  const [emailInput,   setEmailInput]   = useState('');
  const [emailModal,   setEmailModal]   = useState(false);
  const [payRef,       setPayRef]       = useState(`inhouse_${Date.now()}`);
  const [readyToPay,   setReadyToPay]   = useState(false);

  const planId  = plans[selectedPlan]?.id ?? 'va';
  const koboAmt = PAYMENT_KOBO[planId] ?? 49800000;

  const initPayment = usePaystackPayment({
    reference: payRef,
    email: guestEmail,
    amount: koboAmt,
    publicKey,
    currency: 'NGN',
  });

  useEffect(() => {
    if (!readyToPay || !guestEmail) return;
    setReadyToPay(false);
    try {
      (initPayment as any)({
        onSuccess: (_ref: any) => {
          alert(`Payment successful! Your ${plans[selectedPlan]?.title ?? ''} plan is now active.`);
        },
        onClose: () => {},
      });
    } catch (err) {
      console.error('Payment error:', err);
      alert('Could not open payment. Please refresh and try again.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToPay, guestEmail]);

  const handleGetStarted = (i: number) => {
    setSelectedPlan(i);
    setPayRef(`inhouse_${plans[i]?.id ?? i}_${Date.now()}`);
    const stored = localStorage.getItem('email') ||
      (ls.get('wwph_usr', { decrypt: true }) as any)?.email || '';
    if (stored) {
      setGuestEmail(stored);
      setReadyToPay(true);
    } else {
      setEmailInput('');
      setEmailModal(true);
    }
  };

  const handleEmailConfirm = () => {
    const trimmed = emailInput.trim();
    if (!trimmed || !trimmed.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setGuestEmail(trimmed);
    setEmailModal(false);
    setReadyToPay(true);
  };

  return (
    <div className="dark min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative px-6 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#2AA100]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AA100]/10 border border-[#2AA100]/30">
              <Building2 className="w-4 h-4 text-[#2AA100]" />
              <span className="text-[#2AA100] text-sm font-medium">{freelancersInHouse.fl_ih_badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {freelancersInHouse.fl_ih_heading}{' '}
              <span className="text-[#2AA100]">{freelancersInHouse.fl_ih_heading_highlight}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {freelancersInHouse.fl_ih_description}
            </p>

            <div className="space-y-3 pt-2">
              <p className="text-sm font-semibold text-[#2AA100] uppercase tracking-wide">
                {freelancersInHouse.fl_ih_plan_label}
              </p>
              <div className="flex gap-3">
                {(['monthly', 'project'] as const).map((plan) => (
                  <button
                    key={plan}
                    onClick={() => navigate('/login')}
                    className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all ${
                      activePlan === plan
                        ? 'bg-[#2AA100] text-black'
                        : 'bg-card border border-border hover:border-[#2AA100]/50 text-foreground'
                    }`}
                  >
                    {plan === 'monthly' ? freelancersInHouse.fl_ih_plan_monthly : freelancersInHouse.fl_ih_plan_project}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => navigate(freelancersInHouse.fl_ih_button_url)}
                className="bg-[#2AA100] text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                {freelancersInHouse.fl_ih_button}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#2AA100]/5 border border-[#2AA100]/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Best for:</span>{' '}
                {freelancersInHouse.fl_ih_best_for}
              </p>
            </div>
          </div>

          {/* Right: Visual card stack */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[#2AA100]/10 rounded-3xl blur-2xl" />
            <div className="relative w-full max-w-sm space-y-3">
              <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2AA100]/10 border border-[#2AA100]/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#2AA100]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Your Managed Team</p>
                      <p className="text-xs text-muted-foreground">Supervised by Workason</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-[#2AA100] bg-[#2AA100]/10 border border-[#2AA100]/20 px-2.5 py-1 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2AA100] animate-pulse" />
                    Active
                  </span>
                </div>
                {[
                  { name: 'Amara T.', role: 'Executive VA', score: 97, status: 'On task' },
                  { name: 'Kelechi O.', role: 'Content Editor', score: 92, status: 'In review' },
                ].map((member) => (
                  <div key={member.name} className="flex items-center justify-between py-3 border-t border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-accent">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground bg-card border border-border px-2 py-0.5 rounded-full">{member.status}</span>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Score</p>
                        <p className="text-sm font-bold text-accent">{member.score}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-4 shadow-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Replacement Guarantee</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Instant swap if performance drops — zero downtime.</p>
                </div>
                <CheckCircle className="w-5 h-5 text-[#2AA100] flex-shrink-0" />
              </div>
              <div className="bg-card border border-border/60 rounded-xl p-4 shadow-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2AA100]/10 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-[#2AA100]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Weekly Progress Reports</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Delivered to your inbox, curated by your account manager.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">{freelancersInHouse.fl_ih_features_heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFeatures.map((feature, index) => {
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
              return (
                <div key={index} className="p-5 bg-card/50 border border-border/50 hover:border-[#2AA100]/30 transition-all rounded-xl group">
                  <div className="flex flex-col space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#2AA100]/10 flex items-center justify-center group-hover:bg-[#2AA100]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#2AA100]" />
                    </div>
                    <p className="font-semibold text-foreground text-sm">{feature.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{freelancersInHouse.fl_ih_how_heading}</h2>
          <p className="text-muted-foreground mb-10 max-w-xl">{freelancersInHouse.fl_ih_how_subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative p-5 bg-card/50 border border-border/50 rounded-xl hover:border-accent/30 transition-all group">
                <span className="text-4xl font-black text-border/60 group-hover:text-accent/20 transition-colors leading-none block mb-3">
                  {item.step}
                </span>
                <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 bg-[#2AA100]/5 border border-[#2AA100]/20 rounded-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#2AA100]" />
              {freelancersInHouse.fl_ih_what_you_get_heading}
            </h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {whatYouGet.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <Check className="w-5 h-5 text-[#2AA100] flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="px-6 py-20 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AA100]/10 border border-[#2AA100]/30 mb-4">
              <Sparkles className="w-4 h-4 text-[#2AA100]" />
              <span className="text-[#2AA100] text-sm font-medium">{freelancersInHouse.fl_ih_pricing_badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {freelancersInHouse.fl_ih_pricing_heading}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {freelancersInHouse.fl_ih_pricing_description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, i) => {
              const Icon = PLAN_ICONS[i % PLAN_ICONS.length];
              return (
                <div key={plan.id ?? i} className="bg-card border border-border/60 rounded-2xl p-7 flex flex-col hover:border-[#2AA100]/40 transition-all shadow-sm hover:shadow-lg">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#2AA100]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#2AA100]" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-lg leading-tight">{plan.title}</p>
                        <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-foreground">£{plan.price}</p>
                      <p className="text-xs text-muted-foreground">/month</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#2AA100] bg-[#2AA100]/10 border border-[#2AA100]/20 rounded-lg px-3 py-1.5 mb-4 inline-block w-fit">
                    ≈ ₦{plan.naira}/month
                  </p>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{plan.tagline}</p>

                  <div className="flex items-center gap-2 mb-5">
                    <CalendarDays className="w-4 h-4 text-[#2AA100]" />
                    <span className="text-sm font-medium text-foreground">{plan.hours}</span>
                  </div>

                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Includes:</p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {(plan.items ?? []).map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-[#2AA100] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleGetStarted(i)}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm bg-[#2AA100] text-black hover:bg-[#228a00] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Get Started · £{plan.price}/month
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2AA100]/10 border border-[#2AA100]/30 mb-2">
            <Layers className="w-4 h-4 text-[#2AA100]" />
            <span className="text-[#2AA100] text-sm font-medium">{freelancersInHouse.fl_ih_cta_badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{freelancersInHouse.fl_ih_cta_heading}</h2>
          <p className="text-lg text-muted-foreground">{freelancersInHouse.fl_ih_cta_description}</p>
          <button
            onClick={() => navigate(freelancersInHouse.fl_ih_cta_url)}
            className="bg-[#2AA100] text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
          >
            {freelancersInHouse.fl_ih_cta_button}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Email Modal ── */}
      {emailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {plans[selectedPlan]?.title ?? ''}
              <span className="text-[#2AA100]"> · £{plans[selectedPlan]?.price ?? ''}/month</span>
            </h3>
            <p className="text-sm text-gray-500 mb-5">Enter your email to proceed to payment. No account needed.</p>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEmailConfirm()}
              placeholder="you@example.com"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2AA100] focus:outline-none transition-colors mb-4"
              autoFocus
            />
            <button
              onClick={handleEmailConfirm}
              className="w-full py-3 rounded-xl bg-[#2AA100] text-black font-semibold text-sm hover:bg-[#228a00] transition-all mb-2"
            >
              Continue to Payment
            </button>
            <button
              onClick={() => setEmailModal(false)}
              className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
