import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


interface SuggestionCardrops {
    companyLogo: string;
    companyName: string;
    jobTitle: string;
    LocationName: string;
    // lastUpdated: Date;
    datePosted: string;
    jobDescription: string;
    slug?: string;
    payment: number;
    workType? : string,
    jobType? : string,
  }
  

const SuggestionCrad: React.FC <SuggestionCardrops>= ({workType, jobType, companyLogo, companyName, LocationName, jobTitle, jobDescription, payment, datePosted, slug}) => {

  
  const formattedDate = datePosted
    ? new Date(datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return (
    <section className='w-[300px] bg-white shadow-md border-[1px] rounded-[4px]'>
       <section className='p-[1rem]'>
          <div>
        <section className='flex gap-[1rem]'>
        <div className='flex items-center gap-[1.5rem]'>
         <img src={companyLogo} alt="Company Logo" className="w-10 h-10 border-2 border-[#eee] rounded-md p-2" />
         <div className='w-[150px]'>
         <h2 className='text-[14px]  font-semibold font-sans tracking-[0.5px] '>{companyName}</h2>
         <p className='text-[10px] text-[#646A73] font-sans font-semilight tracking-[0.5px] w-[100px]'>{LocationName}</p>
         </div>
         </div>
         <p className="text-[12px] text-[#646A73] font-sans font-semilight tracking-[0.5px] w-[100px]">{formattedDate}</p>
        </section>
        <div className='flex items-center gap-[0.5rem] mt-[1rem] '>
          <p className='text-[12px] text-center font-sans my-2 tracking-wider rounded-[4px] p-1 w-[60px] text-[#2AA100]  bg-[#D1FFBD]'>{workType}</p>
          <p className='text-[12px] text-center font-sans my-2 tracking-wider rounded-[4px] p-1 w-[80px] text-[#333]  bg-[#efcfe3]'>{jobType}</p>
        </div>
          <div className="flex items-center space-x-4 py-4 rounded-lg">
      <div>
        <h2 className="text-[16px] font-semibold font-sans">{jobTitle}</h2>
       
        <p className="text-[12px] mt-[0.5rem] text-[#646A73] font-sans font-semilight tracking-[0.5px]">{jobDescription}</p>
        <div className='mt-[2rem] flex justify-center space-x-[6rem]'>
        <p className="text-[#ee009d] mt-[0.5rem] text-[12px] font-sans font-semibold">${payment.toLocaleString()}<span className='text-[12px] text-[#2aa100]'>/month</span></p>
      <Link to={"/job-details/"+slug}>
              <button className="font-sans text-[12px] font-medium text-[#ee009d] border-[1px] border-[#ee009d] hover:text-[#EE009D] py-[4px] px-[10px] rounded-[5px] ">Apply Now</button>
            </Link>
      </div>
      
      </div>
    </div>
          </div>
       </section>
    </section>
  );
};

export default SuggestionCrad;
