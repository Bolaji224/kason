import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong, FaComments } from 'react-icons/fa6';
import ImageCardSliderSection from '../ImageCardSliderSection';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const WhatTheySayingSection: React.FC = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='lg:py-[10rem] py-[4rem]'>
      <motion.section
        ref={sectionRef}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
        variants={fadeInVariants}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className='lg:flex flex-col sm:flex-row items-center justify-center gap-[4rem] lg:px-[4rem] md:px-[2.5rem] px-[2rem]'
      >
        <div className='lg:w-[50%]'>
          <motion.p
            variants={fadeInVariants}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
            className='text-[#2AA100] flex justify-center text-center items-center gap-2 py-[0.5rem] px-[0.5rem] w-[150px] rounded-[5px] bg-[#D1FFBD]'
          >
            <FaComments />Testimonials
          </motion.p>
          <motion.h1
            variants={fadeInVariants}
            transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
            className='lg:text-[38px] md:text-[20px] text-[20px] mt-[1rem] font-sans font-semibold tracking-[1px]'
          >
            What are they <span className='text-[#EE009D]'>saying?</span>
          </motion.h1>
          <motion.p
            variants={fadeInVariants}
            transition={{ duration: 1.5, delay: 0.6, ease: 'easeInOut' }}
            className='lg:text-[14px] md:text-[14px] text-[10px] text-[#646A73] font-sans font-normal lg:w-[65%] md:w-[90%] mt-[1rem]'
          >
            Our customers have testified to the qaulity of our services and the support system we offer. Clientas say we are easy to talk to and very supportive.
          </motion.p>
          <motion.div
            variants={fadeInVariants}
            transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
            className='py-[1rem]'
          >
            <Link to="/testimonial">
              <button className="font-sans text-[14px] flex gap-4 items-center justify-center font-medium text-[#FFFFFF] bg-[#EE009D] hover:bg-[#2AA100] py-[6px] px-[10px] rounded-[5px]">
                View All <FaArrowRightLong />
              </button>
            </Link>
          </motion.div>
        </div>
        <motion.section
          variants={fadeInVariants}
          transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
          className='lg:w-[50%] md:w-[50%] w-[100%]'
        >
          <div className='w-[100%]'><ImageCardSliderSection /></div>
        </motion.section>
      </motion.section>
    </section>
  );
};

export default WhatTheySayingSection;
