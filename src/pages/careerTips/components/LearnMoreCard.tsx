import React from 'react'

interface LearnMoreCardProps {
    sliderImage: string;
    sliderTitle: string;
    sliderDescription: string;
}


const LearnMoreCard: React.FC <LearnMoreCardProps > = ({sliderImage, sliderTitle, sliderDescription}) => {
  return (
    <section className='flex items-center justify-center '>
         <section className=" relative px-[2rem] py-[2rem]">
            <div className="z-[-20] w-full h-auto ">
                <img src={sliderImage} alt="slider" className="w-full  object-cover rounded-[10px]" />
            </div>
           <section>
           </section>
        </section>
       </section>
  )
}

export default LearnMoreCard;