import React, { useState } from 'react';
import JobCard from '../reusable/JobCard';
import ViewDetailsModal from '../reusable/ViewDetailsModal';
import UpdateStatusModal from '../reusable/UpdateStatusModal';
import { Job } from '../reusable/Job';
import Images from '../constant/Images';

const RecentAppliedJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      companyLogo: Images.FirstBankImage,
      jobTitle: 'Software Engineer',
      LocationName: 'Surulere Lagos, Nigeria',
      companyName: 'Tech Corp',
      dateApplied: '2024-06-20',
      status: 'Pending',
    },
    {
      id: 2,
      companyLogo: Images.UBAImage,
      jobTitle: 'Software Engineer',
      LocationName: 'Surulere Lagos, Nigeria',
      companyName: 'Tech Corp',
      dateApplied: '2024-06-20',
      status: 'Pending',
    },
    {
      id: 2,
      companyLogo: Images.UBAImage,
      jobTitle: 'Software Engineer',
      LocationName: 'Surulere Lagos, Nigeria',
      companyName: 'Tech Corp',
      dateApplied: '2024-06-20',
      status: 'Pending',
    },
    {
      id: 2,
      companyLogo: Images.UBAImage,
      jobTitle: 'Software Engineer',
      LocationName: 'Surulere Lagos, Nigeria',
      companyName: 'Tech Corp',
      dateApplied: '2024-06-20',
      status: 'Pending',
    },
    {
      id: 2,
      companyLogo: Images.UBAImage,
      jobTitle: 'Software Engineer',
      LocationName: 'Surulere Lagos, Nigeria',
      companyName: 'Tech Corp',
      dateApplied: '2024-06-20',
      status: 'Pending',
    },
    {
      id: 2,
      companyLogo: Images.UBAImage,
      jobTitle: 'Software Engineer',
      LocationName: 'Surulere Lagos, Nigeria',
      companyName: 'Tech Corp',
      dateApplied: '2024-06-20',
      status: 'Pending',
    },
    
    // Add more job objects as needed
  ]);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isViewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [isUpdateStatusOpen, setUpdateStatusOpen] = useState(false);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setViewDetailsOpen(true);
  };

  const handleUpdateStatus = (job: Job) => {
    setSelectedJob(job);
    setUpdateStatusOpen(true);
  };

  const handleWithdraw = (jobId: number) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  const handleStatusUpdate = (job: Job, status: string) => {
    setJobs(jobs.map(j => j.id === job.id ? { ...j, status } : j));
  };

  return (
    <div className="px-[2rem] w-[400px] rounded-[20px] py-4 bg-[#ffffff] ">
      <div>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onViewDetails={handleViewDetails}
            onUpdateStatus={handleUpdateStatus}
            onWithdraw={handleWithdraw}
          />
        ))}
      </div>

      {isViewDetailsOpen && (
        <ViewDetailsModal
          job={selectedJob}
          onClose={() => setViewDetailsOpen(false)}
        />
      )}

      {isUpdateStatusOpen && (
        <UpdateStatusModal
          job={selectedJob}
          onClose={() => setUpdateStatusOpen(false)}
          onUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default RecentAppliedJobs;
