import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// =========================
// Types
// =========================
type FAQItem = {
  id: string;
  category: string;
  question: string;
  answer: string | JSX.Element;
};

type OpenItemsState = Record<string, boolean>;

// =========================
// Component
// =========================
const WeWorkPerHourFAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<OpenItemsState>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqData: FAQItem[] = [
    {
      id: "categories",
      category: "User Categories",
      question: "How many categories of users do we have?",
      answer: (
        <div>
          <p className="mb-3">Workason actually has three user categories:</p>
          <div className="space-y-2">
            <div>
              <strong>1. Ordinary Users</strong> → Clients post jobs, freelancers
              apply, and both manage projects directly.
            </div>
            <div>
              <strong>2. SmartStart Users</strong> → Clients request pre-vetted
              freelancers (via SmartStart). WeWorkPerHour matches them with
              verified talent.
            </div>
            <div>
              <strong>3. Pro Talent Pool Users</strong> → Instead of freelancers,
              WeWorkPerHour's in-house team (Editors or VAs) delivers the job from
              start to finish, with full project management.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "what-is",
      category: "General",
      question: "What is Workason?",
      answer:
        "Workason is a UK/Nigerian-based freelance and outsourcing platform connecting clients with verified freelancers, pre-vetted talent, or our in-house managed team.",
    },
    {
      id: "who-can-use",
      category: "General",
      question: "Who can use Workason?",
      answer:
        "Clients (businesses, startups, individuals) and Freelancers (Creatives, VA’s, and Editors).",
    },
    {
      id: "ordinary-how",
      category: "Ordinary Users (Client ↔ Freelancer Direct)",
      question: "How does the Ordinary User option work?",
      answer:
        "Clients post jobs, freelancers apply, and both parties agree on terms. Payments are secured through our ProofToPay escrow system.",
    },
    {
      id: "freelancer-pay",
      category: "Ordinary Users (Client ↔ Freelancer Direct)",
      question: "Do freelancers pay to join?",
      answer:
        "No. Freelancers can create a free profile or join as a SmartStart user.",
    },
    {
      id: "ordinary-management",
      category: "Ordinary Users (Client ↔ Freelancer Direct)",
      question: "Who manages the project?",
      answer:
        "The client and freelancer manage communication, delivery, and revisions directly.",
    },
    {
      id: "what-smartstart",
      category: "SmartStart Users (Verified Freelancer Matching)",
      question: "What is SmartStart™?",
      answer:
        "SmartStart™ is our curated matching service. Clients tell us their needs, and we match them with verified, pre-vetted freelancers from our talent pool.",
    },
    {
      id: "smartstart-cost",
      category: "SmartStart Users (Verified Freelancer Matching)",
      question: "How much does SmartStart™ cost?",
      answer:
        "SmartStart™ has a one-time fee. Click the SmartStart page to view the current price.",
    },
    {
      id: "smartstart-management",
      category: "SmartStart Users (Verified Freelancer Matching)",
      question: "Who manages the work?",
      answer:
        "The client works directly with the freelancer but benefits from Workason's vetting, SmartStart pack, and ProofToPay protection.",
    },
    {
      id: "managed-service",
      category: "Pro Talent Pool Users",
      question: "Who manages the project?",
      answer:
        "Workason fully manages communication, deadlines, and quality control.",
    },
    {
      id: "managed-services-covered",
      category: "Pro Talent Pool Users",
      question: "What services are covered under Managed?",
      answer:
        "Video editing, social media management, admin/VA support, and other creative tasks.",
    },
    {
      id: "managed-pricing",
      category: "Pro Talent Pool Users",
      question: "How is pricing set?",
      answer:
        "Pricing is based on service packages (e.g., monthly editing retainers, VA support bundles). Clients pay WeWorkPerHour directly, and our internal team handles the job.",
    },
    {
      id: "managed-management",
      category: "Pro Talent Pool Users",
      question: "Who manages the project?",
      answer:
        "WeWorkPerHour fully manages communication, deadlines, and quality control.",
    },
    {
      id: "payments-handled",
      category: "Payments & Security",
      question: "How are payments handled?",
      answer:
        "For our escrow users, all payments go through ProofToPay, our secure escrow system.Funds are only released once work is approved.",
    },
    {
      id: "client-fees",
      category: "Payments & Security",
      question: "Are there fees for clients?",
      answer:
        "No signup fee. Clients only pay per project, SmartStart request, or Managed Service package.",
    },
    {
      id: "freelancer-fees",
      category: "Payments & Security",
      question: "Are there fees for freelancers?",
      answer:
        "Freelancers pay a commission per job (depending on size). Optional premium features are available.",
    },
    {
      id: "refunds",
      category: "Other Common Questions",
      question: "Can I get a refund?",
      answer:
        "Refunds are available if work is not delivered or quality disputes are upheld through ProofToPay arbitration.",
    },
    {
      id: "skillstamp",
      category: "Other Common Questions",
      question: "How do I get SkillStamp verification?",
      answer:
        "Freelancers take the SkillStamp test to get the badge. Students who purchase a Workason course get all the benefits of the SmartStart.",
    },
    {
      id: "international",
      category: "Other Common Questions",
      question: "Can international clients use WeWorkPerHour?",
      answer:
        "Yes, we support clients and freelancers in Nigeria, the UK, and globally.",
    },

    {
      id: "skillstamp",
      category: "Other Common Questions",
      question: "How do I get SkillStamp verification?",
      answer:
        "Yes, we support clients and freelancers in Nigeria, the UK, and globally.",
    },
  ];

  // Group FAQ items by category
  const groupedFAQ = faqData.reduce<Record<string, FAQItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white mt-12">
      <div className="mb-8">
        <h2 className="text-xl text-gray-600">
          Frequently Asked Questions (FAQ)
        </h2>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedFAQ).map(([categoryName, items]) => (
          <div key={categoryName} className="border-b border-gray-200 pb-6">
            <h3
              className="text-lg font-semibold mb-4 border-l-4 pl-3"
              style={{ color: "#2AA100", borderColor: "#2AA100" }}
            >
              {categoryName}
            </h3>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-800 pr-4">
                      {item.question}
                    </span>
                    {openItems[item.id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>

                  {openItems[item.id] && (
                    <div className="px-4 py-3 bg-white border-t border-gray-200">
                      <div className="text-gray-700 leading-relaxed">
                        {typeof item.answer === "string" ? (
                          <p>{item.answer}</p>
                        ) : (
                          item.answer
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Have more questions? Contact our support team for assistance.</p>
      </div>
    </div>
  );
};

export default WeWorkPerHourFAQ;
