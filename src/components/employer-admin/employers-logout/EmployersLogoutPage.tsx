import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployersLogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    // Example: Clearing user session or token
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to login page or home page
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-4">Logout</h1>
        <p className="text-gray-700 mb-4">
          Are you sure you want to log out?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleLogout}
            className="bg-[#ee009d] text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#2aa100] text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployersLogoutPage;
