import React from 'react';
import { Shield, Users, Lock, CheckCircle, Star, LucideIcon } from 'lucide-react';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface Feature {
  title: string;
  description: string;
}

const FEATURE_ICONS: LucideIcon[] = [Users, CheckCircle, Shield, Lock, Star];
const FEATURE_GRADIENTS = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-indigo-500 to-indigo-600',
  'from-yellow-500 to-yellow-600',
];

const DEFAULT_FEATURES: Feature[] = [
  { title: 'AI-powered matching', description: 'Get Direct Matching to thousands of verified freelancers across all industries and find the perfect match for your project.' },
  { title: 'SkillStamps™ verified talents only', description: 'Receive competitive proposals from qualified freelancers. Compare rates, portfolios, and timelines effortlessly.' },
  { title: 'Faster hiring, less risk', description: 'Streamlined process to quickly onboard verified talent with reduced hiring risks and hassle.' },
  { title: 'Ongoing quality monitoring', description: 'Continuous oversight and quality checks ensure your project stays on track with consistent standards.' },
  { title: 'Ideal for long-term or critical roles', description: 'Perfect for projects requiring sustained commitment or mission-critical deliverables that demand reliability.' },
];

export default function FeaturesSection() {
  const { employersSmartStart } = useCMS();
  const features = safeJsonArray<Feature>(employersSmartStart.emp_ss_features_json, DEFAULT_FEATURES);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {employersSmartStart.emp_ss_features_heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {employersSmartStart.emp_ss_features_subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon     = FEATURE_ICONS[index % FEATURE_ICONS.length];
            const gradient = FEATURE_GRADIENTS[index % FEATURE_GRADIENTS.length];
            return (
              <div key={index} className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-3">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Best for:</span> {employersSmartStart.emp_ss_best_for}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
