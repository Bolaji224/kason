import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import {
  UilSearch,
  UilEnvelope,
  UilBriefcaseAlt,
} from "@iconscout/react-unicons";
import { AnimatePresence, motion } from "framer-motion";
import { useJobNotifications } from "../job-alert-system/JobNotificationContext";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { newJobsCount, jobAlerts } = useJobNotifications();
  const MotionLink = motion(Link);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <header className="bg-[#FFF5F8] text-white px-6 py-4 flex justify-end items-center fixed top-0 left-0 w-full shadow-sm z-50 gap-4">
      {/* Right Section (Search + Icons + Button) */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <UilSearch className="absolute top-2 left-3 text-[#2AA100]" />
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 w-64 rounded-full bg-white text-[#646A73] placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2AA100] transition-all"
          />
        </div>

         <MotionLink
          to="/job-alerts"
          className="bg-[#ee009d] hover:bg-[#d1008a] text-white font-bold py-2 px-5 rounded-full flex items-center gap-2 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UilBriefcaseAlt size={18} />
          Find Job
        </MotionLink>

        {/* Message Icon */}
        <Link to="/messages" className="cursor-pointer">
          <UilEnvelope
            className="text-[#4ADE80] hover:text-[#2AA100] transition-colors"
            size={24}
          />
        </Link>

        {/* Notification Bell */}
        <div className="relative">
          <FaBell
            className="cursor-pointer text-[#4ADE80] hover:text-[#2AA100] transition-colors"
            size={24}
            onClick={toggleNotificationDropdown}
          />

          {newJobsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {newJobsCount > 9 ? "9+" : newJobsCount}
            </span>
          )}
          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto"
              >
                <div className="p-4 border-b border-x-gray-200">
                  <h3 className="font-semibold text-gray-800">
                    Job Alerts
                  </h3>
                  <p className="text-xs text-gray-500">
                    {newJobsCount > 0 ? `${newJobsCount} new job${newJobsCount > 1 ? 's' : ''} available` : 'No new jobs'}
                  </p>
                </div>

                {jobAlerts.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {jobAlerts.slice(0, 5).map((job, index) => (
                      <Link
                      key={index}
                      to="/job-alerts"
                      className="block p-3 hover:bg-gray-50 transition-colors" onClick={() => setIsNotificationOpen(false)}>

                      <p className="font-medium text-sm text-gray-800 truncate">
                          {job.title || "Untitled Job"}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {job.company?.name || "Unknown Company"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Posted {job.posted || "recently"}
                        </p>
                      </Link>
                    ))}
                    {jobAlerts.length > 5 && (
                      <Link to="/job-alerts"
                        className="block p-3 text-center text-sm text-[#2AA100] hover:bg-gray-50 font-medium"
                        onClick={() => setIsNotificationOpen(false)}
                      > View all {jobAlerts.length} jobs </Link>
                    )}
                  </div>
                ) : (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No new job alerts available.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Find Job Button */}

      </div>
    </header>
  );
};

export default Header;
