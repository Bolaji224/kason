import React, { FC, useState, useEffect } from 'react';
import Images from '../../../components/constant/Images';
import { Link } from 'react-router-dom';
import { useCMS } from '../../../hooks/useCMS';
import { safeJsonArray } from '../../../utils/cmsUtils';

interface SlideData {
  title: string;
  content: string;
  buttonText: string;
}

const DEFAULT_SLIDES: SlideData[] = [
  { title: 'Unlock Opportunities in Freelance Work', content: 'Hire Verified Virtual Assistants and Editors by the Hour', buttonText: 'Get Started' },
  { title: 'Explore Exciting Opportunities!', content: "Welcome to our job employment platform! Discover a world of career possibilities tailored to your skills and ambitions. Let's find your dream job together.", buttonText: 'Get Started' },
  { title: 'Discover Your Ideal Career Match', content: 'We believe that every individual has a unique set of talents and aspirations. Our platform matches you with the perfect job opportunity that aligns with your skills, interests, and career goals.', buttonText: 'Search Jobs Now' },
  { title: 'Join Our Thriving Community', content: 'Join a vibrant community of job seekers, industry professionals, and career experts. Share insights, network with peers, and stay inspired on your journey towards professional growth and success.', buttonText: 'Join Now' },
  { title: 'Your Journey Begins Here', content: "Take the first step towards a rewarding career. Whether you're a recent graduate, a seasoned professional, or exploring new opportunities, our platform has everything you need.", buttonText: 'Get Started Now' },
  { title: 'Stay Ahead in Your Career Journey', content: 'Access a wealth of career resources, including resume tips, interview guidance, and professional development advice. Stay informed and empowered as you navigate through your career path.', buttonText: 'Explore Resources' },
];

const HeroSlider: FC = () => {
  const { homepage } = useCMS();
  const slides = safeJsonArray<SlideData>(homepage.hero_slides_json, DEFAULT_SLIDES);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const slideInterval = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => {
      clearTimeout(slideInterval);
      clearTimeout(animationTimeout);
    };
  }, [currentSlide, slides.length]);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) setCurrentSlide(index);
  };

  const slide = slides[currentSlide] ?? slides[0];

  return (
    <div className='bg-[#FFF5F8] w-full py-4 mt-32 lg:mt-24 overflow-hidden'>
      <section className='flex items-center justify-center mt-[2rem] px-4 lg:px-8'>
        <div className='relative lg:max-h-[900px] flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-24 lg:gap-20 xl:gap-16 w-full mx-auto lg:mx-24'>

          {/* Text Content */}
          <div className="text-white slide-item lg:relative w-full lg:w-[50%] order-2 lg:order-1">

            <h1 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#1E2A38] mb-4 lg:mb-6 leading-tight text-center lg:text-left transition-all duration-500 transform ${
              isAnimating ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
            }`}>
              {slide.title}
            </h1>

            <div className="min-h-[120px] sm:min-h-[100px] lg:min-h-[140px]">
              <p className={`text-sm sm:text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 leading-relaxed text-center lg:text-left max-w-lg mx-auto lg:mx-0 transition-all duration-500 delay-100 transform ${
                isAnimating ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
              }`}>
                {slide.content}
              </p>
            </div>

            <div className={`py-[1rem] text-center lg:text-left transition-all duration-500 delay-200 transform ${
              isAnimating ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
            }`}>
              <Link to="/register">
                <button className="font-sans text-center text-[14px] sm:text-[16px] font-medium text-[#FFFFFF] bg-[#EE009D] hover:bg-[#2AA100] transition-colors duration-300 py-[6px] px-[10px] sm:py-[8px] sm:px-[12px] rounded-[5px] transform hover:scale-105">
                  {slide.buttonText}
                </button>
              </Link>
            </div>

            <div className="flex justify-center lg:justify-start space-x-2 mt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-[#EE009D] scale-110' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Image */}
          <div className={`w-full sm:w-[80%] lg:w-[50%] order-1 lg:order-2 flex justify-center lg:justify-end transition-all duration-500 transform ${
            isAnimating ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'
          }`}>
            <img
              src={Images.HeroImg}
              alt={`slide-${currentSlide}`}
              className='w-[70%] h-[100%] sm:h-[300px] lg:h-[100%] rounded-[5px] object-cover'
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default HeroSlider;
