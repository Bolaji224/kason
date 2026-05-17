import React from 'react';
import { Link } from 'react-router-dom';

interface JobDetailsProps {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applyLink: string;
  companyLogo: string;
  companyWebsite: string;
  reportLink: string; // Add reportLink to the interface
}

const JobDetails: React.FC<JobDetailsProps> = ({
  title,
  company,
  location,
  type,
  description,
  requirements,
  benefits,
  applyLink,
  companyWebsite,
  companyLogo,
  reportLink // Destructure reportLink
}) => {
  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-[4rem] py-[2rem]">
          <div className='flex items-center justify-between'>
          <h2 className="font-bold font-sans text-xl mb-2">{title}</h2>
          <img src={companyLogo} alt="Company Logo" className="lg:w-[100px] lg:h-[100px]  w-20 h-20 border-2 border-[#eee] rounded-md p-2" />
          </div>
        <p className="text-[#646A73] font-semilight tracking-[0.5px] font-sans text-base mb-2">{company}</p>
        <p className="text-[#646A73] font-semilight tracking-[0.5px]  text-base mb-2">{location} | {type}</p>
        <p className="text-[#646A73] font-semilight tracking-[0.5px] text-base mb-4">{description}</p>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Requirements:</h3>
          <ul className="list-disc list-inside">
            {requirements.map((requirement, index) => (
              <li key={index} className="text-[#646A73] font-semilight tracking-[0.5px] ">{requirement}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Benefits:</h3>
          <ul className="list-disc list-inside">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-[#646A73] font-semilight tracking-[0.5px] ">{benefit}</li>
            ))}
          </ul>
        </div>
        <div className='flex items-center justify-between'>
        <div className="">
          <Link to={companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">www.netflix.com/ng/</Link>
        </div>
          <div className=" flex gap-[1.5rem]">
            <Link to={reportLink} target="_blank" rel="noopener noreferrer">
              <button className="font-sans text-[14px] font-medium text-[#eeeeee] border-none bg-[#2AA100] hover:text-[#EE009D] py-[6px] px-[16px] rounded-[5px] ease-in duration-300">Report Job</button>
            </Link>
            <Link to={applyLink} target="_blank" rel="noopener noreferrer">
              <button className="font-sans text-[12px] font-medium text-[#ee009d] border-[1px] border-[#ee009d] hover:text-[#EE009D] py-[6px] px-[16px] rounded-[5px]">Apply Now</button>
            </Link>
          </div>
          </div>
      </div>
    </div>
  );
};

export default JobDetails;

