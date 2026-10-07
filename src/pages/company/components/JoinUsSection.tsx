import React from "react";
import Images from "../../../components/constant/Images";
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useCMS } from '../../../hooks/useCMS';

const JoinUsSection: React.FC = () => {
  const { employers } = useCMS();
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="xl:max-w-[1200px] lg:max-w-[1200px] md:max-w-[900px] xl:w-full lg:w-[900px] md:w-[700px] sm:mx-auto mx-[2rem] bg-[#f5f5f5] rounded-[5px]">
      <motion.section
        ref={sectionRef}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
        variants={fadeInVariants}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="lg:flex md:flex gap-[4rem] justify-center items-center p-[2.5rem]"
      >
        <motion.div
          variants={fadeInVariants}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
          className="lg:w-[50%]"
        >
          <img src={Images.JoinUsImage} alt="" className="w-[500px]" />
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
          className="lg:w-[50%]"
        >
          <h2 className="lg:text-[38px] md:text-[24px] text-[20px] mt-[1rem] font-sans font-semibold tracking-[1px]">
            {employers.emp_join_heading}
            <span className="text-[#ee009d]"> {employers.emp_join_highlight}</span>
          </h2>
          <div className="py-[1rem]">
            <Link to={employers.emp_join_url}>
              <button className="font-sans text-[14px] font-medium text-[#FFFFFF] bg-[#EE009D] hover:bg-[#2AA100] py-[6px] px-[10px] rounded-[5px] justify-center">
                {employers.emp_join_button}
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.section>
    </section>
  );
};

export default JoinUsSection;
