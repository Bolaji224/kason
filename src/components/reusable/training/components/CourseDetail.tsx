import React from 'react';

const CourseDetail = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Course Title</h1>
      <p className="text-gray-700 mb-6">Detailed description of the course goes here.</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">$49.99</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Enroll Now</button>
      </div>
    </div>
  );
};

export default CourseDetail;
