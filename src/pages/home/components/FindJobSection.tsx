import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import {
  Star, Rocket, GraduationCap, Bot, ShieldCheck, Globe2,
  LucideIcon,
} from 'lucide-react';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface FeatureCard {
  title: string;
  desc: string;
  iconName: string;
  iconColor: string;
}

const LUCIDE_ICONS: Record<string, LucideIcon> = {
  Star, Rocket, GraduationCap, Bot, ShieldCheck, Globe2,
};

const DEFAULT_CARDS: FeatureCard[] = [
  { title: 'SkillStamp™',        desc: 'Get premium-skills certification bonus for in-house team',     iconName: 'Star',         iconColor: '#1E2A3B' },
  { title: 'SmartStart',         desc: 'Program guiding hands-on progress for early freelancers',      iconName: 'Rocket',       iconColor: '#4ADE80' },
  { title: 'SmartGuide',         desc: 'Graduate guide to support upward career movement',             iconName: 'GraduationCap',iconColor: '#F472B6' },
  { title: 'AI Matching',        desc: 'AI-powered project matching and user retention tools',         iconName: 'Bot',          iconColor: '#60A5FA' },
  { title: 'Escrow & Bidding',   desc: 'Built-in escrow and competitive bidding for secure deals',    iconName: 'ShieldCheck',  iconColor: '#FACC15' },
  { title: 'Social Impact Angle',desc: 'Inclusive design empowering underrepresented regions',        iconName: 'Globe2',       iconColor: '#1E2A3B' },
];

export default function FindJobSection() {
  const { homepage } = useCMS();
  const cards = safeJsonArray<FeatureCard>(homepage.features_cards_json, DEFAULT_CARDS);
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const stagger = {
    show: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {homepage.features_heading}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          {cards.map((card, index) => {
            const IconComponent = LUCIDE_ICONS[card.iconName] ?? Star;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-[#E8EBEE] rounded-lg p-6 shadow-sm transition-all duration-500 ease-out hover:shadow-2xl hover:scale-105 hover:-translate-y-1 hover:bg-[#f3f5f8]"
              >
                <div className="bg-white p-3 rounded-full inline-block mb-4 shadow-sm">
                  <IconComponent size={24} color={card.iconColor || '#1E2A3B'} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-gray-600">{card.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="bg-[#1E2A3B] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{homepage.features_cta_heading}</h3>
            <p className="text-xl mb-6 opacity-90">{homepage.features_cta_subtitle}</p>
            <motion.button
              whileHover={{ scale: 1.07 }}
              onClick={() => navigate("/login")}
              className="bg-white text-[#1E2A3B] px-8 py-3 rounded-full font-semibold transition duration-300 transform"
            >
              {homepage.features_cta_button}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
