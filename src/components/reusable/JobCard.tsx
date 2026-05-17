import React from 'react';
import Dropdown from './Dropdown';
import { Job } from './Job';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onUpdateStatus: (job: Job) => void;
  onWithdraw: (jobId: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, onUpdateStatus, onWithdraw }) => {
  return (
    <div className="flex gap-[4rem] justify-center items-center py-[1rem]">
      <div className='flex items-center'>
      <img src={job.companyLogo} alt="Company Logo"  className="w-8 h-8 mr-4 rounded-[20px] border-[1px] border-[#646173]" />
      <div className="flex-1">
       <Link to="/">
        <h2 className="text-[12px] font-semibold">{job.jobTitle}</h2>
       </Link>
       <p className='text-[10px] text-[#646A73] font-sans font-semilight tracking-[0.5px]'>{job.LocationName}</p>
        {/* <p>{job.companyName}</p>
        <p className="text-gray-600">Applied on: {job.dateApplied}</p>
        <p className={`mt-2 ${job.status === 'Pending' ? 'text-yellow-500' : job.status === 'Interview Scheduled' ? 'text-blue-500' : job.status === 'Offered' ? 'text-green-500' : 'text-red-500'}`}>Status: {job.status}</p> */}
      </div>
      </div>
      <Dropdown
        job={job}
        onViewDetails={onViewDetails}
        onUpdateStatus={onUpdateStatus}
        onWithdraw={onWithdraw}
      />
    </div>
  );
};

export default JobCard;
