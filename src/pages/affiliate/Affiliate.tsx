import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Link2,
  BarChart2,
  Share2,
  DollarSign,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Briefcase,
  Globe,
  Network,
  HandCoins,
  TrendingUp,
  Zap,
} from 'lucide-react';
import FooterSection from '../../components/reusable/FooterSection';

const AffiliatePage: React.FC = () => {
  const navigate = useNavigate();

  const featureCards = [
    {
      icon: DollarSign,
      title: 'Earn Commissions',
      description:
        'Get paid for every qualifying referral that becomes a Workason customer or completes a qualifying transaction.',
    },
    {
      icon: Link2,
      title: 'Unique Referral Link',
      description:
        'Receive your own personalised referral link to share with your network across any channel.',
    },
    {
      icon: Globe,
      title: 'Refer Customers Online',
      description:
        'Share your link via social media, email, WhatsApp, or any online platform — refer people wherever they are.',
    },
    {
      icon: BarChart2,
      title: 'Track Your Referrals',
      description:
        'Monitor clicks, registrations, conversions and commissions in real time from your affiliate dashboard.',
    },
    {
      icon: CheckCircle,
      title: 'Workason Handles the Rest',
      description:
        'You introduce the customer. Workason handles onboarding, fulfilment, and support — you just earn.',
    },
  ];

  const whoCanJoin = [
    'Entrepreneurs',
    'Business owners',
    'Freelancers',
    'Professionals',
    'Consultants',
    'IT professionals',
    'Sales professionals',
    'Business coaches',
    'Industry professionals',
    'Community leaders',
    'Business networks',
    'Social media creators',
    'Other individuals with access to relevant customers and service providers',
  ];

  const steps = [
    {
      number: '01',
      title: 'JOIN',
      description: 'Sign up and receive your unique affiliate referral link.',
      icon: Network,
    },
    {
      number: '02',
      title: 'REFER',
      description:
        'Share Workason with customers, professionals, businesses and people in your network.',
      icon: Share2,
    },
    {
      number: '03',
      title: 'EARN',
      description:
        'When a qualifying referral becomes a successful Workason customer or completes a qualifying transaction, you earn a commission.',
      icon: HandCoins,
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ===== HERO ===== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#2AA100] rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-[#EE009D] rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-[#f5f5f5] border border-[#2AA100]/30 rounded-full px-5 py-2 mb-6">
            <Network className="w-4 h-4 text-[#2AA100]" />
            <span className="text-[#2AA100] font-sans font-semibold text-sm">
              Workason Affiliate Programme
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold font-sans tracking-wide leading-tight text-gray-900 mb-4">
            TURN YOUR NETWORK
            <br />
            <span className="text-[#ee009d]">INTO INCOME</span>
          </h1>

          <p className="text-lg md:text-xl font-sans font-semibold text-gray-700 mb-4">
            Workason Affiliate Programme — Connect People With the Services They Need
          </p>

          <p className="text-base md:text-lg text-gray-600 font-sans leading-relaxed max-w-3xl mx-auto mb-10">
            Earn commissions by referring customers to Workason. You know people who need reliable
            professionals and businesses that need customers. Workason provides the platform they need.
            You introduce them to Workason and earn a commission from successful referrals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="font-sans text-[14px] font-medium text-white bg-[#EE009D] hover:bg-[#2AA100] py-3 px-8 rounded-[5px] transition-colors duration-200 ease-in flex items-center justify-center gap-2"
            >
              JOIN THE WORKASON AFFILIATE PROGRAMME
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="#how-it-works"
              className="font-sans text-[14px] font-medium text-[#2AA100] border-2 border-[#2AA100] hover:bg-[#2AA100] hover:text-white py-3 px-8 rounded-[5px] transition-colors duration-200 ease-in flex items-center justify-center gap-2"
            >
              LEARN HOW IT WORKS
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHY JOIN ===== */}
      <section className="py-16 md:py-20 bg-[#f5f5f5]">
        <div className="xl:max-w-[1200px] lg:max-w-[1100px] md:max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-[38px] font-sans font-semibold tracking-wide text-gray-900 mb-4">
              YOUR NETWORK HAS VALUE.{' '}
              <span className="text-[#ee009d]">PUT IT TO WORK.</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 font-sans leading-relaxed max-w-3xl mx-auto">
              You don't need to build a marketplace or become a service expert. With the Workason
              Affiliate Programme, you can introduce people and businesses in your network to a platform
              designed to connect customers with professionals and service providers — and earn from
              successful referrals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((card, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-[5px] p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-[#2AA100]/10 flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-[#2AA100]" />
                </div>
                <h3 className="text-base font-sans font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 font-sans leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-16 md:py-20 bg-white">
        <div className="xl:max-w-[1200px] lg:max-w-[1100px] md:max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-[38px] font-sans font-semibold tracking-wide text-gray-900 mb-3">
              3 SIMPLE STEPS
            </h2>
            <p className="text-gray-600 font-sans">Everything you need to start earning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#EE009D] flex items-center justify-center mb-5">
                  <step.icon className="w-9 h-9 text-white" />
                </div>
                <span className="text-xs font-sans font-bold text-[#2AA100] tracking-widest uppercase mb-1">
                  {step.number}
                </span>
                <h3 className="text-xl font-sans font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 font-sans leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="md:hidden mt-6">
                    <ArrowRight className="w-6 h-6 text-[#EE009D] rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual flow */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {['JOIN', 'REFER', 'EARN'].map((label, i) => (
              <React.Fragment key={label}>
                <span className="font-sans text-[14px] font-medium text-white bg-[#2AA100] hover:bg-[#EE009D] py-2 px-6 rounded-[5px] transition-colors duration-200">
                  {label}
                </span>
                {i < 2 && <ArrowRight className="w-5 h-5 text-[#EE009D]" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMMISSION SECTION ===== */}
      <section className="py-16 md:py-20 bg-[#f5f5f5]">
        <div className="xl:max-w-[1200px] lg:max-w-[1100px] md:max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-[38px] font-sans font-semibold tracking-wide text-gray-900 mb-4">
              EARN FROM EVERY{' '}
              <span className="text-[#ee009d]">QUALIFYING REFERRAL</span>
            </h2>
            <p className="text-base text-gray-600 font-sans leading-relaxed max-w-2xl mx-auto">
              Earn a commission when someone you refer becomes a qualifying Workason customer or
              completes a qualifying transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { customers: 1, label: '1 customer' },
              { customers: 5, label: '5 customers', highlight: true },
              { customers: 10, label: '10 customers' },
            ].map((card) => (
              <div
                key={card.customers}
                className={`rounded-[5px] p-8 text-center border transition-all duration-200 ${
                  card.highlight
                    ? 'bg-[#EE009D] border-[#EE009D]'
                    : 'bg-white border-gray-200 hover:shadow-md'
                }`}
              >
                <p
                  className={`text-4xl font-bold font-sans mb-2 ${
                    card.highlight ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {card.customers}x
                </p>
                <p
                  className={`text-sm font-sans mb-4 ${
                    card.highlight ? 'text-white/90' : 'text-gray-600'
                  }`}
                >
                  {card.label}
                </p>
                <p
                  className={`font-sans text-[14px] font-semibold ${
                    card.highlight ? 'text-white' : 'text-[#2AA100]'
                  }`}
                >
                  YOUR COMMISSION{card.customers > 1 ? ` × ${card.customers}` : ''}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 font-sans text-sm">
            Commission rates are set by the platform and displayed in your affiliate dashboard.
            Your network can become an additional source of income.
          </p>
        </div>
      </section>

      {/* ===== WHO CAN JOIN ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="xl:max-w-[1200px] lg:max-w-[1100px] md:max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-[38px] font-sans font-semibold tracking-wide text-gray-900">
              IF YOU KNOW PEOPLE AND BUSINESSES,
            </h2>
            <h3 className="text-xl md:text-[28px] font-sans font-semibold text-[#ee009d] mt-2">
              YOU CAN BECOME AN AFFILIATE.
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {whoCanJoin.map((person, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#f5f5f5] border border-gray-200 rounded-[5px] px-4 py-3 hover:border-[#2AA100] hover:bg-white transition-colors duration-200"
              >
                <Briefcase className="w-4 h-4 text-[#EE009D] flex-shrink-0" />
                <span className="text-sm text-gray-800 font-sans font-medium leading-tight">
                  {person}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BIG OPPORTUNITY ===== */}
      <section className="py-16 md:py-20 bg-[#f5f5f5]">
        <div className="xl:max-w-[1100px] lg:max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-[38px] font-sans font-semibold tracking-wide text-gray-900 mb-8">
            DON'T THINK ONE CUSTOMER.{' '}
            <span className="text-[#ee009d]">THINK NETWORK.</span>
          </h2>

          <div className="space-y-4 mb-10 text-left max-w-2xl mx-auto">
            {[
              'How many people do you know who need professional services?',
              'How many businesses do you know looking for customers?',
              'How many professionals are within your network?',
            ].map((question, i) => (
              <p key={i} className="text-base md:text-lg text-gray-700 font-sans flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[#2AA100] flex-shrink-0 mt-0.5" />
                {question}
              </p>
            ))}
          </div>

          <p className="text-base text-gray-600 font-sans mb-10">
            Every relevant connection could become an opportunity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { text: 'YOU HAVE THE NETWORK.', border: 'border-[#2AA100]', color: 'text-[#2AA100]' },
              { text: 'WORKASON HAS THE PLATFORM.', border: 'border-[#EE009D]', color: 'text-[#EE009D]' },
              {
                text: "LET'S TURN CONNECTIONS INTO INCOME.",
                border: 'border-gray-400',
                color: 'text-gray-700',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white border-2 ${item.border} rounded-[5px] p-5`}
              >
                <p className={`font-sans font-semibold text-sm leading-relaxed ${item.color}`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="xl:max-w-[1200px] lg:max-w-[1100px] md:max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="bg-[#f5f5f5] rounded-[5px] p-10 md:p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#EE009D]/10 flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-[#EE009D]" />
            </div>

            <h2 className="text-2xl md:text-[38px] font-sans font-semibold tracking-wide text-gray-900 mb-4">
              READY TO TURN CONNECTIONS INTO INCOME?
            </h2>
            <p className="text-base md:text-lg text-gray-600 font-sans mb-8 leading-relaxed max-w-xl mx-auto">
              Join the Workason Affiliate Programme and start referring people and businesses today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="font-sans text-[14px] font-medium text-white bg-[#EE009D] hover:bg-[#2AA100] py-3 px-8 rounded-[5px] transition-colors duration-200 ease-in flex items-center justify-center gap-2"
              >
                JOIN THE AFFILIATE PROGRAMME
                <Zap className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="font-sans text-[14px] font-medium text-[#2AA100] border-2 border-[#2AA100] hover:bg-[#2AA100] hover:text-white py-3 px-8 rounded-[5px] transition-colors duration-200 ease-in"
              >
                LOG IN TO YOUR DASHBOARD
              </button>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default AffiliatePage;
