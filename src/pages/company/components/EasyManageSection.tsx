import React from 'react';
import {
  Users, Shield, Star, Eye, Zap, CheckCircle, Clock, TrendingUp, Target,
  LucideIcon,
} from 'lucide-react';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface Benefit {
  title: string;
  description: string;
}

const FREELANCER_ICONS: LucideIcon[] = [Shield, Star, Eye, Zap];
const FREELANCER_COLORS = [
  'from-green-400 to-green-500',
  'from-pink-400 to-pink-500',
  'from-blue-400 to-blue-500',
  'from-green-400 to-blue-500',
];

const CLIENT_ICONS: LucideIcon[] = [CheckCircle, Clock, TrendingUp, Target];
const CLIENT_COLORS = [
  'from-green-400 to-green-500',
  'from-pink-400 to-pink-500',
  'from-blue-400 to-blue-500',
  'from-purple-400 to-purple-500',
];

const DEFAULT_FREELANCER_BENEFITS: Benefit[] = [
  { title: 'Trust & Credibility', description: "Shows you've been vetted by Workason" },
  { title: 'Stand Out', description: 'Differentiate from unverified profiles' },
  { title: 'Boosted Visibility', description: 'SkillStamp holders get priority in AI Matching' },
  { title: 'Premium Access', description: 'Unlock exclusive features and opportunities' },
];

const DEFAULT_CLIENT_BENEFITS: Benefit[] = [
  { title: 'Hiring Confidence', description: "Know you're hiring verified, quality freelancers" },
  { title: 'Faster Decisions', description: 'Quickly identify qualified candidates' },
  { title: 'Higher Quality', description: 'Access to pre-vetted, skilled professionals' },
];

const EasyManageSection: React.FC = () => {
  const { employers } = useCMS();
  const freelancerBenefits = safeJsonArray<Benefit>(employers.emp_why_freelancer_benefits_json, DEFAULT_FREELANCER_BENEFITS);
  const clientBenefits     = safeJsonArray<Benefit>(employers.emp_why_client_benefits_json, DEFAULT_CLIENT_BENEFITS);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {employers.emp_why_heading}{' '}
            <span className="text-green-600">{employers.emp_why_highlight}</span>{' '}
            Matters
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {employers.emp_why_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Freelancer Benefits */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200 shadow-lg">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-2xl mr-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{employers.emp_why_freelancer_heading}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {freelancerBenefits.map((benefit, index) => {
                const Icon  = FREELANCER_ICONS[index % FREELANCER_ICONS.length];
                const color = FREELANCER_COLORS[index % FREELANCER_COLORS.length];
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <div className={`bg-gradient-to-r ${color} p-3 rounded-xl w-fit mb-4 text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Client Benefits */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 border border-pink-200 shadow-lg">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-3 rounded-2xl mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{employers.emp_why_client_heading}</h3>
            </div>
            <div className="space-y-6">
              {clientBenefits.map((benefit, index) => {
                const Icon  = CLIENT_ICONS[index % CLIENT_ICONS.length];
                const color = CLIENT_COLORS[index % CLIENT_COLORS.length];
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-start space-x-4">
                      <div className={`bg-gradient-to-r ${color} p-3 rounded-xl flex-shrink-0 text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyManageSection;
