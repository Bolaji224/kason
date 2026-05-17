import React from 'react';
import RecentAppliedJobs from '../../posted-job/RecentAppliedJobs';
import BarChart from './BarChart';

// Define the chart data and options
const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Applications Submitted',
      data: [5, 10, 3, 7, 2, 4, 6],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Interviews Scheduled',
      data: [1, 2, 1, 2, 1, 1, 2],
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Offers Received',
      data: [0, 1, 0, 1, 0, 0, 1],
      borderColor: 'rgba(255, 159, 64, 1)',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Jobs Saved',
      data: [3, 5, 2, 4, 1, 3, 4],
      borderColor: '#2aa100',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Job Search Dashboard Metrics',
    },
  },
};

const App: React.FC = () => {
  return (
    <div className="py-10 px-4 md:py-16 md:px-6 lg:py-20 lg:px-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div className="bg-gray-100 p-4 sm:p-5 md:p-6 rounded-lg shadow-lg w-full lg:w-3/5">
        <BarChart data={data} options={options} />
      </div>
      <div className="w-full lg:w-2/5">
        <RecentAppliedJobs />
      </div>
    </div>
  );
};

export default App;
