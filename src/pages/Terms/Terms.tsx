import { useState } from "react";
import FooterSection from "../../components/reusable/FooterSection";

const sections = [
  {
    id: 1,
    title: "Eligibility",
    icon: "👤",
    content: [
      "You must be at least 18 years old to use Workason.",
      "By registering, you confirm the accuracy of the information provided.",
      "We reserve the right to suspend or terminate accounts that violate these terms.",
    ],
  },
  {
    id: 2,
    title: "Our Services",
    icon: "🛠️",
    content: [
      "Workason is an online platform that connects clients (individuals/businesses seeking services) with freelancers (individuals offering services).",
      "We provide additional features such as SkillStamps™, verification, SmartStart, SmartGuide, AI Matching, Courses, and Secure Payments.",
    ],
  },
  {
    id: 3,
    title: "Client Responsibilities",
    icon: "💼",
    content: [
      "Clients are responsible for clearly posting job requirements, deadlines, and budgets.",
      "Payment for services must be made through the Workason platform only.",
      "Clients may not solicit freelancers for work outside the platform without written permission.",
    ],
  },
  {
    id: 4,
    title: "Freelancer Responsibilities",
    icon: "🧑‍💻",
    content: [
      "Freelancers agree to deliver work professionally, on time, and as agreed with the client.",
      "Freelancers must maintain honesty about their skills and qualifications.",
      "Freelancers may not accept payments outside the platform unless approved by Workason.",
    ],
  },
  {
    id: 5,
    title: "Payments & Fees",
    icon: "💳",
    content: [
      "Clients: Payment is required before project commencement and is held securely in ProofToPay Escrow until job completion.",
      "Freelancers: Payouts are released once the client confirms satisfactory completion of the job.",
      "Workason charges service fees on transactions (e.g., commissions, SkillStamps™, SmartStart, etc. – see Pricing Policy).",
      "Freelancers are responsible for applicable taxes in their country of residence.",
    ],
  },
  {
    id: 6,
    title: "Dispute Resolution",
    icon: "⚖️",
    content: [
      "In case of disputes, both parties agree to first attempt resolution through our internal Dispute Resolution Team.",
      "If unresolved, Workason reserves the right to make the final decision regarding payment release.",
    ],
  },
  {
    id: 7,
    title: "Skill Verification (SkillStamp™)",
    icon: "🏅",
    content: [
      "Freelancers may apply for SkillStamps™ badges by passing assessments.",
      "False information, cheating, or misrepresentation will lead to badge removal and possible account termination.",
    ],
  },
  {
    id: 8,
    title: "Intellectual Property",
    icon: "©️",
    content: [
      "Unless otherwise agreed, clients own the final deliverables once payment is made.",
      "Freelancers retain the right to showcase work in their portfolio, unless the client requests confidentiality.",
    ],
  },
  {
    id: 9,
    title: "Prohibited Activities",
    icon: "🚫",
    listPrefix: "Users agree not to:",
    isList: true,
    content: [
      "Post illegal, harmful, or fraudulent jobs.",
      "Harass, discriminate, or exploit others on the platform.",
      "Circumvent the platform to avoid paying service fees.",
    ],
  },
  {
    id: 10,
    title: "Termination of Account",
    icon: "❌",
    listPrefix: "Workason reserves the right to suspend or terminate accounts for:",
    isList: true,
    content: [
      "Breach of these terms.",
      "Fraudulent activity.",
      "Abuse of the platform or users.",
    ],
  },
  {
    id: 11,
    title: "Liability",
    icon: "🛡️",
    content: [
      "Workason is not responsible for the quality of work delivered or the outcome of client projects.",
      "Our role is limited to providing a platform and managing payments.",
      "We are not liable for any indirect, incidental, or consequential damages.",
    ],
  },
  {
    id: 12,
    title: "Privacy",
    icon: "🔒",
    content: [
      "We respect your privacy. Please see our Privacy Policy for details on how we collect, store, and use personal data.",
    ],
  },
  {
    id: 13,
    title: "Amendments",
    icon: "📝",
    content: [
      "We may update these Terms & Conditions from time to time.",
      "Continued use of the platform after updates means you accept the changes.",
    ],
  },
  {
    id: 14,
    title: "Governing Law",
    icon: "🌍",
    content: [
      "These terms are governed by the laws of the United Kingdom (for UK users) and Nigeria (for Nigerian users).",
    ],
  },
  {
    id: 15,
    title: "Cookies Policy",
    icon: "🍪",
    content: [
      "We value your privacy. Workason uses cookies to enhance your browsing experience, serve personalised content, and analyse our traffic.",
      "By clicking 'Accept', you consent to our use of cookies in accordance with our Cookies Policy.",
      "You may choose to decline non-essential cookies; however, some features of the platform may not function as intended.",
      "We use strictly necessary cookies (for platform functionality), analytical cookies (to understand how users interact with the platform), and preference cookies (to remember your settings).",
      "You can manage or withdraw your consent at any time through your browser settings or the cookie preferences panel on our website.",
    ],
  },
];

export default function WorkasonTerms() {
  const [openSections, setOpenSections] = useState(new Set([1]));
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredToc, setHoveredToc] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenSections(new Set(sections.map((s) => s.id)));
  const collapseAll = () => setOpenSections(new Set());

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#f9f7f4", minHeight: "100vh", color: "#1a1a2e" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }

        .terms-hero {
          background: linear-gradient(160deg, #023020 0%, #034a30 60%, #012818 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-pattern {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle at 20% 80%, rgba(80,200,120,0.06) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(200,170,80,0.08) 0%, transparent 50%);
        }
        .hero-line {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c8a830, #e8c840, #c8a830, transparent);
        }

        .acc-item {
          background: #fff;
          border: 1px solid #e8e2d8;
          border-radius: 6px;
          margin-bottom: 10px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: box-shadow 0.25s, border-color 0.25s;
          overflow: hidden;
        }
        .acc-item:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-color: #c8a830; }
        .acc-item.open { border-color: #c8a830; box-shadow: 0 4px 16px rgba(200,168,48,0.12); }

        .acc-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 22px; cursor: pointer; user-select: none;
          transition: background 0.2s;
        }
        .acc-header:hover { background: #fdf9f0; }
        .acc-item.open .acc-header { background: #fdf9f0; }

        .acc-num {
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          font-weight: 500; color: #c8a830; letter-spacing: 2px;
          min-width: 28px;
        }
        .acc-icon { font-size: 18px; margin: 0 14px 0 4px; }
        .acc-title {
          font-family: 'Cormorant Garamond', serif; font-size: 18px;
          font-weight: 600; color: #1a1a2e; flex: 1;
        }
        .acc-item.open .acc-title { color: #9a7820; }

        .chevron-icon {
          width: 20px; height: 20px; border-radius: 50%;
          background: #f0e8d0; display: flex; align-items: center;
          justify-content: center; font-size: 10px; color: #c8a830;
          transition: transform 0.3s, background 0.2s;
          flex-shrink: 0;
        }
        .acc-item.open .chevron-icon { transform: rotate(180deg); background: #c8a830; color: #fff; }

        .acc-body {
          padding: 4px 22px 22px 64px;
          font-family: 'DM Sans', sans-serif; font-size: 14.5px;
          line-height: 1.85; color: #4a4560;
          border-top: 1px solid #f0ebe0;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

        .acc-body p { margin-bottom: 10px; }
        .acc-body p:last-child { margin-bottom: 0; }
        .acc-body .prefix { font-style: italic; color: #7a7090; margin-bottom: 12px; }
        .acc-body ul { padding-left: 20px; }
        .acc-body li { margin-bottom: 8px; }
        .acc-body li::marker { color: #c8a830; }

        .toc-link {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px; border-radius: 4px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 13px; color: #6a6080;
          transition: all 0.18s; border-left: 2px solid transparent;
          text-decoration: none;
        }
        .toc-link:hover { background: #f0faf4; color: #023020; border-left-color: #c8a830; }
        .toc-link.active { background: #f0faf4; color: #023020; border-left-color: #c8a830; font-weight: 500; }

        .btn-text {
          background: none; border: 1px solid #d0c8b8; border-radius: 4px;
          padding: 6px 14px; font-family: 'DM Sans', sans-serif;
          font-size: 12px; color: #7a7090; cursor: pointer;
          transition: all 0.2s; letter-spacing: 0.5px;
        }
        .btn-text:hover { background: #f0e8d0; border-color: #c8a830; color: #9a7820; }

        .newsletter {
          background: linear-gradient(135deg, #023020 0%, #034a30 100%);
          border-radius: 10px; padding: 48px 40px; text-align: center;
          position: relative; overflow: hidden; margin-top: 48px;
        }
        .newsletter::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(200,168,48,0.15), transparent 60%);
        }
        .newsletter-gold-line {
          position: absolute; top: 0; left: 10%; right: 10%; height: 2px;
          background: linear-gradient(90deg, transparent, #c8a830, transparent);
        }

        .nl-input {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(200,168,48,0.3);
          border-right: none; border-radius: 4px 0 0 4px; color: #e8e4d8;
          padding: 13px 18px; font-size: 14px; font-family: 'DM Sans', sans-serif;
          outline: none; width: 260px; max-width: 55%;
          transition: border-color 0.2s;
        }
        .nl-input::placeholder { color: rgba(200,190,170,0.4); }
        .nl-input:focus { border-color: rgba(200,168,48,0.7); background: rgba(255,255,255,0.11); }

        .nl-btn {
          background: linear-gradient(135deg, #c8a830, #a88820);
          color: #023020; border: none; padding: 13px 24px;
          font-family: 'DM Sans', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer; border-radius: 0 4px 4px 0;
          transition: opacity 0.2s, transform 0.1s;
        }
        .nl-btn:hover { opacity: 0.88; }
        .nl-btn:active { transform: scale(0.98); }

        .tag {
          display: inline-block; background: rgba(200,168,48,0.12);
          border: 1px solid rgba(200,168,48,0.35); color: #c8a830;
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          padding: 4px 14px; border-radius: 20px;
          font-family: 'DM Sans', sans-serif; margin-bottom: 16px;
        }

        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .main-layout { flex-direction: column !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="terms-hero mt-20">
        <div className="hero-pattern" />
        <div className="hero-line" />
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "72px 32px 56px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div className="tag">Legal Document</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            marginTop: 12,
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 700, lineHeight: 1.05,
            color: "#f5f0e8", marginBottom: 20, letterSpacing: "-0.5px",
          }}>
            Terms &amp; <span style={{ color: "#c8a830", fontStyle: "italic" }}>Conditions</span>
          </h1>
          <div style={{ width: 48, height: 2, background: "linear-gradient(90deg,#c8a830,#e8d060,#c8a830)", margin: "0 auto 20px" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(200,190,170,0.8)", maxWidth: 500, margin: "0 auto 12px", lineHeight: 1.7 }}>
            Welcome to Workason. By using our platform, you agree to the terms below. Please read carefully before proceeding.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(200,190,170,0.4)", letterSpacing: 1.5 }}>
            EFFECTIVE DATE: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()}
          </p>
        </div>
      </div>

      {/* Layout */}
      <div className="main-layout" style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px", display: "flex", gap: 40, alignItems: "flex-start" }}>

        {/* Sidebar TOC */}
        <div className="sidebar" style={{ width: 210, flexShrink: 0, position: "sticky", top: 24 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#b0a090", marginBottom: 14, paddingLeft: 12 }}>On this page</p>
          {sections.map((s) => (
            <a key={s.id} className={`toc-link ${openSections.has(s.id) ? "active" : ""}`}
              onClick={() => { toggle(s.id); setTimeout(() => document.getElementById(`s${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60); }}>
              <span style={{ color: "#c8a830", fontSize: 10, fontWeight: 700, minWidth: 18 }}>{String(s.id).padStart(2, "0")}</span>
              {s.title}
            </a>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Intro banner */}
          <div style={{
            background: "#fff", border: "1px solid #e8e2d8", borderLeft: "4px solid #023020",
            borderRadius: "0 6px 6px 0", padding: "18px 24px", marginBottom: 28,
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#5a5570", lineHeight: 1.8,
          }}>
            <strong style={{ color: "#023020", fontFamily: "'Cormorant Garamond', serif", fontSize: 16 }}>Important Notice:</strong>
            {" "}By accessing or using Workason, you confirm that you are at least 18 years of age and agree to be legally bound by these Terms & Conditions in their entirety.
          </div>

          {/* Controls */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 18 }}>
            <button className="btn-text" onClick={expandAll}>Expand All</button>
            <button className="btn-text" onClick={collapseAll}>Collapse All</button>
          </div>

          {/* Accordion */}
          {sections.map((s) => {
            const isOpen = openSections.has(s.id);
            return (
              <div key={s.id} id={`s${s.id}`} className={`acc-item ${isOpen ? "open" : ""}`}>
                <div className="acc-header" onClick={() => toggle(s.id)}>
                  <span className="acc-num">{String(s.id).padStart(2, "0")}</span>
                  <span className="acc-icon">{s.icon}</span>
                  <span className="acc-title">{s.title}</span>
                  <span className="chevron-icon">▾</span>
                </div>
                {isOpen && (
                  <div className="acc-body">
                    {s.isList ? (
                      <>
                        {s.listPrefix && <p className="prefix">{s.listPrefix}</p>}
                        <ul>
                          {s.content.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </>
                    ) : (
                      s.content.map((item, i) => <p key={i}>{item}</p>)
                    )}
                  </div>
                )}
              </div>
            );
          })}

         

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 36, paddingTop: 24, borderTop: "1px solid #e8e2d8" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#b0a090", lineHeight: 1.8 }}>
              © {new Date().getFullYear()} Workason. All rights reserved.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c8c0b0", marginTop: 4 }}>
              Governed by the laws of the United Kingdom & Nigeria &nbsp;·&nbsp; Questions? Contact our legal team.
            </p>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
    
  );
}