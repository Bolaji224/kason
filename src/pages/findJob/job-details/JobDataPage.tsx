import React from 'react';
import JobDetails from './JobDetails';
import Images from '../../../components/constant/Images';
import Suggestion from './suggestion-jobs/Suggestion';
import { Link } from 'react-router-dom';
import FooterSection from '../../../components/reusable/FooterSection';
import JobDetailss from './JobDetails1';

const JobDataPage: React.FC = () => {
  const jobData = [
    {
      title: "Software Engineer",
      company: "Tech Company",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "We are looking for a skilled software engineer to join our team.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience in software development",
        "Proficiency in JavaScript and TypeScript",
        "Experience with React and Node.js"
      ],
      benefits: [
        "Health insurance",
        "401(k) matching",
        "Paid time off",
        "Flexible working hours"
      ],
      applyLink: "https://example.com/apply",
      companyWebsite: "https://www.netflix.com/ng/",
      reportLink: "hheehheh",
      companyLogo: Images.NetflixImage,
    }
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Job Listings</h1>
      {/* {jobData.map((job, index) => (
        <JobDetails key={index} {...job} />
      ))} */}
      <JobDetailss />
       <div className="mt-10">
        <div className='flex items-center justify-between border-[2px] max-w-6xl mx-auto px-[2rem] rounded'>
        <h2 className="text-2xl font-sans font-semibold my-4">Similar Jobs</h2>
        {/* <Link to='/find-job' target="_blank" rel="noopener noreferrer">
              <button className="font-sans text-[18px] font-medium text-[#2AA100] border-none hover:text-[#EE009D] py-[6px] px-[16px] rounded-[5px]">See All</button>
            </Link> */}
        </div>
        <Suggestion />
        <FooterSection />
      </div>
    </div>
  );
};

export default JobDataPage;
