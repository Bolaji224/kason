import React, { useState } from 'react';
import CourseCard from './CourseCard';
import Videos from '../../../constant/Videos';
const courses = [
  {
    title: 'Introduction',
    description: 'WeWorkPerHour Virtual Assistant Intro.',
    price: 49.99,
    instructor: 'John Doe',
    videoUrl: Videos.CardOneVi,
    content: [
      'Introduction to Virtual Assistant',
      'JSX & Components',
      'State & Props',
      'Lifecycle Methods',
      'React Hooks',
      'Project: Build a To-Do App',
    ],
  },
  {
    title: 'Conclusion',
    description: 'in conclusion of our virtual assistant course',
    price: 59.99,
    instructor: 'Jane Smith',
    videoUrl: Videos.CardOneVi,

    content: [
      'TypeScript Basics',
      'Interfaces & Types',
      'Generics in TypeScript',
      'Advanced Types',
      'TypeScript with React',
      'Building a Large-Scale Project',
    ],
  },
  {
    title: 'ESSENTIAL TOOLS NEEDED AS A VIRTUAL ASSISTANT',
    description: 'Here are the list of the essential needed to become a virtual assistant',
    price: 59.99,
    instructor: "John",
    videoUrl: Videos.CardOneVi,
    content: [
      'TypeScript Basics',
      'Interfaces & Types',
      'Generics in TypeScript',
      'Advanced Types',
      'TypeScript with React',
      'Building a Large-Scale Project',
    ],
  },
  {
    title: 'HOW TO BUILD THE PERFECT PORTFOLIO AS A VIRTUAL ASSISTANT',
    description: 'Here are the .',
    price: 59.99,
    instructor: 'Jane Smith',
    videoUrl: Videos.CardOneVi,
    content: [
      'TypeScript Basics',
      'Interfaces & Types',
      'Generics in TypeScript',
      'Advanced Types',
      'TypeScript with React',
      'Building a Large-Scale Project',
    ],
  },
  {
    title: 'Advanced TypeScript',
    description: 'Master TypeScript for large-scale applications.',
    price: 59.99,
    instructor: 'Jane Smith',
    videoUrl: Videos.CardOneVi,
    content: [
      'TypeScript Basics',
      'Interfaces & Types',
      'Generics in TypeScript',
      'Advanced Types',
      'TypeScript with React',
      'Building a Large-Scale Project',
    ],
  },
  {
    title: 'Advanced TypeScript',
    description: 'Master TypeScript for large-scale applications.',
    price: 59.99,
    instructor: 'Jane Smith',
    videoUrl: Videos.CardOneVi,
    content: [
      'TypeScript Basics',
      'Interfaces & Types',
      'Generics in TypeScript',
      'Advanced Types',
      'TypeScript with React',
      'Building a Large-Scale Project',
    ],
  },
  {
    title: 'Advanced TypeScript',
    description: 'Master TypeScript for large-scale applications.',
    price: 59.99,
    instructor: 'Jane Smith',
    videoUrl: Videos.CardOneVi,
    content: [
      'TypeScript Basics',
      'Interfaces & Types',
      'Generics in TypeScript',
      'Advanced Types',
      'TypeScript with React',
      'Building a Large-Scale Project',
    ],
  },
  {
    title: 'Advanced TypeScript',
    description: 'Master TypeScript for large-scale applications.',
    price: 59.99,
    instructor: 'Jane Smith',
    videoUrl: Videos.CardOneVi,
    content: [
      'TypeScript Basics',
      'Interfaces & Types',
      'Generics in TypeScript',
      'Advanced Types',
      'TypeScript with React',
      'Building a Large-Scale Project',
    ],
  },
  {
    title: 'Advanced TypeScript',
    description: 'Master TypeScript for large-scale applications.',
    price: 59.99,
    instructor: 'Jane Smith',
    videoUrl: Videos.CardOneVi,
    content: [
      'TypeScript Basics',
      'Interfaces & Types',
      'Generics in TypeScript',
      'Advanced Types',
      'TypeScript with React',
      'Building a Large-Scale Project',
    ],
  },
];
const COURSES_PER_PAGE = 8; // Number of courses per page

const CourseList = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const totalCourses = courses.length;
  const totalPages = Math.ceil(totalCourses / COURSES_PER_PAGE); // Calculate total pages

  // Calculate start and end index for slicing the courses array
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const currentCourses = courses.slice(startIndex, startIndex + COURSES_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-[8rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentCourses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            description={course.description}
            price={course.price}
            instructor={course.instructor}
            videoUrl={course.videoUrl}
            content={course.content}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseList;
