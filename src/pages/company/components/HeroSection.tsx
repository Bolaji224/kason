import React from 'react';
import { Shield } from 'lucide-react';
import Images from '../../../components/constant/Images';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
   <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
  {/* Blurred Circles */}
  <div className="absolute inset-0">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
  </div>
       <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 mt-24">
        {/* Text Section */}
        <div className="text-center lg:text-left lg:w-1/2">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full px-6 py-2 mb-6 border border-green-500/30">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Verified Badge System</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Skill<span className="bg-gradient-to-r from-green-500 to-pink-500 bg-clip-text text-transparent">Stamp™</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            A verified badge system that gives freelancers credibility and proof of skill on their profile. 
            Think of it as a <span className="text-green-600 font-semibold">'Verified' badge for skills</span>, not just identity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Apply for SkillStamp
            </button>
            <button className="border-2 border-pink-500 hover:bg-pink-50 text-pink-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: imageInView ? 1 : 0, y: imageInView ? 0 : 50 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="lg:w-1/2 flex justify-center"
        >
          <img
            src={Images.RecruitImage}
            alt="Recruit"
            className="w-full max-w-md object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
