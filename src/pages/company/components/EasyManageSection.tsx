import React from 'react';
import {
  Users,
  Shield,
  Star,
  Eye,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
} from 'lucide-react';

type Benefit = {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
};

type Benefits = {
  freelancer: Benefit[];
  client: Benefit[];
};

const SkillStampPage: React.FC = () => {
  const benefits: Benefits = {
    freelancer: [
      {
        icon: <Shield className="w-6 h-6" />,
        title: 'Trust & Credibility',
        description: "Shows you've been vetted by Workason",
        color: 'from-green-400 to-green-500',
      },
      {
        icon: <Star className="w-6 h-6" />,
        title: 'Stand Out',
        description: 'Differentiate from unverified profiles',
        color: 'from-pink-400 to-pink-500',
      },
      {
        icon: <Eye className="w-6 h-6" />,
        title: 'Boosted Visibility',
        description: 'SkillStamp holders get priority in AI Matching',
        color: 'from-blue-400 to-blue-500',
      },
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Premium Access',
        description: 'Unlock exclusive features and opportunities',
        color: 'from-green-400 to-blue-500',
      },
    ],
    client: [
      {
        icon: <CheckCircle className="w-6 h-6" />,
        title: 'Hiring Confidence',
        description: "Know you're hiring verified, quality freelancers",
        color: 'from-green-400 to-green-500',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: 'Faster Decisions',
        description: 'Quickly identify qualified candidates',
        color: 'from-pink-400 to-pink-500',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Higher Quality',
        description: 'Access to pre-vetted, skilled professionals',
        color: 'from-blue-400 to-blue-500',
      },
    ],
  };

  return <WhySkillStampMatters benefits={benefits} />;
};

type WhySkillStampMattersProps = {
  benefits: Benefits;
};

const WhySkillStampMatters: React.FC<WhySkillStampMattersProps> = ({ benefits }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why <span className="text-green-600">SkillStamp™</span> Matters
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            SkillStamp benefits both freelancers and clients by creating a trusted ecosystem of
            verified professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Freelancer Benefits */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200 shadow-lg">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-2xl mr-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">For Freelancers</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.freelancer.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`bg-gradient-to-r ${benefit.color} p-3 rounded-xl w-fit mb-4`}>
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Client Benefits */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 border border-pink-200 shadow-lg">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-3 rounded-2xl mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">For Clients</h3>
            </div>

            <div className="space-y-6">
              {benefits.client.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`bg-gradient-to-r ${benefit.color} p-3 rounded-xl flex-shrink-0`}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillStampPage;
