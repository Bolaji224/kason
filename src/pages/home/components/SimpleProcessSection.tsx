import React from 'react';
import { IoStatsChartSharp } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import Images from '../../../components/constant/Images';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface ProcessStep {
  id: number;
  imageKey: string;
  title: string;
  desc: string;
}

const STEP_IMAGES: Record<string, string> = {
  RegisterImage:      Images.RegisterImage,
  ApplyImage:         Images.ApplyImage,
  InterviewImage:     Images.InterviewImage,
  CongratulationImage: Images.CongratulationImage,
};

const DEFAULT_STEPS: ProcessStep[] = [
  { id: 1, imageKey: 'RegisterImage',       title: 'Registration',    desc: 'Build your reputation by creating a professional resume' },
  { id: 2, imageKey: 'ApplyImage',          title: 'Apply for Job',   desc: 'Find your dream job and send a resume according to your field.' },
  { id: 3, imageKey: 'InterviewImage',      title: 'Interview',       desc: 'Point out your skills and strengths at the interview.' },
  { id: 4, imageKey: 'CongratulationImage', title: 'Congratulations', desc: 'You have completed step by step; it is time for an employment contract.' },
];

const SimpleProcessSection: React.FC = () => {
  const { homepage } = useCMS();
  const steps = safeJsonArray<ProcessStep>(homepage.process_steps_json, DEFAULT_STEPS);

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.4 });

  return (
    <section className='py-[4rem] bg-[#fafcff] w-full'>
      <div className='text-center' ref={ref}>
        <motion.div>
          <div className='flex items-center justify-center'>
            <p className='text-[#2AA100] flex justify-center text-center items-center gap-2 py-[0.5rem] px-[0.5rem] w-[100px] rounded-[5px] bg-[#dbd7ff]'>
              <IoStatsChartSharp />{homepage.process_badge}
            </p>
          </div>
          <h1 className='lg:text-[38px] md:text-[28px] text-[20px] mt-[0.5rem] font-sans font-semibold tracking-[1px]'>
            {homepage.process_heading} <span className='text-[#EE009D]'>{homepage.process_highlight}</span>
          </h1>
          <p className='lg:text-[14px] md:text-[16px] text-[10px] text-[#1E2A38] font-sans font-normal mt-[0.5rem]'>
            {homepage.process_description}
          </p>
        </motion.div>
      </div>

      <section className='py-8 sm:py-[8rem] px-[4rem]'>
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:gap-[4rem] gap-[4rem] md:gap-[4rem]'>
          {steps.map((item) => {
            const imgSrc = STEP_IMAGES[item.imageKey] ?? Images.RegisterImage;
            return (
              <motion.div key={item.id} className='text-center'>
                <div className='mx-auto max-w-[150px]'>
                  <img src={imgSrc} alt={item.title.toLowerCase()} className='w-full h-auto object-cover' />
                </div>
                <div className='w-full'>
                  <h1 className='text-lg md:text-xl lg:text-2xl mt-2 font-semibold tracking-wide'>{item.title}</h1>
                  <p className='text-sm md:text-base text-gray-600 mt-1'>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className='pt-[4rem] text-center flex items-center justify-center'>
          <Link to={homepage.process_button_url || '/register'}>
            <motion.button className="text-sm sm:text-base font-medium text-white bg-[#ee009d] flex items-center gap-4 justify-center hover:bg-green-600 py-2 px-4 sm:py-3 sm:px-6 rounded-lg">
              {homepage.process_button_text} <FaArrowRightLong />
            </motion.button>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default SimpleProcessSection;
