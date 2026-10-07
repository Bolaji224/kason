import React from "react";
import { FaArrowRightLong, FaCamera, FaUsersViewfinder } from "react-icons/fa6";
import { FaChalkboardTeacher, FaPencilAlt, FaUserFriends } from "react-icons/fa";
import Images from "../../../components/constant/Images";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useCMS } from "../../../hooks/useCMS";
import { safeJsonArray } from "../../../utils/cmsUtils";

interface ServiceCard {
  iconKey: string;
  title: string;
  description: string;
}

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  teacher: <FaChalkboardTeacher className="text-pink-500 text-3xl" />,
  pencil:  <FaPencilAlt className="text-red-500 text-3xl" />,
  users:   <FaUserFriends className="text-green-600 text-3xl" />,
  camera:  <FaCamera className="text-blue-500 text-3xl" />,
};

const DEFAULT_SERVICES: ServiceCard[] = [
  { iconKey: 'teacher', title: 'Courses for Sale',         description: 'Learn practical skills from top experts online' },
  { iconKey: 'pencil',  title: 'Custom Editing',           description: 'Professional editing services for your in-house needs.' },
  { iconKey: 'users',   title: 'Hire Freelancers',         description: 'Find top-rated editors and creatives worldwide.' },
  { iconKey: 'camera',  title: 'Custom Virtual Assistant', description: 'Request tailored support from verified virtual assistants for administrative tasks, research, scheduling, email management, and other business needs.' },
];

const OneStepSection: React.FC = () => {
  const { homepage } = useCMS();
  const services = safeJsonArray<ServiceCard>(homepage.services_cards_json, DEFAULT_SERVICES);

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <section className="py-[4rem]">
      <section ref={ref}>
        <div className="lg:flex items-center justify-center gap-[4rem] lg:px-[4rem] px-[2rem]">
          <motion.div
            className="lg:w-[50%]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
            transition={{ duration: 1 }}
          >
            <img src={Images.OneStepImage} alt="onestep" className="rounded-[5px]" />
          </motion.div>
          <motion.div
            className="lg:w-[50%] py-[rem]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
            transition={{ duration: 1 }}
          >
            <p className="bg-[#D1FFBD] flex items-center font-sans font-medium text-[#2aa100] gap-2 w-[110px] text-center px-[0.5rem] py-[0.5rem] rounded-[5px]">
              <FaUsersViewfinder />{homepage.career_badge}
            </p>
            <h1 className="lg:text-[38px] md:text-[28px] text-[20px] mt-[1rem] font-sans font-semibold tracking-[1px]">
              {homepage.career_heading} <br />
              change <span className="text-[#3133ca]">{homepage.career_highlight}</span>
            </h1>
            <p className="lg:text-[14px] md:text-[14px] lg:w-[85%] text-[10px] text-[#646A73] font-sans tracking-[0.5px] font-normal mt-[1rem]">
              {homepage.career_description}
            </p>
            <div className="py-[1rem]">
              <Link to={homepage.career_button_url || '/career-tips'}>
                <button className="font-sans text-[14px] font-medium text-[#FFFFFF] bg-[#EE009D] hover:bg-[#2AA100] py-[8px] px-[10px] rounded-[5px] flex items-center justify-center gap-[0.5rem]">
                  {homepage.career_button_text} <FaArrowRightLong />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
          transition={{ duration: 1 }}
        >
          <section className="py-12 px-4 md:px-16 bg-white">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
              {homepage.services_heading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((item, index) => (
                <div
                  key={index}
                  className="bg-neutral-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="mb-4">
                    {SERVICE_ICONS[item.iconKey] ?? SERVICE_ICONS['teacher']}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </section>
    </section>
  );
};

export default OneStepSection;
