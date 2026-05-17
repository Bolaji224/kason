import React, { useState } from 'react';
import { Job } from './Job';


interface UpdateStatusModalProps {
  job: Job | null;
  onClose: () => void;
  onUpdate: (job: Job, status: string) => void;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({ job, onClose, onUpdate }) => {
  const [status, setStatus] = useState(job?.status || '');

  if (!job) return null;

  const handleUpdate = () => {
    onUpdate(job, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-2xl mb-4">Update Status for {job.jobTitle}</h2>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border border-gray-300 rounded w-full">
          <option value="Pending">Pending</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={handleUpdate} className="mt-4 p-2 bg-blue-500 text-white rounded">Update</button>
        <button onClick={onClose} className="mt-4 ml-2 p-2 bg-gray-300 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
