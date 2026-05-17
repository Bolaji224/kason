import React, { useEffect, useState } from 'react';
import HeroSlider from './components/HeroSlider';
import JobSearch from './components/JobSearch';
import ProductivitySection from './components/ProductivityScetion';
import FindJobSection from './components/FindJobSection';
import OneStepSection from './components/OneStepSection';
import SimpleProcessSection from './components/SimpleProcessSection';
import OurPlatformSection from './components/OurPlatformSection';
import ComeJoinUsSection from './components/ComeJoinUsSection';
import FooterSection from '../../components/reusable/FooterSection';
import ReviewSection from './components/ReviewSection';
import WorkasonLanding from './components/WorkasonLanding';
import WorkasonSection from './components/Verified';



export const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup immediately on load
    setShowPopup(true);

    // Hide after 20 seconds
    const initialHide = setTimeout(() => {
      setShowPopup(false);
    }, 20000);

    // Re-show every 30 seconds, and hide again after 20 seconds
    const interval = setInterval(() => {
      setShowPopup(true);

      const hideTimeout = setTimeout(() => {
        setShowPopup(false);
      }, 10000); // hide after 20s

      return () => clearTimeout(hideTimeout); // clean up timeout inside interval
    }, 20000); // re-show every 30s

    return () => {
      clearTimeout(initialHide);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="">
        <HeroSlider />
      </div>
      <div className="w-full my-8 bg-[#f5f5f5] py-[4rem]">
        <h1 className="lg:text-[38px] md:text-[28px] text-center font-semibold font-sans mb-4 tracking-[1px]">
          FIND A JOB AND <span className="text-[#1E2A38]">BECOME A PROFESSIONAL</span> <br />
          IN YOUR <span></span>DREAM FIELD.
        </h1>
        <p className="text-center text-md text-[#646A73] tracking-[0.8px] font-sans font-normal">
          We offer thousands of jobs vacancies right now
        </p>
        <JobSearch />
        <p className="lg:ml-[8rem] lg:text-start md:ml-[2.5rem] md:text-start sm:text-center text-[#646A73] tracking-[0.8px] font-sans font-light">
          Browse job offers by Category or Location
        </p>
      </div>
      <FindJobSection />
      <ProductivitySection />
      <OneStepSection />
      <SimpleProcessSection />
      <WorkasonLanding/>
      <OurPlatformSection />   
      <WorkasonSection/>
      <ReviewSection/>
      <ComeJoinUsSection />
      <FooterSection />
    </>
  );
};
