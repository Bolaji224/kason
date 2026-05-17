import React from "react";
import { Users, DollarSign, FileText, Handshake, Scale, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const FreelanceCareerTips: React.FC = () => {
  const careerTips = [
    {
      id: 1,
      title: "How to Land Your First Client",
      content: "Getting your first client is often the hardest step. Start with your inner circle—friends, family, classmates, or colleagues—who might need your skills. Create a sample portfolio, even if it's from personal or practice projects, and share it confidently. Offer a free trial or discounted 'first project' to lower the risk for clients. Once you deliver high-quality work, ask for referrals or testimonials to attract more clients.",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "How to Price Your Services",
      content: "Pricing can make or break your freelance journey. Research industry rates—check Upwork, Fiverr, LinkedIn, or local freelancing communities. If you're new, avoid undervaluing your work; instead, position your pricing around value. For example, instead of charging only for hours, highlight how your service saves time or increases results for the client. Adjust your rates as your portfolio grows and your expertise deepens.",
      icon: DollarSign,
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "How to Write Winning Proposals",
      content: "Clients receive dozens of proposals—yours must stand out. Begin by acknowledging their specific problem. Show that you've read their brief and understand their needs. Keep it short: 3–4 paragraphs max. Focus on the results you'll deliver, not just the tasks. Add a quick, tailored suggestion ('I noticed your social posts don't have captions—here's one way I'd fix it'). Finally, end with a clear next step: 'Shall we schedule a quick call?'",
      icon: FileText,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "How to Build Long-Term Client Relationships",
      content: "One-time projects are good, but recurring clients are gold. To keep clients coming back, communicate clearly, deliver on or before deadlines, and be proactive. For instance, if you're a VA, suggest ways to streamline their workflow. If you're an editor, give creative input beyond what was asked. Always ask for feedback and implement it. Small gestures—like sending a thank-you note after a project—make clients remember you.",
      icon: Handshake,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 5,
      title: "How to Balance Multiple Clients",
      content: "Freelancing can feel overwhelming when juggling different clients. The secret is organization. Use a digital planner (Trello, Asana, or Notion) to track projects and deadlines. Block specific hours for each client to avoid overlap. Be realistic with commitments—don't accept more work than you can handle. And remember: quality is more valuable than quantity. It's better to deliver three excellent projects than five rushed ones.",
      icon: Scale,
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      title: "How to Market Yourself as a Freelancer",
      content: "Clients can't hire you if they don't know you exist. Build visibility by sharing your work on LinkedIn, Instagram, or Twitter. Post before-and-after samples, quick tips in your niche, or client testimonials. Join online communities where potential clients hang out. Networking isn't about spamming—focus on adding value, whether by answering questions or sharing insights. Over time, people will associate your name with expertise, making it easier for clients to come to you.",
      icon: TrendingUp,
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="mt-[8rem] px-[2.5rem] lg:ml-64">
      <div className="max-w-7xl mx-auto">
        {/* Tips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {careerTips.map((tip, index) => (
            <div
              key={tip.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Tip Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${tip.color} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                  <tip.icon size={20} />
                </div>
                <div className="flex-1">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full mb-2">
                    Tip #{tip.id}
                  </span>
                  <h2 className="text-xl font-bold text-gray-800 leading-tight">
                    {tip.title}
                  </h2>
                </div>
              </div>

              {/* Tip Content */}
              <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                {tip.content}
              </p>

              {/* Action Button */}
              <div className="mt-6">
                <button className={`bg-gradient-to-r ${tip.color} text-white font-medium py-2 px-4 rounded-lg text-sm hover:shadow-md transition-all duration-200 transform hover:scale-105`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Level Up Your Freelance Game?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            These tips are just the beginning. Join our community of successful freelancers 
            and get access to exclusive resources, mentorship, and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/smart-guide">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get SmartGuide™
            </button>
            </Link>
            <button className="bg-white text-gray-700 font-medium py-3 px-6 rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-200">
              Browse More Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelanceCareerTips;