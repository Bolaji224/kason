import React from 'react';
import { Job } from './Job';


interface ViewDetailsModalProps {
  job: Job | null;
  onClose: () => void;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-2xl mb-4">{job.jobTitle}</h2>
        <p>{job.companyName}</p>
        <p className="text-gray-600">Applied on: {job.dateApplied}</p>
        <p>Status: {job.status}</p>
        <p>Job description and other details...</p>
        <button onClick={onClose} className="mt-4 p-2 bg-gray-300 rounded">Close</button>
      </div>
    </div>
  );
};

export default ViewDetailsModal;
