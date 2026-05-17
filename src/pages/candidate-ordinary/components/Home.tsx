import {
  Users,
  FileText,
  Send,
  Briefcase,
  CheckCircle2,
  DollarSign,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  PoundSterling ,
  Target,
} from "lucide-react";
import ordinary from "../../../images/workason/ordinary.jpg";
import { useNavigate } from "react-router-dom";

const OrdinaryFreelancers = () => {
  const howItWorks = [
    { icon: Users, label: "Create a profile" },
    { icon: FileText, label: "Access open job listings" },
    { icon: Send, label: "Submit proposals" },
    { icon: Briefcase, label: "Get hired by clients" },
    { icon: CheckCircle2, label: "Complete work" },
    { icon: PoundSterling, label: "Get paid securely" },
  ];
  const navigate = useNavigate();

  const included = [
    "Access to open job listings on the marketplace",
    "Ability to submit proposals to clients",
    "Smart CV tools to improve profile presentation",
    "Secure escrow payments",
    "Freedom to work with multiple clients",
    "Fully flexible, self-managed work",
  ];

  const notIncluded = [
    "No SmartStart onboarding",
    "No SkillStamps™ badge on smart CV",
    "No access to the Talent Vault",
    "No priority visibility",
    "No AI-assisted suitability or readiness tools",
    "No training or onboarding support",
  ];

  const importantNotes = [
    "Work is not guaranteed",
    "Clients choose freely from multiple applicants",
    "You compete with other freelancers",
    "No quality checks are required at entry",
    "Visibility depends on profile strength and proposals",
  ];

  return (
    <div className="dark min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm font-medium">
                  Open Marketplace Path
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                Ordinary Freelancers
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Join Workason as an Ordinary Freelancer and access open job
                opportunities on the marketplace. This path provides flexibility
                and open access to jobs, allowing clients to choose freelancers
                based on their profiles and proposals  without verification or
                guaranteed outcomes.
              </p>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/30">
                <img
                  src={ordinary}
                  alt="Professional freelancer"
                  className="w-full h-auto object-cover aspect-square"
                />
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
            How it works
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                <div className="p-5 bg-card/50 border border-border/50 hover:border-accent/30 transition-all duration-300 h-full rounded-xl">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <step.icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
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

      {/* What You Get & What's Not Included */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-accent/5 border border-accent/20 rounded-xl">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-accent" />
              </div>
              What you get
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
              What is NOT included
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
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Best for
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Freelancers who want open access and flexibility, are
                  comfortable competing for jobs, and prefer to manage their
                  work independently without additional verification or
                  onboarding.
                </p>
              </div>
            </div>
          </div>

          <button
              onClick={() => navigate("/login")}
              className="bg-[#2AA100] text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
            Join as an Ordinary Freelancer
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrdinaryFreelancers;
