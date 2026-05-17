import React from 'react';
import { Job } from './Job';
import { BiDotsHorizontalRounded } from 'react-icons/bi';


interface DropdownProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onUpdateStatus: (job: Job) => void;
  onWithdraw: (jobId: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ job, onViewDetails, onUpdateStatus, onWithdraw }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className=" rounded">
      <BiDotsHorizontalRounded size={25} color='#646A73' className="" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
          <button
            onClick={() => { onViewDetails(job); toggleDropdown(); }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            View Job
          </button>
          <button
            onClick={() => { onUpdateStatus(job); toggleDropdown(); }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Archive
          </button>
          <button
            onClick={() => { onWithdraw(job.id); toggleDropdown(); }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
