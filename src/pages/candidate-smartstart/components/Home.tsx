import {
  Award,
  BookOpen,
  FileCheck,
  BadgeCheck,
  Users,
  Sparkles,
  Check,
  ChevronRight,
  Briefcase,
  PoundSterling,
} from "lucide-react";
import darian from "../../../images/workason/darian.jpg";
import { useNavigate } from "react-router-dom";

const SmartStartTalents = () => {
  const navigate = useNavigate();

  const howItWorks = [
    { icon: BookOpen, label: "Complete SmartStart onboarding" },
    { icon: FileCheck, label: "Complete preparation tools" },
    { icon: BadgeCheck, label: "Achieve SmartStart status" },
    { icon: Users, label: "Appear across Workason opportunities" },
    { icon: Briefcase, label: "Work with clients when selected" },
    { icon: PoundSterling, label: "Get paid securely" },
  ];

  // Combine both included arrays
  const included = [
    "Structured SmartStart™ onboarding and readiness process",
    "Access to SmartGuide™ (work standards, expectations, and best practices)",
    "Smart CV tools to improve professional presentation",
    "SkillStamp™ verification (role-based, where applicable)",
    "Optional courses and learning resources",
    "AI-assisted features that support visibility and suitability",
    "Eligibility to be featured within Workason listings, including the Talent Vault",
    "Access to open job listings on the marketplace",
    "Ability to submit proposals to clients",
    "Smart CV tools to improve profile presentation",
    "Secure escrow payments",
    "Freedom to work with multiple clients",
    "Fully flexible, self-managed work",
  ];

  const importantNotes = [
    "Work is not guaranteed",
    "SmartStart™ is an onboarding and preparation programme, not a placement service",
    "Completion of SmartStart™ does not guarantee selection by clients",
    "Clients make final hiring decisions",
    "Opportunities depend on demand and suitability",
    "SmartStart™ standards must be maintained",
  ];

  return (
    <div className="dark min-h-screen bg-background">
      {/* Hero */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">
                Verified & Prepared Path
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              SmartStart Talents
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Join Workason as a SmartStart™ Talent and complete a structured
              onboarding process designed to prepare you for professional work
              on the platform.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border/30">
              <img
                src={darian}
                alt="SmartStart Talent professional"
                className="w-full h-auto object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">How it works</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                <div className="p-5 bg-card/50 border border-border/50 hover:border-accent/30 transition-all h-full rounded-xl">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {step.label}
                    </span>
                  </div>
                </div>

                {index < howItWorks.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 bg-accent/5 border border-accent/20 rounded-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              What you get through SmartStart™
            </h3>

            <ul className="grid md:grid-cols-2 gap-4">
              {included.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <Check className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-border/50 text-center">
        <button
          onClick={() => navigate("/login")}
          className="bg-[#2AA100] text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Apply for SmartStart
        </button>
      </section>
    </div>
  );
};

export default SmartStartTalents;