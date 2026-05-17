import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface CardSlideCareerProps {
    sliderImage: string;
    sliderTitle: string;
    sliderDescription: string;
}

const CardSliderCareer: React.FC<CardSlideCareerProps> = ({
    sliderImage,
    sliderTitle,
    sliderDescription,
}) => {
    return (
       <section className='flex items-center justify-center '>
         <section className=" relative px-[2rem] py-[2rem]">
            <div className="z-[-20] max-w-[1200px] h-[500px]">
                <img src={sliderImage} alt="slider" className=" w-[100%] h-[100%s] rounded-md" />
            </div>
           <section className='flex items-center justify-center'>
           <section className="flex flex-col absolute top-[20%] sm:flex-row sm:justify-between items-center gap-2 sm:gap-[20rem]">
                </section>
           </section>
           <section>
           <div className="lg:w-[700px] lg:h-[250px] md:w-[500px] md:h-[250px] sm:w-[400px] sm:h-[220px] w-[90%] h-auto bg-white absolute xl:left-[26%] lg:left-[16%] md:left-[18%] sm:left-[5%] left-5 top-[80%] shadow-lg p-4 rounded-md transform -translate-y-1/2">
                <div className="mt-4">
                    <h1 className="text-lg sm:text-xl font-semibold tracking-wide">{sliderTitle}</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">{sliderDescription}</p>
                </div>
                <div className="pt-4">
                    <Link to="/learn-more">
                        <button className="text-sm sm:text-base font-medium text-white bg-pink-500 flex items-center gap-2 justify-center hover:bg-green-600 py-2 px-4 rounded-lg">
                            Read more <FaArrowRightLong />
                        </button>
                    </Link>
                </div>
            </div>
           </section>
        </section>
       </section>
    );
}

export default CardSliderCareer;
