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
  Baby,
  LayoutGrid,
  Handshake,
  Rocket,
  BarChart4,
  UserPlus,
  Timer,
  Brush,
  ListCheck,
  Forward,
  Repeat,
} from 'lucide-react';

type Benefit = {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
};

type Purpose = {
  freelancer: Benefit[];
  client: Benefit[];
};

// Fixed: Renamed type to avoid conflict
type WhySmartStartMattersProps = {
  purpose: Purpose;
};

const SmartStartPurpose = () => {
  const purpose = {
    freelancer: [
      {
        icon: <Baby className="w-6 h-6" />,
        title: 'Beginner-Friendly',
        description: "Makes the Platform beginner-friendly",
        color: 'from-green-400 to-green-500',
      },
      {
        icon: <LayoutGrid className="w-6 h-6" />,
        title: 'Platform Differentiation',
        description: 'Differentiate Workason from other freelance platforms',
        color: 'from-pink-400 to-pink-500',
      },
      {
        icon: <Handshake className="w-6 h-6" />,
        title: 'Trust & Success',
        description: 'Promotes freelance success and client trust',
        color: 'from-blue-400 to-blue-500',
      },
      {
        icon: <Rocket className="w-6 h-6" />,
        title: 'Faster Earnings',
        description: 'Helps first-time users earn income faster',
        color: 'from-green-400 to-blue-500',
      },
      {
        icon: <BarChart4 className="w-6 h-6" />,
        title: 'Investor Appeal',
        description: 'Enhances investor appeal by showing user support',
        color: 'from-green-400 to-blue-500',
      },
    ],
    client: [
      {
        icon: <UserPlus className="w-6 h-6" />,
        title: 'Empower New Freelancers',
        description: "Helps beginners create a polished profile and gig setup",
        color: 'from-green-400 to-green-500',
      },
      {
        icon: <Timer className="w-6 h-6" />,
        title: 'Save Time',
        description: 'Gives editable CVs, proposals, and gig descriptions.',
        color: 'from-pink-400 to-pink-500',
      },
      {
        icon: <Brush className="w-6 h-6" />,
        title: 'Look Professional',
        description: 'Ensures high-quality, consistent profiles.',
        color: 'from-blue-400 to-blue-500',
      },
      {
        icon: <ListCheck className="w-6 h-6" />,
        title: 'Reduce Confusion',
        description: 'Step-by-step guidance for onboarding.',
        color: 'from-blue-400 to-blue-500',
      },
      {
        icon: <Forward className="w-6 h-6" />,
        title: 'Faster Activation',
        description: 'Converts users into active freelancers.',
        color: 'from-blue-400 to-blue-500',
      },
      {
        icon: <Repeat className="w-6 h-6" />,
        title: 'Retention',
        description: 'Keeps freelancers engaged and confident.',
        color: 'from-blue-400 to-blue-500',
      },
    ],
  };

  return <WhySmartStartMatters purpose={purpose} />;
};

// Fixed: Component declaration with correct props type
const WhySmartStartMatters = ({ purpose }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why <span className="text-green-600">SmartStart</span> 
          </h2>
          {/* <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            SkillStamp benefits both freelancers and clients by creating a trusted ecosystem of
            verified professionals.
          </p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Freelancer Benefits */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200 shadow-lg">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-2xl mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Why Matters </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {purpose.freelancer.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  {/* Fixed: Use benefit.color instead of purpose.color */}
                  <div className={`bg-gradient-to-r ${benefit.color} p-3 rounded-xl w-fit mb-4 text-white`}>
                    {benefit.icon}
                  </div>
                  {/* Fixed: Use benefit.title instead of purpose.title */}
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  {/* Fixed: Use benefit.description instead of purpose.description */}
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
              <h3 className="text-3xl font-bold text-gray-900">Purpose of SmartStart</h3>
            </div>

            <div className="space-y-6">
              {purpose.client.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    {/* Fixed: Use benefit.color and benefit.icon */}
                    <div className={`bg-gradient-to-r ${benefit.color} p-3 rounded-xl flex-shrink-0 text-white`}>
                      {benefit.icon}
                    </div>
                    <div>
                      {/* Fixed: Use benefit.title and benefit.description */}
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

export default SmartStartPurpose;