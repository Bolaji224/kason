import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

const AdminJobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const job: Job = {
    id: Number(id),
    title: 'Full Stack Engineer',
    company: 'Innovate Labs',
    location: 'Austin, TX',
    description: 'A full-time position for a Full Stack Engineer with 3+ years of experience...',
  };

  const handleAccept = () => {
    alert('Job accepted');
    navigate('/admin-jobs');
  };

  const handleDecline = () => {
    alert('Job declined');
    navigate('/admin-jobs');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-600 mb-4">{job.company} - {job.location}</p>
      <p className="mb-6">{job.description}</p>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={handleDecline}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default AdminJobDetails;
