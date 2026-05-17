import React, { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

interface CareerTipsCardSectionProps {
    sliderImage: string;
    sliderTitle: string;
    sliderDescription: string;
}

const CareerTipSCardSection: React.FC<CareerTipsCardSectionProps> = ({ sliderImage, sliderTitle, sliderDescription }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Function to truncate the description to a specific length
    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    };

    return (
        <section className='flex items-center justify-center'>
            <section className="relative px-[2rem] py-[2rem]">
                <div className="z-[-20] w-full h-auto">
                    <img src={sliderImage} alt="slider" className="w-full object-cover rounded-[10px]" />
                </div>
                <section>
                    <div className="lg:w-[400px] lg:h-[250px] md:w-[300px] md:h-[250px] sm:w-[400px] sm:h-[220px] w-[90%] h-auto bg-white absolute xl:left-[20%] lg:left-[7.8%] md:left-[18%] sm:left-[5%] left-5 top-[80%] shadow-lg p-4 rounded-md transform -translate-y-1/2">
                        <div className="mt-4">
                            <h1 className="text-[12px] sm:text-[16px] font-sans font-semibold tracking-wide">{sliderTitle}</h1>
                            {/* Display truncated description */}
                            <p className="text-xs sm:text-[12px] text-gray-500 mt-2">
                                {truncateDescription(sliderDescription, 100)}
                            </p>
                        </div>
                        <div className="pt-4">
                            <button onClick={openModal} className="text-sm sm:text-[12px] font-medium text-white bg-pink-500 flex items-center gap-2 justify-center hover:bg-green-600 py-1 px-2 rounded-lg">
                                Read more <FaArrowRightLong />
                            </button>
                        </div>
                    </div>
                </section>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-[90%] md:w-[50%]">
                        <h2 className="text-xl font-bold mb-4">{sliderTitle}</h2>
                        {/* Display full description in the modal */}
                        <p className="text-sm text-gray-600">{sliderDescription}</p>
                        <button onClick={closeModal} className="mt-4 text-white bg-pink-500 py-2 px-4 rounded-lg hover:bg-green-600">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CareerTipSCardSection;
