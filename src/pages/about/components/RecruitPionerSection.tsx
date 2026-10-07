import React from 'react';
import {
  Award, TrendingUp, Users, Zap, Target, CheckCircle,
  Shield, Clock, Star, Brain, LucideIcon,
} from 'lucide-react';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface ProblemCard {
  title: string;
  desc: string;
}

interface SolutionItem {
  name: string;
  desc: string;
}

interface AiFeature {
  title: string;
  desc: string;
}

// Fixed icon sets — admins control text, designers control icons
const PROBLEM_ICONS: LucideIcon[] = [Shield, Clock, Star];
const PROBLEM_COLORS = [
  { bg: 'from-pink-50 to-pink-100', icon: 'text-pink-600', border: 'hover:border-pink-300' },
  { bg: 'from-green-50 to-green-100', icon: 'text-green-600', border: 'hover:border-green-300' },
  { bg: 'from-gray-50 to-gray-100', icon: 'text-gray-600', border: 'hover:border-gray-400' },
];

const SOLUTION_ICONS: LucideIcon[] = [Award, TrendingUp, Users];
const SOLUTION_COLORS = [
  { border: 'border-pink-200', icon: 'text-pink-600', bg: 'from-white to-pink-50' },
  { border: 'border-green-200', icon: 'text-green-600', bg: 'from-white to-green-50' },
  { border: 'border-gray-200', icon: 'text-gray-700', bg: 'from-white to-gray-50' },
];

const AI_ICONS: LucideIcon[] = [Zap, Award, Target, CheckCircle];
const AI_COLORS = ['bg-pink-100 text-pink-600', 'bg-green-100 text-green-600', 'bg-pink-100 text-pink-600', 'bg-green-100 text-green-600'];
const AI_BORDERS = ['hover:border-pink-300', 'hover:border-green-300', 'hover:border-pink-300', 'hover:border-green-300'];

const DEFAULT_PROBLEMS: ProblemCard[] = [
  { title: 'Unverified Talent', desc: 'No guarantee of skills or credentials in traditional platforms' },
  { title: 'Missed Deadlines',  desc: 'Unreliable delivery timelines impact project success' },
  { title: 'Trust Issues',      desc: 'Poor job quality and lack of transparency' },
];

const DEFAULT_SOLUTIONS: SolutionItem[] = [
  { name: 'SkillStamps™', desc: 'A role-specific verification badge issued only after passing real assessments. Each SkillStamp represents proven competency and professional standards.' },
  { name: 'SmartStart',   desc: 'A comprehensive training pathway that equips freelancers with the skills clients actually need. Build expertise that drives real results.' },
  { name: 'TalentVault',  desc: 'A dedicated space for verified, reliable talent. Access pre-vetted professionals who meet our rigorous quality standards.' },
];

const DEFAULT_AI_FEATURES: AiFeature[] = [
  { title: 'Skills Match',              desc: 'Precise alignment of technical and soft skills with job requirements' },
  { title: 'Verified Credentials',      desc: 'Authenticated SkillStamps and professional certifications' },
  { title: 'Completion History',        desc: 'Proven track record of successfully delivered projects' },
  { title: 'Role-Specific Performance', desc: 'Demonstrated success in similar positions and industries' },
];

export default function RecruitPionerSection() {
  const { about } = useCMS();
  const problems   = safeJsonArray<ProblemCard>(about.about_problems_json, DEFAULT_PROBLEMS);
  const solutions  = safeJsonArray<SolutionItem>(about.about_solutions_json, DEFAULT_SOLUTIONS);
  const aiFeatures = safeJsonArray<AiFeature>(about.about_ai_features_json, DEFAULT_AI_FEATURES);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* ── Problems section ── */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {about.about_built_heading}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-green-500 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {about.about_built_description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {problems.map((problem, index) => {
            const ProblemIcon = PROBLEM_ICONS[index % PROBLEM_ICONS.length];
            const colors      = PROBLEM_COLORS[index % PROBLEM_COLORS.length];
            return (
              <div key={index} className="group">
                <div className={`bg-white rounded-2xl p-8 border border-gray-200 ${colors.border} transition-all h-full hover:shadow-lg`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center mb-6`}>
                    <ProblemIcon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{problem.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Solutions section ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{about.about_solutions_heading}</h2>
            <p className="text-gray-600">{about.about_solutions_subtext}</p>
          </div>

          <div className="space-y-4">
            {solutions.map((solution, index) => {
              const SolutionIcon = SOLUTION_ICONS[index % SOLUTION_ICONS.length];
              const colors       = SOLUTION_COLORS[index % SOLUTION_COLORS.length];
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${colors.bg} rounded-xl p-8 border ${colors.border} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border ${colors.border}`}>
                      <SolutionIcon className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.name}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{solution.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Platform quote ── */}
        <div className="bg-[#023020] rounded-2xl p-12 mb-20">
          <div className="text-center">
            <p className="text-2xl text-white leading-relaxed max-w-4xl mx-auto">
              {about.about_platform_description}
            </p>
          </div>
        </div>

        {/* ── AI Matching section ── */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border border-gray-200">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-green-500 rounded-2xl mb-6 shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{about.about_ai_heading}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{about.about_ai_subtext}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aiFeatures.map((feature, index) => {
              const AiIcon              = AI_ICONS[index % AI_ICONS.length];
              const [bgClass, txtClass] = AI_COLORS[index % AI_COLORS.length].split(' ');
              const border              = AI_BORDERS[index % AI_BORDERS.length];
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl p-6 border border-gray-200 ${border} transition-colors`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${bgClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <AiIcon className={`w-6 h-6 ${txtClass}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Culture banner ── */}
      <div className="bg-[#023020] py-32">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-white text-lg font-semibold mb-6">
            {about.about_culture_label}
          </p>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-snug max-w-3xl">
            {about.about_culture_description}
          </h1>
        </div>
      </div>
    </div>
  );
}
