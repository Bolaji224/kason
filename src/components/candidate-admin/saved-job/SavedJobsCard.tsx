import { UilEye, UilShare, UilTrashAlt } from '@iconscout/react-unicons';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

interface SavedJobsCardProps {
  id: string;
  companyLogo: string;
  jobTitle: string;
  jobType: string;
  salary: number;
  paymentTime: string;
  location: string;
  category: string;
  onClickDots: () => void;
  showDropdown: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  handleActionClick: (job: any, action: string) => void;
}

const SavedJobsCard: React.FC<SavedJobsCardProps> = ({
  id,
  companyLogo,
  jobTitle,
  jobType,
  salary,
  paymentTime,
  location,
  category,
  onClickDots,
  showDropdown,
  dropdownRef,
  handleActionClick,
}) => {
  const getJobTypeClass = (jobType: string) => {
    switch (jobType) {
      case 'Part-Time':
        return 'text-[#ee009d]';
      case 'Full-Time':
        return 'text-[#2aa100]';
      case 'Freelance':
        return 'text-[#145A32]';
      case 'Fixed-Price':
        return 'text-[#6495ED]';
      case 'Hourly':
        return 'text-[#7DCEA0]';
      default:
        return 'text-[#646A73]';
    }
  };

  return (
    <section className="bg-[#ffffff] rounded-[10px] p-4 sm:p-8">
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
        <div className="flex items-center gap-4 w-full sm:w-1/4">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-[#646A73] rounded-full p-2"
          />
          <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#000] font-merri">{jobTitle}</h2>
        </div>
        <div className="w-full sm:w-1/4">
          <h2 className={`text-[14px] sm:text-[16px] font-semibold font-merri tracking-[0.1px] rounded-[4px] ${getJobTypeClass(jobType)}`}>
            {jobType}
          </h2>
          <p className="text-[#000] text-[14px] sm:text-[16px] font-merri font-semibold">
            ${salary.toLocaleString()}
            <span className="text-[12px] sm:text-[14px] text-[#ABB2B9] font-poppins font-semilight"> /{paymentTime}</span>
          </p>
        </div>
        <div className="w-full sm:w-1/4">
          <h4 className="text-[12px] sm:text-[14px] text-[#646A73] font-poppins font-semilight">{location}</h4>
          <p className="text-[14px] sm:text-[16px] text-[#000] font-fairs font-semibold">{category}</p>
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
                  id,
                  companyLogo,
                  jobTitle,
                  jobType,
                  salary,
                  paymentTime,
                  location,
                  category,
                }, 'View')}
                className="w-full flex items-center gap-2 text-left text-gray-600 font-poppins px-4 py-2 hover:bg-gray-200"
              >
                <UilEye size="18" /> View
              </button>
              <button
                onClick={() => handleActionClick({
                  id,
                  companyLogo,
                  jobTitle,
                  jobType,
                  salary,
                  paymentTime,
                  location,
                  category,
                }, 'Share')}
                className="w-full flex items-center gap-2 text-left text-gray-600 font-poppins px-4 py-2 hover:bg-gray-200"
              >
                <UilShare size="18" /> Share
              </button>
              <button
                onClick={() => handleActionClick({
                  id,
                  companyLogo,
                  jobTitle,
                  jobType,
                  salary,
                  paymentTime,
                  location,
                  category,
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

export default SavedJobsCard;
