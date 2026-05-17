import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  status: string;
}

const PostedJobApplied: React.FC = () => {
  const [appliedJobs] = useState<Job[]>([
    { id: 1, title: 'Frontend Developer', company: 'Tech Solutions', location: 'New York, NY', status: 'Pending' },
    { id: 2, title: 'Backend Developer', company: 'Web Innovators', location: 'San Francisco, CA', status: 'Pending' },
    { id: 3, title: 'Full Stack Engineer', company: 'Innovate Labs', location: 'Austin, TX', status: 'Pending' },
  ]);

  const navigate = useNavigate();

  const viewJobDetails = (id: number) => {
    navigate(`/job-details/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Applied Jobs</h1>
      <div className="space-y-4">
        {appliedJobs.map((job) => (
          <div key={job.id} className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.company} - {job.location}</p>
              <p className="text-sm text-yellow-500">Status: {job.status}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => viewJobDetails(job.id)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostedJobApplied;
