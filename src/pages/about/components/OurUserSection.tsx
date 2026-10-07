import React, { useState } from "react";
import {
  Users, Crown, CheckCircle, Briefcase, Zap, Target, Award,
  Shield, ArrowRight, UserCheck, Building, TrendingUp, LucideIcon,
} from "lucide-react";
import { useCMS } from "../../../hooks/useCMS";
import { safeJsonArray } from "../../../utils/cmsUtils";

interface FreelancerStep {
  stepNumber: string;
  title: string;
  description: string;
}

interface EmployerBenefit {
  title: string;
  description: string;
}

// Icons and gradient colors are design concerns — not admin-editable
const STEP_ICONS: LucideIcon[] = [Users, Zap, Award, Crown];
const STEP_COLORS = [
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600',
  'from-purple-500 to-purple-600',
  'from-pink-500 to-pink-600',
];

const BENEFIT_ICONS: LucideIcon[] = [CheckCircle, Target, TrendingUp, Shield];
const BENEFIT_COLORS = [
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600',
  'from-purple-500 to-purple-600',
  'from-pink-500 to-pink-600',
];

const DEFAULT_STEPS: FreelancerStep[] = [
  { stepNumber: '01', title: 'Start as an Ordinary Freelancer', description: 'Join the platform, create your profile, and begin your freelancing journey with access to job opportunities.' },
  { stepNumber: '02', title: 'Upgrade Through SmartStart',      description: 'Get verified, access training, and unlock curated opportunities with comprehensive onboarding support.' },
  { stepNumber: '03', title: 'Earn SkillStamps™',              description: 'Build credibility through verified skills and completed projects that showcase your expertise.' },
  { stepNumber: '04', title: 'Join the TalentVault',           description: 'Achieve premium visibility and access higher-value clients as part of our elite talent pool.' },
];

const DEFAULT_BENEFITS: EmployerBenefit[] = [
  { title: 'Verified Talent',           description: 'Access pre-vetted freelancers from the UK diaspora and beyond, all verified through our SmartStart process.' },
  { title: 'SmartStart Hiring Support', description: 'Get expert assistance in finding the perfect match with curated shortlists and AI-powered recommendations.' },
  { title: 'Faster Job Turnaround',     description: 'Connect with ready-to-work talent quickly, reducing time-to-hire and accelerating project delivery.' },
  { title: 'ProofToPay Escrow',         description: 'Secure, trusted transactions with our escrow system ensuring peace of mind for both parties.' },
];

const OurUsersSection: React.FC = () => {
  const { about } = useCMS();
  const [activeTab, setActiveTab] = useState<'freelancers' | 'employers'>('freelancers');

  const freelancerSteps   = safeJsonArray<FreelancerStep>(about.about_freelancer_steps_json, DEFAULT_STEPS);
  const employerBenefits  = safeJsonArray<EmployerBenefit>(about.about_employer_benefits_json, DEFAULT_BENEFITS);

  return (
    <section className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gray-800 bg-clip-text text-transparent">
              {about.about_users_heading}
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 font-medium max-w-3xl mx-auto">
            {activeTab === 'freelancers'
              ? about.about_freelancer_subtitle
              : about.about_employer_subtitle}
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <button
              onClick={() => setActiveTab('freelancers')}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'freelancers'
                  ? 'bg-[#ee009d] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <UserCheck size={20} />
              {about.about_users_freelancer_tab}
            </button>
            <button
              onClick={() => setActiveTab('employers')}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'employers'
                  ? 'bg-[#023020] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Building size={20} />
              {about.about_users_employer_tab}
            </button>
          </div>
        </div>

        {/* ── Freelancer Path ── */}
        {activeTab === 'freelancers' ? (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {about.about_freelancer_path_heading}
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {about.about_freelancer_path_description}
              </p>
            </div>

            <div className="relative">
              <div
                className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20"
                style={{ width: '82%', margin: '0 9%' }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {freelancerSteps.map((step, index) => {
                  const IconComponent = STEP_ICONS[index % STEP_ICONS.length];
                  const color         = STEP_COLORS[index % STEP_COLORS.length];
                  const nextColor     = STEP_COLORS[(index + 1) % STEP_COLORS.length];
                  return (
                    <div key={index} className="relative">
                      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 relative overflow-hidden group h-full">
                        <div className={`absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br ${color} opacity-10 rounded-full group-hover:scale-125 transition-transform duration-700`} />
                        <div className="absolute top-6 right-6">
                          <div className={`w-16 h-16 bg-gradient-to-br ${color} opacity-15 rounded-2xl flex items-center justify-center transform rotate-6`}>
                            <span className="text-3xl font-black text-gray-400 transform -rotate-6">{step.stepNumber}</span>
                          </div>
                        </div>
                        <div className={`w-20 h-20 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10`}>
                          <IconComponent size={32} strokeWidth={2.5} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4 leading-tight pr-12">{step.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                      {index < freelancerSteps.length - 1 && (
                        <div className="hidden lg:flex absolute top-24 -right-4 z-20 items-center justify-center w-8 h-8 bg-white rounded-full shadow-md">
                          <ArrowRight className={`bg-gradient-to-r ${nextColor} bg-clip-text text-transparent`} size={20} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (

          /* ── Employer Benefits ── */
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {about.about_employer_heading}
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {about.about_employer_description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {employerBenefits.map((benefit, index) => {
                const IconComponent = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
                const color         = BENEFIT_COLORS[index % BENEFIT_COLORS.length];
                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group"
                  >
                    <div className={`absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br ${color} opacity-10 rounded-full group-hover:scale-110 transition-transform duration-700`} />
                    <div className={`w-20 h-20 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10`}>
                      <IconComponent size={32} strokeWidth={2.5} />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-lg">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default OurUsersSection;
