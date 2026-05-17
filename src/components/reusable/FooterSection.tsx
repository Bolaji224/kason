import React from 'react';
import Images from '../constant/Images';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { FaXTwitter } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { UilEnvelope } from '@iconscout/react-unicons';
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FooterSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const navigate = useNavigate();

  // const location = useLocation()
  // let currentPath = location.pathname

  // const linkClass = (path: string) =>  `text-grey-600 pb-1 ${
  //   currentPath = path ? "border-b-2 border-[#2AA100] text-[#2AA100]" : ""
  // }`

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
      transition={{ duration: 2 }}
      className='bg-[#ffffff]'
    >
    <section className='bg-repeat relative mt-4 bg-[#e8f5e8] bg-[length:60%_20%] lg:bg-[length:50%_100%]' 
  style={{
    backgroundImage: `url(${Images.FooterBg})`,
  }}>
  {/* Dark green overlay */}
  <div className="absolute inset-0 bg-[#0a2414] lg:opacity-80 opacity-100 pointer-events-none"></div>
  
  {/* Content wrapper with relative positioning */}
  <div className="relative z-10">
    <div className='lg:flex justify-center lg:px-[1rem] md:px-4 py-[8rem] xl:gap-[4rem] lg:gap-[2rem] space-y-[2rem]'>
      <div className='w-72 md:w-1/2 lg:mx-0 bg-white rounded-xl lg:w-[50%] lg:px-0 px-2 '>
        <Link to="/" className="logo">
          <img src={Images.Logo} alt="logo" className="w-32 md:w-40 h-auto" />
        </Link>
        <p className='text-lg lg:text-xl font-semibold pb-3 md:text-base lg:w-[50%] px-4 text-[#1E2A38]'>
          Explore thousands of job opportunities with all the information you need, and manage all your job applications from start to finish.
        </p>
        <div className='w-full md:w-1/8 px-4 lg:w-auto mb-8'>
        <ul className='text-sm lg:flex items-center gap-4'>
  <li className='flex items-center gap-2 text-[#1E2A38]'>
    <UilEnvelope size={30} className="rounded-full" color="#0a2414" />
    workason.com
  </li>

  <li className='flex items-center gap-2 text-[#1E2A38]'>
    <UilEnvelope size={30} className="rounded-full" color="#0a2414" />
    contact@workason.com
  </li>

  <li className='flex items-center gap-2 text-[#1E2A38]'>
    <FaWhatsapp size={25} color="#25D366" />
    WhatsApp: +447344616797
  </li>
</ul>
      </div>
        <div className="flex mt-4 mb-3 space-x-4 bg-white rounded-xl px-4 py-2">
          <Link to="/">
          <FaFacebook size={20} className="rounded-full" color="#1E2A38" />
          </Link>
          <Link to="/">
          <FaLinkedin size={20} className="rounded-full" color="#1E2A38" />
          </Link>
        <Link to="https://www.instagram.com/weworkperhourng">
        <FaInstagram size={20} className="rounded-full" color="#1E2A38" />
        </Link>
         <Link to="https://x.com/weworkperhour"> <FaXTwitter size={20} className="rounded-full" color="#1E2A38" /></Link>
        </div>
      </div>
      
      <div className='border-[1px] lg:hidden block border-[#f2fcef] w-[100%]'/>
      <div className='w-full md:w-1/8 lg:w-auto lg:px-0 px-[2rem]'>
        <h2 className='text-white text-base md:text-lg font-semibold mb-4'>Company</h2>
        <ul className='text-sm'>
          <li><Link to="/testimonial" className='text-white'>Testimonial</Link></li>
          <li className='py-[1rem]'><Link to="/for-company-footer" className='text-white'>For Jobseeker</Link></li>
          <li><Link to="/for-company-footer" className='text-white'>For Company</Link></li>
        </ul>
      </div>
      <div className='border-[1px] lg:hidden block border-[#f2fcef] w-[100%]'/>
      <div className='w-full md:w-1/2 lg:w-auto lg:px-0 px-[2rem]'>
        <h2 className='text-white text-base md:text-lg font-semibold mb-4'>Product</h2>
        <ul className='text-sm'>
          <li><Link to="/career-tips"  className='text-white'>SmartGuide </Link></li>
          <li className='py-[1rem]'><Link to="/smart-start" className='text-white'>Smartstart</Link></li>
          <li><Link to="/company" className='text-white'>Skillstamp</Link></li>
        </ul>
      </div>
      <div className='border-[1px] lg:hidden block border-[#f2fcef] w-[100%]'/>
      <div className='w-full md:w-1/4 lg:w-auto lg:px-0 px-[2rem]'>
        <h2 className='text-white text-base md:text-lg font-semibold mb-4'>Resources</h2>
        <ul className='text-sm'>
          <li><Link to="/faq" className='text-white'>FAQ</Link></li>
          <li className='py-[1rem]'><Link to="/about" className='text-white'>About Us</Link></li>
          <li><Link to="/contact" className='text-white'>Contact us</Link></li>
        </ul>
      </div>
      <div className='w-full md:w-1/8 px-4 lg:w-auto mt-8'>
  {/* Add addresses here */}
  <div className='mt-4 text-sm text-[#FFFFFF]'>
    <p className='font-semibold'>Operations Office (Nigeria):</p>
    <p>Lagos, Nigeria</p>
    
    <p className='font-semibold mt-3'>Head Office (UK):</p>
    <p>Office 123, Unit 5</p>
    <p>399-405 Oxford Street, Mayfair</p>
    <p>London W1C 2BU</p>
  </div>
</div>
    </div>
    <div className='xl:max-w-[1200px] lg:max-w-[900px] mx-auto border-[1px] border-[#f2fcef] mt-[-4rem]'/>
    <section className='flex lg:flex-row xl:flex-row flex-col-reverse md:flex justify-center xl:gap-[20rem] lg:gap-[4rem] py-[4rem] lg:px-0 px-[2rem]'>

      <p className='text-sm md:text-base sm:mb-0 lg:mt-0 xl:mt-0 mt-[2rem] text-white'>@Copyright Workason 2025. All rights reserved.</p>
      <div className='lg:flex xl:gap-[4rem] lg:gap-[2rem] justify-center lg:space-y-0 space-y-[2rem]'> 
       <Link to="/privacy-policy">
       <h2 className='text-white text-[14px] md:text-lg font-semibold'>Privacy Policy</h2>
       </Link>
        <h2
          onClick={() => navigate("/Terms")}   
        className='text-white text-base md:text-lg font-semibold cursor-pointer'>Terms & Conditions</h2>
        <h2 
        onClick={() => navigate("/cookie-policy")} 
         className='text-white text-base md:text-lg font-semibold cursor-pointer'>Cookies Policy</h2>
      </div>
    </section>

    
  </div>
</section>
    </motion.section>
  );

  };

export default FooterSection;
