import React, { useState } from 'react';
import {
  Lock, Shield, Users, Award, Eye, Clock, CheckCircle, ChevronRight, ChevronLeft,
  Sparkles, Check, Target, MapPin, Briefcase,
  LucideIcon,
} from 'lucide-react';
import darian from "../../../images/workason/darian.jpg";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface AccessOption {
  duration: string;
  popular?: boolean;
}

interface KeyFeature {
  label: string;
}

const FEATURE_ICONS: LucideIcon[] = [CheckCircle, Eye, Clock, Target];

const DEFAULT_ACCESS_OPTIONS: AccessOption[] = [
  { duration: '3 days' },
  { duration: '7 days', popular: true },
  { duration: '14 days' },
];

const DEFAULT_KEY_FEATURES: KeyFeature[] = [
  { label: 'Pre-vetted, verified talents only' },
  { label: 'No public competition' },
  { label: 'Faster shortlisting' },
  { label: 'Ideal for agencies, busy professionals, and HR teams' },
];

const DEFAULT_WHAT_YOU_GET = [
  'Access to curated, verified Workason talents',
  'View smart CVs and detailed profiles',
  'Browse comprehensive portfolios',
  'Check SkillStamps™ scores and verifications',
  'Shortlist candidates directly',
  'Private browsing with no public competition',
  'Fast-track your hiring process',
];

const TALENT_PER_SLIDE = 3;

const DEMO_TALENTS = [
  {
    id: 1,
    name: 'Aisha Mensah',
    role: 'Video Editor & Motion',
    location: 'Leeds, UK',
    skillstamp: 93,
    skills: ['Premiere Pro', 'After Effects', 'DaVinci'],
    available: true,
    experience: '4 years',
    initials: 'AM',
    color: 'from-rose-900/40 to-pink-800/20',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80',
    rating: 4.8,
    reviewCount: 23,
  },
  {
    id: 2,
    name: 'Kofi Asante',
    role: 'Virtual Assistant',
    location: 'Bristol, UK',
    skillstamp: 87,
    skills: ['Admin', 'CRM Tools', 'Scheduling'],
    available: true,
    experience: '3 years',
    initials: 'KA',
    color: 'from-violet-900/40 to-purple-800/20',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    rating: 4.6,
    reviewCount: 11,
  },
  {
    id: 3,
    name: 'Naomi Clarke',
    role: 'Virtual Assistant',
    location: 'Edinburgh, UK',
    skillstamp: 90,
    skills: ['Content', 'Analytics', 'Scheduling'],
    available: false,
    experience: '5 years',
    initials: 'NC',
    color: 'from-cyan-900/40 to-sky-800/20',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    rating: 0,
    reviewCount: 0,
  },
  {
    id: 4,
    name: 'Marcus Thompson',
    role: 'Video Editor',
    location: 'London, UK',
    skillstamp: 96,
    skills: ['Premiere Pro', 'Color Grading', 'Reels'],
    available: true,
    experience: '7 years',
    initials: 'MT',
    color: 'from-amber-900/40 to-orange-800/20',
    image: 'https://images.unsplash.com/photo-1574717024453-354056aafa98?w=400&q=80',
    rating: 4.9,
    reviewCount: 41,
  },
];

export default function TalentVaultPage() {
  const [selectedAccess, setSelectedAccess] = useState('7 days');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  const { freelancersTalentVault } = useCMS();

  const accessOptions = safeJsonArray<AccessOption>(freelancersTalentVault.fl_tv_access_options_json, DEFAULT_ACCESS_OPTIONS);
  const keyFeatures   = safeJsonArray<KeyFeature>(freelancersTalentVault.fl_tv_features_json, DEFAULT_KEY_FEATURES);
  const whatYouGet    = safeJsonArray<string>(freelancersTalentVault.fl_tv_what_you_get_json, DEFAULT_WHAT_YOU_GET);

  const talents      = DEMO_TALENTS;
  const totalSlides  = Math.ceil(talents.length / TALENT_PER_SLIDE);
  const canPrev      = carouselIndex > 0;
  const canNext      = carouselIndex < totalSlides - 1;
  const visibleTalents = talents.slice(carouselIndex * TALENT_PER_SLIDE, carouselIndex * TALENT_PER_SLIDE + TALENT_PER_SLIDE);

  return (
    <div className="dark min-h-screen bg-background">
      {/* Hero */}
      <section className="relative px-6 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2AA100]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30">
              <Lock className="w-4 h-4 text-accent" />
              <span className="text-accent text-sm font-medium">{freelancersTalentVault.fl_tv_badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              {freelancersTalentVault.fl_tv_heading}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {freelancersTalentVault.fl_tv_description}
            </p>

            <div className="space-y-3 pt-4">
              <p className="text-sm font-semibold text-accent uppercase tracking-wide">{freelancersTalentVault.fl_tv_access_label}</p>
              <div className="flex flex-wrap gap-3">
                {accessOptions.map((option) => (
                  <button
                    key={option.duration}
                    onClick={() => navigate(freelancersTalentVault.fl_tv_button_url)}
                    className={`relative px-6 py-3 rounded-lg font-semibold transition-all ${
                      selectedAccess === option.duration
                        ? 'bg-accent text-black'
                        : 'bg-card border border-border hover:border-accent/50'
                    }`}
                  >
                    {option.popular && (
                      <span className="absolute -top-2 -right-2 bg-[#2AA100] text-black text-xs px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    {option.duration}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate(freelancersTalentVault.fl_tv_button_url)}
                className="bg-[#2AA100] text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                {freelancersTalentVault.fl_tv_button}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Best for:</span> {freelancersTalentVault.fl_tv_best_for}
              </p>
            </div>
          </div>

          {/* Right: Talent Profile Card */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-accent/10 rounded-3xl blur-2xl" />
            <div className="relative w-full max-w-sm bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-accent/40 px-3 py-1.5 rounded-full">
                <Lock className="w-3.5 h-3.5 text-accent" />
                <span className="text-white text-xs font-semibold">Vault Member</span>
              </div>
              <div className="relative h-72 w-full overflow-hidden">
                <img src={darian} alt="Talent profile" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>
              <div className="px-5 pb-5 -mt-6 relative space-y-4">
                <div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Emily c.</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        Senior Product Designer
                      </p>
                    </div>
                    <div className="flex flex-col items-center bg-accent/10 border border-accent/30 rounded-xl px-3 py-2">
                      <span className="text-xs text-white font-semibold uppercase tracking-wide">SkillStamp™</span>
                      <span className="text-2xl font-bold text-accent leading-none mt-0.5">94</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    London, United Kingdom &nbsp;·&nbsp; Available now
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'UX Research', 'Prototyping', '+4 more'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#2AA100] font-medium">
                    <CheckCircle className="w-4 h-4" />ID Verified
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#2AA100] font-medium">
                    <Shield className="w-4 h-4" />Portfolio Verified
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2AA100]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#2AA100]" />
              </div>
            </div>
            <div className="absolute -top-4 -left-6 bg-card border border-border shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">{freelancersTalentVault.fl_tv_features_heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyFeatures.map((feature, index) => {
              const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
              return (
                <div key={index} className="relative group">
                  <div className="p-5 bg-card/50 border border-border/50 hover:border-accent/30 transition-all h-full rounded-xl">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="p-8 bg-accent/5 border border-accent/20 rounded-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              {freelancersTalentVault.fl_tv_what_you_get_heading}
            </h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {whatYouGet.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Talent Carousel */}
      <section className="px-6 py-16 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{freelancersTalentVault.fl_tv_talents_heading}</h2>
              <p className="text-muted-foreground mt-1 text-sm">{freelancersTalentVault.fl_tv_talents_subtitle}</p>
            </div>

            {totalSlides > 1 && (
              <div className="flex items-center gap-3">
                <button
                  disabled={!canPrev}
                  onClick={() => setCarouselIndex((p) => p - 1)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border text-foreground disabled:opacity-30 hover:border-accent/50 hover:text-accent transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1.5">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === carouselIndex ? 'bg-accent w-6' : 'bg-border w-2'}`}
                    />
                  ))}
                </div>
                <button
                  disabled={!canNext}
                  onClick={() => setCarouselIndex((p) => p + 1)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-card border border-border text-foreground disabled:opacity-30 hover:border-accent/50 hover:text-accent transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={carouselIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleTalents.map((talent, i) => (
                <motion.div
                  key={talent.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => navigate(freelancersTalentVault.fl_tv_button_url)}
                  className="group relative bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-28 flex items-center justify-center overflow-hidden">
                    {talent.image && (
                      <img src={talent.image} alt="" className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm brightness-50" />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-br ${talent.color} opacity-60`} />
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                    />
                    <div className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold text-white shadow-lg z-10">
                      {talent.initials}
                    </div>
                    <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${talent.available ? 'bg-[#2AA100]/20 border border-[#2AA100]/40 text-[#2AA100]' : 'bg-white/10 border border-white/20 text-white/60'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${talent.available ? 'bg-[#2AA100]' : 'bg-white/40'}`} />
                      {talent.available ? 'Available' : 'Busy'}
                    </div>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full border border-accent/40">
                        <Lock className="w-3.5 h-3.5 text-accent" />
                        <span className="text-white text-xs font-semibold">Unlock full profile</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-foreground text-[15px] leading-tight">{talent.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Briefcase className="w-3 h-3 shrink-0" />{talent.role}
                        </p>
                      </div>
                      <div className="shrink-0 flex flex-col items-center bg-accent/10 border border-accent/25 rounded-xl px-2.5 py-1.5">
                        <span className="text-[9px] text-accent font-bold uppercase tracking-widest leading-none">SS™</span>
                        <span className="text-xl font-bold text-accent leading-tight">{talent.skillstamp}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{talent.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{talent.experience}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {talent.skills.map((skill: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-0.5 text-[11px] rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">{skill}</span>
                      ))}
                    </div>
                    {talent.reviewCount > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1 rounded-full">
                          <span className="text-amber-400 text-xs leading-none">★</span>
                          <span className="text-amber-300 text-xs font-semibold leading-none">{talent.rating.toFixed(1)}</span>
                          <span className="text-amber-400/60 text-[11px] leading-none">({talent.reviewCount})</span>
                        </span>
                      </div>
                    )}
                    <div className="pt-1 border-t border-border/40 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#2AA100] font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />ID & Portfolio Verified
                      </div>
                      <Shield className="w-3.5 h-3.5 text-[#2AA100]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{freelancersTalentVault.fl_tv_cta_heading}</h2>
          <p className="text-lg text-muted-foreground">{freelancersTalentVault.fl_tv_cta_description}</p>
          <button
            onClick={() => navigate(freelancersTalentVault.fl_tv_cta_url)}
            className="bg-[#2AA100] text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
          >
            {freelancersTalentVault.fl_tv_cta_button}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
