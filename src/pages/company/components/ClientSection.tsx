// src/components/Carousel.tsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Images from '../../../components/constant/Images';

const ClientSection: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 500,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024, // Adjust breakpoints as needed
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1
            }
          },

      {
        breakpoint: 768, // Adjust breakpoints as needed
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='bg-[#f5f5f5] w-full py-[0.5rem] mt-[-4rem]'>
      <Slider {...settings}>
        <div className="mt-2">
        <img src={Images.LeveragePrintTestimonialLogo} alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.RedLenceTestimonialLogo } alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.CollaborateAfricaTestimonialLogo } alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.BluwayTestimonialLogo} alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.TheWomenTestimonialLogo} alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.CoraTestimonialLogo } alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.BluwayTestimonialLogo} alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.TheWomenTestimonialLogo} alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.CoraTestimonialLogo } alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.BluwayTestimonialLogo} alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.TheWomenTestimonialLogo} alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.LeveragePrintTestimonialLogo} alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        <div className="mt-2">
        <img src={Images.RedLenceTestimonialLogo } alt="" className='w-[80px] border-[1px] rounded-[50px] h-[80px]' />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default ClientSection;

