import React from "react";
import { Users, DollarSign, FileText, Handshake, Scale, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const ClientCareerTips: React.FC = () => {
  const careerTips = [
    {
      id: 1,
      title: "How to Choose the Right Freelancer",
      content: "Don’t just look at price. Review portfolios, past feedback, and communication style.A freelancer who understands your goals is worth more than the cheapest bid.",
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "How to Write a Clear Job Post",
      content: "Be specific about deliverables, deadlines, and budget. The clearer your description, the better the quality of applications you’ll receive.",
      icon: DollarSign,
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "How to Communicate Effectively",
      content: "Set expectations early. Use short check-in messages, provide feedback quickly, and keep everything documented to avoid confusion later.",
      icon: FileText,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "How to Build Long-Term Freelancer Partnerships",
      content: "If you find someone reliable, keep them! Offer consistent work, fair pay, and appreciation. Loyal freelancers often go above and beyond.",
      icon: Handshake,
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 5,
      title: "How to Manage Projects Smoothly",
      content: "Use collaboration tools like Slack, Trello, or Google Drive to keep everything in one place. This reduces delays and miscommunication.",
      icon: Scale,
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 6,
      title: "How to Get the Best ROI from Freelancers",
      content: "Treat freelancers as part of your team. Share the bigger picture so they understand your business goals—not just the task. This leads to higher-quality work and better results.",
      icon: TrendingUp,
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="lg:ml-64 mt-[8rem] px-[2.5rem]">
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
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get SmartGuide™
            </button>
            <button className="bg-white text-gray-700 font-medium py-3 px-6 rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-200">
              Browse More Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCareerTips;