import React, { useState } from 'react';

interface StarRatingProps {
  totalStars: number;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars }) => {
  const [rating, setRating] = useState<number>(0);

  const handleClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => (
        <button
          key={index}
          className={`focus:outline-none ${
            index < rating ? 'text-yellow-500' : 'text-[#2aa100]'
          }`}
          onClick={() => handleClick(index)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
