import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface ProductivityStat {
  label: string;
  value: string;
}

const DEFAULT_STATS: ProductivityStat[] = [
  { label: 'Jobs',        value: '20' },
  { label: 'Start Ups',   value: '10' },
  { label: 'Recruitment', value: '50' },
];

const ProductivitySection: React.FC = () => {
  const { homepage } = useCMS();
  const stats = safeJsonArray<ProductivityStat>(homepage.productivity_stats_json, DEFAULT_STATS);

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

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
          <span className='text-[#EE009D]'>{homepage.productivity_highlight}</span> {homepage.productivity_heading}
        </h1>
        <section className='flex items-center justify-center gap-[2rem] lg:mt-0 md:mt-[2rem] mt-[2.5rem]'>
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <div className="border-[1px] h-[50px] border-[#EE009D] opacity-[0.5]" />
              )}
              <div className='text-center'>
                <h6 className='text-[14px] text-[#646A73] font-sans font-normal'>{stat.label}</h6>
                <h1 className='text-[#000000] font-sans font-bold lg:text-[38px] md:text-[28px] text-[24px]'>
                  <span className='text-[#EE009D] font-extrabold'>+</span>{stat.value}
                </h1>
              </div>
            </React.Fragment>
          ))}
        </section>
      </section>
    </motion.section>
  );
};

export default ProductivitySection;
