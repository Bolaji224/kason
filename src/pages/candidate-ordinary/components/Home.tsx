import {
  Users, FileText, Send, Briefcase, CheckCircle2, PoundSterling,
  Check, X, ChevronRight, Target, LucideIcon,
} from "lucide-react";
import ordinary from "../../../images/workason/ordinary.jpg";
import { useNavigate } from "react-router-dom";
import { useCMS } from "../../../hooks/useCMS";
import { safeJsonArray } from "../../../utils/cmsUtils";

interface Step {
  label: string;
}

const STEP_ICONS: LucideIcon[] = [Users, FileText, Send, Briefcase, CheckCircle2, PoundSterling];

const DEFAULT_STEPS: Step[] = [
  { label: 'Create a profile' },
  { label: 'Access open job listings' },
  { label: 'Submit proposals' },
  { label: 'Get hired by clients' },
  { label: 'Complete work' },
  { label: 'Get paid securely' },
];

const DEFAULT_INCLUDED = [
  'Access to open job listings on the marketplace',
  'Ability to submit proposals to clients',
  'Smart CV tools to improve profile presentation',
  'Secure escrow payments',
  'Freedom to work with multiple clients',
  'Fully flexible, self-managed work',
];

const DEFAULT_NOT_INCLUDED = [
  'No SmartStart onboarding',
  'No SkillStamps™ badge on smart CV',
  'No access to the Talent Vault',
  'No priority visibility',
  'No AI-assisted suitability or readiness tools',
  'No training or onboarding support',
];

const OrdinaryFreelancers = () => {
  const navigate = useNavigate();
  const { freelancersOrdinary } = useCMS();

  const steps       = safeJsonArray<Step>(freelancersOrdinary.fl_ord_steps_json, DEFAULT_STEPS);
  const included    = safeJsonArray<string>(freelancersOrdinary.fl_ord_included_json, DEFAULT_INCLUDED);
  const notIncluded = safeJsonArray<string>(freelancersOrdinary.fl_ord_not_included_json, DEFAULT_NOT_INCLUDED);

  return (
    <div className="dark min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm font-medium">{freelancersOrdinary.fl_ord_badge}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                {freelancersOrdinary.fl_ord_heading}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                {freelancersOrdinary.fl_ord_description}
              </p>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/30">
                <img src={ordinary} alt="Professional freelancer" className="w-full h-auto object-cover aspect-square" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-2xl blur-xl" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            {freelancersOrdinary.fl_ord_how_heading}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];
              return (
                <div key={index} className="relative group">
                  <div className="p-5 bg-card/50 border border-border/50 hover:border-accent/30 transition-all duration-300 h-full rounded-xl">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground font-medium">{step.label}</span>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Get & Not Included */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-accent/5 border border-accent/20 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-accent" />
              </div>
              {freelancersOrdinary.fl_ord_included_heading}
            </h3>
            <ul className="space-y-4">
              {included.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 bg-card/50 border border-border/50 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <X className="w-5 h-5 text-muted-foreground" />
              </div>
              {freelancersOrdinary.fl_ord_not_included_heading}
            </h3>
            <ul className="space-y-4">
              {notIncluded.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground/50 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="p-8 bg-card/50 border border-border/50 rounded-xl inline-block">
            <div className="flex items-start gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Best for</h3>
                <p className="text-muted-foreground leading-relaxed">{freelancersOrdinary.fl_ord_best_for}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate(freelancersOrdinary.fl_ord_cta_url)}
            className="bg-[#2AA100] text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            {freelancersOrdinary.fl_ord_cta_button}
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrdinaryFreelancers;
