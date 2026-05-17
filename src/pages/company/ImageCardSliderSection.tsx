import React, { FC } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSlider from './CardSlider';
import Images from '../../components/constant/Images';




const ImageCardSliderSection: FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000, // Adjust the autoplay speed
    speed: 2000, // Adjust the transition speed
    fade: true, // Use fade effect
    cssEase: 'linear', // Use linear easing for fade effect
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

  return (
    <div className=''>
      <Slider {...settings}>
      <CardSlider 
           sliderImage={Images.BluwayTestimonialLogo}
           sliderTitle='Amazing!'
           sliderDescription='"Partnering with Workason for virtual assistant services has been a tremendous asset to our pharmacy. They handle customer inquiries, manage inventory updates, and assist with scheduling appointments seamlessly. This has allowed our team to focus more on patient care and less on administrative tasks. Their support has made a noticeable difference in our daily operations, and we couldn’t be more pleased!"'
           sliderName='Bluway Pharmacy'
           />
            <CardSlider 
           sliderImage={Images.TheWomenTestimonialLogo}
           sliderTitle='Amazing!'
           sliderDescription='"Working with Workason has transformed our hair and wig service brand. Their virtual assistant services handle our bookings, respond to client inquiries, and manage our social media with such ease and efficiency. Our clients have noticed the difference, and so have we. It has truly helped us elevate our business!"'
           sliderName='The 360 Womean'
           />
            <CardSlider 
           sliderImage={Images.CoraTestimonialLogo}
           sliderTitle='Amazing!'
           sliderDescription="Working with Workason has been a game-changer for our Lounge and Shortlets. Their virtual assistant services have streamlined our reservations, managed customer inquiries efficiently, and allowed our staff to focus more on delivering exceptional dining experiences. It's like having an extra set of hands that’s always available and incredibly reliable. Highly recommend!"
           sliderName='Cora Shortlet and Lounge'
           />
           <CardSlider 
           sliderImage={Images.RedLenceTestimonialLogo}
           sliderTitle='Amazing!'
           sliderDescription="Since hiring Workason virtual assistant services, our co-working hub has seen a huge boost in efficiency. They manage bookings, handle inquiries, and support our members with anything they need. It's like having an extra team member who's always on top of things. Their help has made our workspace run smoother than ever, and we couldn't be happier!"
           sliderName='RedLens Center'
           />
            <CardSlider 
           sliderImage={Images.CollaborateAfricaTestimonialLogo}
           sliderTitle='Amazing!'
           sliderDescription="Bringing Workason on board for our investor’s club has been a remarkable decision. Their virtual assistant services handle member communications, organize events, and keep track of important schedules flawlessly. It’s like having a dedicated assistant who understands our needs perfectly. Their professionalism and efficiency have significantly enhanced our operations, making everything run smoothly. Highly recommend their services!"
           sliderName='Collaborate Affrica'
           />
      </Slider>
    </div>
  );
};

export default ImageCardSliderSection;
