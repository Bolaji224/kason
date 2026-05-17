import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Preserve SmartGuide ID
    const savedGuideId = localStorage.getItem("selectedGuideId");
  
    // Clear only auth/session info
    localStorage.removeItem("wwph_usr"); // if you store user info in localStorage
    sessionStorage.clear(); // clear session storage
  
    // Restore the saved guide ID
    if (savedGuideId) {
      localStorage.setItem("selectedGuideId", savedGuideId);
    }
  
    // Redirect to login page
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

export default LogoutPage;
