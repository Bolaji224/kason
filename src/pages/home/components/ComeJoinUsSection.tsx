import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { httpPostWithoutToken } from '../../../utils/http_utils';
import { Link } from 'react-router-dom';

const ComeJoinUsSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const toast = useToast();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const response = await httpPostWithoutToken('newsletter', { email });
    setIsSubmitting(false);

    if (response.status === 'success') {
      toast({
        status: 'success',
        title: '🎉 Subscribed successfully!',
        description: 'Check your email for your subscriber token.',
        isClosable: true,
        duration: 6000,
      });
      setEmail('');
      setSubscribed(true);
      setError(null);
    } else {
      setError(response.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
      transition={{ duration: 2 }}
      className="xl:max-w-[1200px] lg:max-w-[1200px] md:max-w-[900px] lg:w-full md:w-[750px] lg:mx-auto mx-[2rem] bg-white rounded-[5px]"
    >
      <section className="lg:flex md:flex gap-[4rem] justify-center items-center p-[2.5rem]">
        <div>
          <h2 className="lg:text-[38px] md:text-[24px] text-[20px] mt-[1rem] font-sans font-semibold tracking-[1px]">
            Come join us and don't miss our latest{" "}
            <Link to="/find-job">
              <span className="text-[#ee009d]">job vacancies</span>
            </Link>
          </h2>
        </div>
        <div>
          <p className="lg:text-[14px] md:text-[14px] text-[10px] text-[#646A73] font-sans font-normal mt-[0.5rem]">
            By subscribing to our newsletter, you're taking a smart step toward
            transforming your job search. Stay informed with valuable tips, the
            latest opportunities, and insights that make finding your next role
            faster, easier, and more transparent. Join us today and be the first
            to get updates that empower your career.
          </p>

          {/* ✅ Show success message after subscribing */}
          {subscribed ? (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-700 font-semibold text-sm">
                🎉 You're subscribed!
              </p>
              <p className="text-green-600 text-xs mt-1">
                Check your email for your unique subscriber token.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              <form onSubmit={handleSubmit} className="relative mt-[1rem]">
                <div className="relative overflow-hidden">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="lg:w-[82%] md:w-[100%] lg:text-[16px] md:text-[12px] w-[100%] px-[1rem] py-[0.6rem] rounded-[5px] focus:outline-none bg-[#f5f1f1] shadow-m"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute inset-y-0 xl:right-[5.5rem] lg:right-[4.5rem] font-sans right-[0.5rem] bg-[#EE009D] text-[13px] text-white px-4 my-[8px] rounded-[5px] disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Subscribe"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </motion.section>
  );
};

export default ComeJoinUsSection;