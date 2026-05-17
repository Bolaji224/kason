import React from 'react';

const Reviews = () => {
  const reviews = [
    { name: 'Alice', rating: 5, comment: 'Great course!' },
    { name: 'Bob', rating: 4, comment: 'Very informative.' },
    // More reviews
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <p className="font-bold">{review.name}</p>
          <p>{'⭐'.repeat(review.rating)}</p>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
