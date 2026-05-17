import React, { useState } from 'react';

interface JobPost {
  title: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance';
  location: string;
  date: Date;
}

const CreateJobPost: React.FC = () => {
  const [jobPost, setJobPost] = useState<JobPost>({
    title: '',
    employmentType: 'full-time',
    location: '',
    date: new Date()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setJobPost({ ...jobPost, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Here you can handle the submission, like sending the job post to the server
    console.log(jobPost);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title:</label>
        <input type="text" id="title" name="title" value={jobPost.title} onChange={handleChange} required className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Employment Type:</label>
        <select id="employmentType" name="employmentType" value={jobPost.employmentType} onChange={handleChange} className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500">
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
        <input type="text" id="location" name="location" value={jobPost.location} onChange={handleChange} required className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
        <input type="date" id="date" name="date" value={jobPost.date.toISOString().split('T')[0]} onChange={handleChange} className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Create Job Post</button>
    </form>
  );
};

export default CreateJobPost;
