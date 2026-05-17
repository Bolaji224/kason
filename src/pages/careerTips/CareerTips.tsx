import React from 'react'
import CareerTipsSearchSection from './components/CareerTipSearchSection'
import { BiChevronRight } from 'react-icons/bi'
import FooterSection from '../../components/reusable/FooterSection'
import CareerTipsHeroSection from './components/CareerTiptsHeroSection'
import PaginationSection from './components/pagination/PaginationSection'
import SmartGuideHeroSection from './components/SmartGuideHeroSection'

const CareerTips: React.FC = () => {
  return (
   <>
   <div className='mt-[4rem]'>
   <SmartGuideHeroSection/>
   </div>
   <div className='mt-[4rem] bg-[#f5f5f5] py-[4rem]'>
    <div className='flex gap-[1.5rem] xl:ml-[8rem] lg:ml-[8rem] md:ml-[2rem] ml-[2rem]'>
      <h2 className='flex gap-[2px] font-sans lg:text-[18px] md:text-[16px] sm:text-[12px] justify-center items-center text-[#2aa100]'>Home <BiChevronRight size={25} /></h2>
      <h2 className='flex gap-[2px] font-sans lg:text-[18px] md:text-[16px] sm:text-[12px] justify-center items-center text-[#2aa100]'>Career Tips  <BiChevronRight size={25} /></h2>
      <h2 className='lg:text-[18px] md:text-[16px] sm:text-[12px] text-[#646A73]'>Articles Career Tips</h2>
    </div>
    <div className='border-[2px] max-w-[1200px] rounded-md mx-auto mt-[2rem]'>
    <h2 className='lg:text-[18px] mt-[1rem] mb-[-1rem] ml-[2rem] md:text-[16px] sm:text-[12px] text-[#646A73]'>Search Articles</h2>
    <CareerTipsSearchSection />
    </div>
   </div>
   {/* <CareerTipsHeroSection /> */}
   <PaginationSection />
   <FooterSection />
   </>
  )
}

export default CareerTips