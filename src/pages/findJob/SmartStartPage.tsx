import React from 'react';
import FooterSection from '../../components/reusable/FooterSection';
import SmartStartSection from './job-details/SmartStart';
import SmartStartPurpose from './components/WhySmartstart';

const SmartStartPage: React.FC = () => {
  return (
    <>
   <div className='mt-[8rem] lg:mt-[4rem]'>
    <SmartStartSection />
    <SmartStartPurpose/>
      {/* <div className={`mt-[4rem] py-[4rem] ${isFindJobPage ? 'bg-[#f5f5f5]' : 'bg-[#ffffff]'}`}>
        <div className='flex gap-[1.5rem] xl:ml-[8rem] lg:ml-[8rem] md:ml-[2rem] ml-[2rem]'>
          <h2 className='flex gap-[2px] font-sans lg:text-[18px] md:text-[16px] sm:text-[12px] justify-center items-center text-[#2aa100]'>
            Home <BiChevronRight size={25} />
          </h2>
          <h2 className='lg:text-[18px] md:text-[16px] sm:text-[12px] text-[#646A73]'>Find Jobs</h2>
        </div>
        <div className='border-[2px] max-w-[1200px] rounded-md mx-auto mt-[2rem]'>
          <h2 className='lg:text-[18px] mt-[1rem] mb-[-1rem] ml-[2rem] md:text-[16px] sm:text-[12px] text-[#646A73]'>Search Jobs</h2>
          <FindJobSearchSection />
        </div>
      </div> */}
      {/* <PaginationPage /> */}
      <div>
        <FooterSection />
      </div>
      </div>
    </>
  );
};

export default SmartStartPage;
