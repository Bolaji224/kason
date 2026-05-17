import React, { FC } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSliderCareer from './CardSliderCareer';
import Images from '../../../components/constant/Images';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CareerTipsHeroSection: FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 2000,
    fade: true,
    cssEase: 'linear',
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInVariants}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <Slider {...settings}>
        <CardSliderCareer 
          sliderImage={Images.CareerSliderImageOne}
          sliderTitle="CAREER TIPS ON BECOMING A VIRTUAL ASSISTANT
"
          sliderDescription="Becoming a virtual assistant (VA) offers flexibility, a diverse workload, the opportunity to manage a variety of tasks, and the potential to carve out a rewarding career in a growing field. Whether you're starting out or enhancing your..."
        />
        <CardSliderCareer 
          sliderImage={Images.CareerSliderImageTwo}
          sliderTitle="CAREER TIPS ON BECOMING A VIRTUAL ASSISTANT
"
          sliderDescription="Becoming a virtual assistant (VA) offers flexibility, a diverse workload, the opportunity to manage a variety of tasks, and the potential to carve out a rewarding career in a growing field. Whether you're starting out or enhancing your..."
         
        />
        <CardSliderCareer 
          sliderImage={Images.CareerSliderImageThree}
          sliderTitle="CAREER TIPS ON BECOMING A VIRTUAL ASSISTANT
"
          sliderDescription="Becoming a virtual assistant (VA) offers flexibility, a diverse workload, the opportunity to manage a variety of tasks, and the potential to carve out a rewarding career in a growing field. Whether you're starting out or enhancing your..."
        />
      </Slider>
      </motion.div>
  );
};

export default CareerTipsHeroSection;
