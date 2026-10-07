import React from 'react';
import { ShieldCheck, Rocket, Briefcase, LucideIcon } from 'lucide-react';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface BadgeType {
  title: string;
  description: string;
}

const BADGE_ICONS: LucideIcon[] = [ShieldCheck, Rocket, Briefcase];
const BADGE_COLORS = [
  'from-green-400 to-green-500',
  'from-blue-400 to-blue-500',
  'from-pink-400 to-pink-500',
];

const DEFAULT_BADGE_TYPES: BadgeType[] = [
  { title: 'Verified', description: 'Awarded after passing test task or real work review. Boosts profile trust.' },
  { title: 'Pro', description: 'Given to top-performing freelancers based on reviews, responsiveness, and consistency.' },
  { title: 'Agency', description: 'Identifies high-quality teams and businesses with multiple members.' },
];

const BadgeTypes: React.FC = () => {
  const { employers } = useCMS();
  const badgeTypes = safeJsonArray<BadgeType>(employers.emp_badge_types_json, DEFAULT_BADGE_TYPES);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {employers.emp_badges_heading}{' '}
            <span className="text-pink-600">{employers.emp_badges_highlight}</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {employers.emp_badges_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badgeTypes.map((badge, index) => {
            const Icon  = BADGE_ICONS[index % BADGE_ICONS.length];
            const color = BADGE_COLORS[index % BADGE_COLORS.length];
            return (
              <div key={index} className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className={`bg-gradient-to-r ${color} p-4 rounded-2xl w-fit mb-6 text-white shadow-md`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{badge.title}</h3>
                <p className="text-gray-600 leading-relaxed">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BadgeTypes;
