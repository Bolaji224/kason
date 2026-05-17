import React, { useState } from 'react';
import Dropdown from '../../../components/reusable/DropDownButton';
import { FaSearch } from 'react-icons/fa';

const CareerTipsSearchSection: React.FC = () => {
  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('Full-time');
  

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobQuery(e.target.value);
  };

  // const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLocationQuery(e.target.value);
  // };

  // const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedOption(e.target.value);
  // };

 

  const handleSearch = () => {
    // Here you can perform the search based on jobQuery, locationQuery, and selectedOption
    console.log('Searching for job:', jobQuery, 'in location:', locationQuery, 'with option:', selectedOption);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="lg:flex md:flex  justify-center items-center w-full lg:mx-[2rem] mx-[2rem] py-[2rem] lg:space-y-0 md:space-y-0 space-y-[1rem] ">
      <div className="w-full relative">
  <input
    type="text"
    placeholder="Search the career tips article you want to find"
    value={jobQuery}
    onChange={handleJobChange}
    className="w-full p-4 rounded focus:outline-none bg-white shadow-md"
  />
  <FaSearch color='#2aa100' className="absolute right-4 font-extralight top-1/2 transform -translate-y-1/2 md:right-6 lg:right-8" />
</div>

       
      <div className='flex gap-2'>
      <button
          onClick={handleSearch}
          className="bg-[#EE009D] text-white lg:px-[2rem] md:px-[2rem] px-[2rem] lg:py-[0.8rem] md:py-[0.8rem] py-[0.5rem] lg:text-[18px] md:text-[18px] text-[12px] rounded-md hover:bg-[#2AA100] hover:tracking-[1px] focus:outline-none ease-in duration-300 "
        >
          Search
        </button>
        <Dropdown />
      </div>
      </div>
    </div>
  );
};

export default CareerTipsSearchSection;

