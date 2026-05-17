import { UilEye, UilShare, UilTrashAlt } from '@iconscout/react-unicons';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa6';

interface SavedCandidatesCardProps {
  profileLogo: string;
  profileName: string; // corrected the typo from "prifileName" to "profileName"
  jobTitle: string;
  experience: string;
  skills: string[];
  salary: string;
  location: string;
  onClickDots: () => void;
  showDropdown: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  handleActionClick: (job: any, action: string) => void;
}

const SavedCandidatesCard: React.FC<SavedCandidatesCardProps> = ({
  profileLogo,
  profileName, // corrected the typo from "prifileName" to "profileName"
  jobTitle,
  salary,
  skills,
  experience,
  location,
  onClickDots,
  showDropdown,
  dropdownRef,
  handleActionClick,
}) => {
  const getJobTypeClass = (profileName: string) => {
    switch (profileName) { // corrected the missing parenthesis
      // case 'Part-Time':
      //   return 'text-[#ee009d]';
      // case 'Full-Time':
      //   return 'text-[#2aa100]';
      // case 'Freelance':
      //   return 'text-[#145A32]';
      // case 'Fixed-Price':
      //   return 'text-[#6495ED]';
      // case 'Hourly':
      //   return 'text-[#7DCEA0]';
      // default:
      //   return 'text-[#646A73]';
    }
  };

  return (
    <section className="bg-[#ffffff] rounded-[10px] p-4 sm:p-8">
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
        <div className="flex items-center gap-4 w-full sm:w-1/4">
          <img
            src={profileLogo}
            alt="Company Logo"
            className="w-20 h-20 sm:w-25 sm:h-25 border-2 border-[#646A73] rounded-full p-2"
          />
          <div>
          <h2 className={`text-[14px] sm:text-[18px] font-semibold text-[#000]  tracking-[0.1px] rounded-[4px] ${getJobTypeClass(profileName)}`}>
            {profileName}
          </h2>
            <h2 className="text-[16px] sm:text-[14px] font-light text-[#85929e] font-poppins">{jobTitle}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-[#D1FFBD] text-[#2AA100] text-[12px] px-2 py-1 rounded-full">
                  {skill}
                </span>
              ))}
              <p className="bg-[#ee009d] text-[#fff] text-[12px] px-2 py-1 rounded-full">{experience}</p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/4">
        <p className="text-[16px] sm:text-[16px] font-medium text-[#85929e]">Salary</p>
          <p className="text-[#000] text-[14px] sm:text-[16px] font-merri font-semibold">
            ${salary.toLocaleString()}
            <span className="text-[12px] sm:text-[14px] text-[#ABB2B9] font-poppins font-semilight"></span> {/* corrected the repeated salary */}
          </p>
        </div>
        <div className="w-full sm:w-1/4">
          <p className="text-[14px] sm:text-[16px] text-[#000] font-fairs font-semibold">Location</p>
          <h4 className="text-[12px] sm:text-[14px] text-[#646A73] font-poppins font-semilight">{location}</h4>
        </div>
        <div className="relative w-full sm:w-auto flex justify-end sm:justify-start">
          <button onClick={onClickDots}>
            <BiDotsVerticalRounded size={25} color="#ABB2B9" />
          </button>
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-36 z-20 bg-white border rounded shadow-lg"
            >
              <button
                onClick={() => handleActionClick({
                  profileLogo,
                  profileName,
                  jobTitle,
                  salary,
                  experience,
                  location,
                  skills
                }, 'View')}
                className="w-full flex items-center gap-2 text-left text-gray-600 font-poppins px-4 py-2 hover:bg-gray-200"
              >
                <UilEye size="18" /> View
              </button>
              <button
                onClick={() => handleActionClick({
                  profileLogo,
                  profileName,
                  jobTitle,
                  salary,
                  experience,
                  location,
                  skills
                }, 'Share')}
                className="w-full flex items-center gap-2 text-left text-gray-600 font-poppins px-4 py-2 hover:bg-gray-200"
              >
                <UilShare size="18" /> Share
              </button>
              <button
                onClick={() => handleActionClick({
                  profileLogo,
                  profileName,
                  jobTitle,
                  salary,
                  experience,
                  location,
                  skills
                }, 'Delete')}
                className="w-full flex items-center gap-2 text-left text-gray-600 font-poppins px-4 py-2 hover:bg-gray-200"
              >
                <UilTrashAlt size="18" /> Delete
              </button>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default SavedCandidatesCard;
