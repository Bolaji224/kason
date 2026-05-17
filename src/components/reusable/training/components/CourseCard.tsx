import React, { useState } from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  price: number;
  instructor: string;
  videoUrl: string;
  content: string[]; // Array of course lessons or chapters
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, price, instructor, videoUrl, content }) => {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => setShowContent(!showContent);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
      {/* Video Preview */}
      <div className="h-48 bg-black">
        <video className="w-full h-full" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Course Overview */}
      <div className="p-4">
        <h3 className="text-[18px] font-semibold lowercase mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{description}</p>
        <p className="text-lg font-semibold my-2">${price}</p>
        <p className="text-sm text-gray-700 mb-2">Instructor: {instructor}</p>
        
        {/* Enroll Button */}
        <button className="mt-4 w-full bg-[#EE009D] text-white py-2 rounded">Enroll Now</button>

        {/* Toggle Course Content */}
        <button 
          className="mt-4 w-full bg-gray-100 text-[#2AA100] py-2 rounded"
          onClick={toggleContent}
        >
          {showContent ? 'Hide Course Content' : 'View Course Content'}
        </button>

        {/* Collapsible Course Content */}
        {showContent && (
          <ul className="mt-4 bg-gray-50 p-4 rounded-lg">
            {content.map((lesson, index) => (
              <li key={index} className="py-2 border-b last:border-b-0">
                {lesson}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
