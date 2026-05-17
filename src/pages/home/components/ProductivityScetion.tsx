import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const ProductivitySection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
      transition={{ duration: 1.5 }}
      className="bg-[#F5F5F5] lg:py-[8rem] md:py-[4rem] py-[2rem] flex items-center justify-center"
    >
      <section className='lg:flex items-center justify-center lg:gap-[15rem] lg:px-[2rem]'>
        <h1 className='lg:text-[38px] md:text-[32px] text-[24px] font-sans text-center font-semibold tracking-[1px]'>
          <span className='text-[#EE009D]'>Our productivity</span> performance
        </h1>
        <section className='flex items-center justify-center gap-[2rem] lg:mt-0 md:mt-[2rem] mt-[2.5rem]'>
          <div className='text-center'>
            <h6 className='text-[14px] text-[#646A73] font-sans font-normal'>Jobs</h6>
            <h1 className='text-[#000000] font-sans font-bold lg:text-[38px] md:text-[28px] text-[24px]'>
              <span className='text-[#EE009D] font-extrabold'>+</span>20
            </h1>
          </div>
          <div className="border-[1px] h-[50px] border-[#EE009D] opacity-[0.5]"/>
          <div className='text-center'>
            <h6 className='text-[14px] text-[#646A73] font-sans font-normal'>Start Ups</h6>
            <h1 className='text-[#000000] font-sans font-bold lg:text-[38px] md:text-[28px] text-[24px]'>
              <span className='text-[#EE009D] font-extrabold'>+</span>10
            </h1>
          </div>
          <div className="border-[1px] h-[50px] border-[#EE009D] opacity-[0.5]"/>
          <div className='text-center'>
            <h6 className='text-[14px] text-[#646A73] font-sans font-normal'>Recruitment</h6>
            <h1 className='text-[#000000] font-sans font-bold lg:text-[38px] md:text-[28px] text-[24px]'>
              <span className='text-[#EE009D] font-extrabold'>+</span>50
            </h1>
          </div>
        </section>
      </section>
    </motion.section>
  );
};

export default ProductivitySection;
