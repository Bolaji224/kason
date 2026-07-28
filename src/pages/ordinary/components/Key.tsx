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
  { title: 'Open Marketplace Access', description: 'Browse thousands of verified freelancers across all industries and find the perfect match for your project.' },
  { title: 'Freelancers Submit Proposals', description: 'Receive competitive proposals from qualified freelancers. Compare rates, portfolios, and timelines effortlessly.' },
  { title: 'Secure Escrow Payments', description: 'Your funds are held securely in escrow until you approve the completed work. Protection guaranteed.' },
  { title: 'Pay Only When Completed', description: "Release payment only when you're 100% satisfied with the deliverables. No risk, no hidden fees." },
  { title: 'Transparent Ratings & Reviews', description: 'Make informed decisions with comprehensive ratings and genuine reviews from clients.' },
];

export default function KeyFeaturesSection() {
  const { employersOrdinary } = useCMS();
  const features = safeJsonArray<Feature>(employersOrdinary.emp_ord_features_json, DEFAULT_FEATURES);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {employersOrdinary.emp_ord_features_heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {employersOrdinary.emp_ord_features_subtitle}
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
              <span className="font-semibold text-gray-900">Best for:</span> {employersOrdinary.emp_ord_best_for}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
