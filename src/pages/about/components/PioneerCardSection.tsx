import React, { ReactElement } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface PioneerCardSectionProps {
    sliderImage: string;
    sliderTitle: string;
    sliderDescription: string;
    personImage: ReactElement;
    buttonName: string;
    link: string;
}

const PioneerCardSection: React.FC<PioneerCardSectionProps> = ({ sliderImage, sliderTitle, sliderDescription, personImage, buttonName, link }) => {
    return (
        <section className='flex items-center justify-center '>
            <section className="relative px-[2rem] py-[2rem]">
                <div className="z-[-20] w-full h-auto">
                    <img src={sliderImage} alt="slider" className="w-full object-cover rounded-[10px]" />
                </div>
                <section>
                    <div className="lg:w-[400px] lg:h-[250px] md:w-[300px] md:h-[250px] sm:w-[400px] sm:h-[220px] w-[90%] h-auto bg-white absolute xl:left-[20%] lg:left-[7.8%] md:left-[18%] sm:left-[5%] left-5 top-[80%] shadow-lg p-4 rounded-md transform -translate-y-1/2">
                        <div className="flex items-center gap-4 bg-[#fff] w-[50px] h-[50px] rounded-[50px] py-[0.2rem] shadow-lg px-[1rem] absolute top-[-10%] ">
                            <div>{personImage}</div>
                        </div>
                        <div className="mt-4">
                            <h1 className="text-[12px] sm:text-[16px] font-sans font-semibold tracking-wide">{sliderTitle}</h1>
                            <p className="text-xs sm:text-[14px] text-gray-500 mt-2 leading-[25px]">{sliderDescription}</p>
                        </div>
                        <div className="pt-4">
                            <Link to={link}>
                                <button className="text-sm sm:text-[14px] font-medium text-white bg-pink-500 flex items-center gap-2 justify-center hover:bg-green-600 py-1 px-2 rounded-lg">
                                    {buttonName} <FaArrowRightLong />
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    );
};

export default PioneerCardSection;
