import React from 'react'
import StarRating from '../../components/reusable/StarRating'

interface CardSlideProps {
  sliderImage: string;
  sliderTitle: string;
  sliderDescription: string;
  sliderName: string;
}

const CardSlider: React.FC<CardSlideProps> = ({
  sliderImage,
  sliderTitle,
  sliderDescription,
  sliderName,
}) => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-6 p-4">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={sliderImage}
          alt="slider"
          className="w-full max-w-md rounded-md object-cover"
        />
      </div>

      {/* Text/Card Section */}
      <div className="w-full lg:w-[400px] bg-white shadow-lg py-6 px-4 rounded-md flex flex-col justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold font-sans tracking-wide mt-2">
            {sliderTitle}
          </h1>
          <p className="text-sm text-[#646A73] font-normal mt-2">
            {sliderDescription}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <h6 className="text-sm font-semibold font-sans tracking-wide">
            {sliderName}
          </h6>
          <StarRating totalStars={5} />
        </div>
      </div>
    </section>
  )
}

export default CardSlider
