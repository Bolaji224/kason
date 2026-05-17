import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import {
  Star,
  Rocket,
  GraduationCap,
  Bot,
  ShieldCheck,
  Globe2
} from 'lucide-react';

export default function FindJobSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stagger = {
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      title: 'SkillStamp™',
      desc: 'Get premium-skills certification bonus for in-house team',
      icon: <Star size={24} color="#1E2A3B" /> // Dark Blue
    },
    {
      title: 'SmartStart',
      desc: 'Program guiding hands-on progress for early freelancers',
      icon: <Rocket size={24} color="#4ADE80" /> // Light Green
    },
    {
      title: 'SmartGuide',
      desc: 'Graduate guide to support upward career movement',
      icon: <GraduationCap size={24} color="#F472B6" /> // Light Pink
    },
    {
      title: 'AI Matching',
      desc: 'AI-powered project matching and user retention tools',
      icon: <Bot size={24} color="#60A5FA" /> // Light Blue
    },
    {
      title: 'Escrow & Bidding',
      desc: 'Built-in escrow and competitive bidding for secure deals',
      icon: <ShieldCheck size={24} color="#FACC15" /> // Light Yellow
    },
    {
      title: 'Social Impact Angle',
      desc: 'Inclusive design empowering underrepresented regions',
      icon: <Globe2 size={24} color="#1E2A3B" /> // Dark Blue again
    }
  ];
  const navigate = useNavigate();

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
            Why Choose Workason
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
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-[#E8EBEE] rounded-lg p-6 shadow-sm transition-all duration-500 ease-out
                         hover:shadow-2xl hover:scale-105 hover:-translate-y-1 hover:bg-[#f3f5f8]"
            >
              <div className="bg-white p-3 rounded-full inline-block text-white mb-4 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
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
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of professionals who trust Workason for their freelancing needs.
            </p>
           <motion.button
  whileHover={{ scale: 1.07 }}
  onClick={() => navigate("/login")}
  className="bg-white text-[#1E2A3B] px-8 py-3 rounded-full font-semibold transition duration-300 transform"
>
  Start Your Journey
</motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
