import React from 'react';
import { FileText, UserCheck, Award, LucideIcon } from 'lucide-react';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

const STEP_ICONS: LucideIcon[] = [FileText, UserCheck, Award];
const STEP_COLORS = [
  'from-pink-500 to-pink-600',
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600',
];

const DEFAULT_STEPS: HowItWorksStep[] = [
  { number: '01', title: 'Apply for SkillStamp', description: 'Complete 1-2 real jobs on the platform OR submit portfolio/test task. Must follow SmartGuide steps.' },
  { number: '02', title: 'Admin Review & Verification', description: 'Our team reviews your work quality or test results to ensure you meet our standards.' },
  { number: '03', title: 'Badge Displayed Publicly', description: 'Approved badge appears under your name with a green label, boosting visibility and trust.' },
];

const HowItWorks: React.FC = () => {
  const { employers } = useCMS();
  const steps = safeJsonArray<HowItWorksStep>(employers.emp_how_steps_json, DEFAULT_STEPS);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {employers.emp_how_heading}{' '}
            <span className="text-blue-600">{employers.emp_how_highlight}</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {employers.emp_how_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon  = STEP_ICONS[index % STEP_ICONS.length];
            const color = STEP_COLORS[index % STEP_COLORS.length];
            return (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105 h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <div className={`bg-gradient-to-r ${color} p-4 rounded-2xl w-fit mb-6 text-white shadow-md`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 transform -translate-y-1/2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
