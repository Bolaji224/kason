import React from 'react';
import { Shield, Users, Lock, CheckCircle, Star } from 'lucide-react';

export default function FeaturesSection() {
 const features = [
  {
    icon: Users,
    title: "AI-powered matching",
    description: "Get Direct Matching to thousands of verified freelancers across all industries and find the perfect match for your project.",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: CheckCircle,
    title: "SkillStamps™ verified talents only",
    description: "Receive competitive proposals from qualified freelancers. Compare rates, portfolios, and timelines effortlessly.",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Shield,
    title: "Faster hiring, less risk",
    description: "Streamlined process to quickly onboard verified talent with reduced hiring risks and hassle.",
    gradient: "from-green-500 to-green-600"
  },
  {
    icon: Lock,
    title: "Ongoing quality monitoring",
    description: "Continuous oversight and quality checks ensure your project stays on track with consistent standards.",
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Star,
    title: "Ideal for long-term or critical roles",
    description: "Perfect for projects requiring sustained commitment or mission-critical deliverables that demand reliability.",
    gradient: "from-yellow-500 to-yellow-600"
  }
];
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to hire with confidence and get exceptional results
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-3">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Best for:</span> Busy founders, professionals, and diaspora clients who want speed + certainty
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}