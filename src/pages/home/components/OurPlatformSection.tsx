import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import Images from "../../../components/constant/Images";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const OurPlatformSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section className="py-[4rem]">
      <section className="lg:flex items-center justify-center gap-[2rem] lg:px-[4rem] px-[2rem]" ref={ref}>
        <motion.div
          className="lg:w-[50%]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
          transition={{ duration: 1 }}
        >
          <p className="bg-[#D1FFBD] flex items-center font-sans font-mdeium text-[#2aa100]  gap-[0.2] w-[120px] text-center px-[0.5rem] py-[0.5rem] rounded-[5px] ">
            <MdOutlineTipsAndUpdates />
            Career Tips
          </p>
          <h1 className="lg:text-[38px] md:text-[28px] text-[20px] mt-[1rem] font-sans font-semibold tracking-[1px]">
            One platform for multiple <br />
            solutions. <span className="text-[#ee009d]">Your future.</span>
          </h1>
          <p className="lg:text-[14px] md:text-[14px] lg:w-[85%] text-[10px] text-[#646A73] font-sans tracking-[0.5px] font-normal mt-[1rem]">
            You can find various solutions just by accessing our platform. Because
            we are committed to maintaining the quality of user service.
          </p>
          <div className="py-[1rem]">
            <Link to="/career-tips">
              <button className="font-sans text-[14px] font-medium  text-[#FFFFFF]  bg-[#EE009D] hover:bg-[#2AA100] py-[8px] px-[10px] rounded-[5px] flex items-center justify-center gap-[0.5rem] ">
                Learn more <FaArrowRightLong />
              </button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-[50%] shadow-xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
          transition={{ duration: 1}}
        >
          <img src={Images.CareerImageTag} alt="platform" />
        </motion.div>
      </section>
    </section>
  );
};

export default OurPlatformSection;
