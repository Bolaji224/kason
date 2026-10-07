import React from "react";
import { ArrowRight, CheckCircle, Users, Shield, Zap, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCMS } from "../../../hooks/useCMS";
import { safeJsonArray } from "../../../utils/cmsUtils";

interface LandingStep {
  number: string;
  title: string;
  description: string;
}

interface LandingFeature {
  iconName: string;
  title: string;
  desc: string;
}

const LUCIDE_ICONS: Record<string, LucideIcon> = { Zap, Shield, Users };

const DEFAULT_STEPS: LandingStep[] = [
  { number: '1', title: 'Tell us what you need',  description: 'We understand your goals and workflow.' },
  { number: '2', title: 'Get matched instantly',   description: 'SmartStart pairs you with a verified pro.' },
  { number: '3', title: 'Work with confidence',   description: 'ProofToPay protects your payments.' },
];

const DEFAULT_FEATURES: LandingFeature[] = [
  { iconName: 'Zap',    title: 'SmartStart™ AI', desc: 'Instant matching' },
  { iconName: 'Shield', title: 'SkillStamp™',    desc: 'Verified expertise' },
  { iconName: 'Users',  title: 'ProofToPay',     desc: 'Payment protection' },
];

const DEFAULT_BENEFITS = [
  'UK credibility on your CV',
  'Easier to secure freelance projects',
  'Recognition from an international platform',
];

export default function WorkasonLanding() {
  const { homepage } = useCMS();
  const navigate = useNavigate();

  const steps    = safeJsonArray<LandingStep>(homepage.landing_steps_json, DEFAULT_STEPS);
  const features = safeJsonArray<LandingFeature>(homepage.landing_features_json, DEFAULT_FEATURES);
  const benefits = safeJsonArray<string>(homepage.landing_benefits_json, DEFAULT_BENEFITS);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug mb-4">
          {homepage.landing_heading}
        </h1>
        <p className="text-lg md:text-xl text-[#646A73] mb-8 max-w-3xl mx-auto">
          {homepage.landing_subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg hover:bg-[#239100] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
            onClick={() => navigate("/login")}
          >
            🚀 {homepage.landing_cta_primary}
          </button>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg border border-pink-500 hover:bg-pink-500 hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
            ⚪ {homepage.landing_cta_secondary}
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            {homepage.landing_how_heading}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-pink-200 hover:border-[#2AA100] hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center font-bold text-gray-900 bg-gradient-to-r from-pink-500 to-pink-600 text-lg">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-[#646A73]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Referral */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {homepage.landing_referral_heading}
              <span className="block text-2xl bg-gradient-to-r from-pink-600 to-[#2AA100] bg-clip-text text-transparent">
                {homepage.landing_referral_subheading}
              </span>
            </h2>
            <p className="text-[#646A73] mb-6">
              {homepage.landing_referral_description}
            </p>
            <div className="space-y-3 mb-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <CheckCircle className="w-5 h-5 text-[#2AA100] mt-0.5" />
                  <span className="text-[#646A73]">{b}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-[#2AA100] to-[#239100] text-gray-900 px-6 py-3 rounded-lg font-semibold hover:from-[#239100] hover:to-[#1d7d00] transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              {homepage.landing_referral_button} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-pink-50 border border-pink-200 rounded-xl p-8 shadow-lg">
            <p className="text-lg font-semibold text-gray-900 mb-2">✨ Why it matters</p>
            <p className="text-[#646A73]">{homepage.landing_why_matters}</p>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-white py-12 border-pink-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const IconComponent = LUCIDE_ICONS[f.iconName] ?? Zap;
            return (
              <div
                key={i}
                className="flex flex-col items-center p-6 rounded-lg border border-pink-200 bg-white hover:border-[#2AA100] hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 mb-3 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-[#2AA100]">
                  <IconComponent className="w-7 h-7 text-gray-900" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-[#646A73] text-center">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
