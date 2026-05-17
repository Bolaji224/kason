import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCircle, FaFileAlt } from "react-icons/fa";
import { UilCreateDashboard, UilSignout, UilWallet } from "@iconscout/react-unicons";
import { FaBarsStaggered, FaCertificate, FaEnvelope, FaRocket } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoBookmarkOutline, IoNotificationsOutline } from "react-icons/io5";
import Images from "../../constant/Images";
import ProgressBar from "../../reusable/ProgressBar";
import { AppContext } from "../../../global/state";
import { iProfileCompany } from "../../../models/profle";

interface iContext {
  user?: iProfileCompany;
}

const SideNav: React.FC = () => {
  const location = useLocation();
  const { user }: iContext = useContext(AppContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const targetProgress = 87;

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < targetProgress ? prev + 10 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // FIX: close sidebar when a nav link is clicked on mobile
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleNavClick = () => {
    closeSidebar();
  };

  const handleDropdownItemClick = () => {
    closeDropdown();
    closeSidebar();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Mobile menu toggle */}
      <div className="lg:hidden p-4 text-white absolute left-0 top-2 flex justify-between items-center z-50">
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <span className="text-[#2aa100] text-2xl font-bold">✕</span>
          ) : (
            <FaBarsStaggered size={25} color="#2aa100" />
          )}
        </button>
      </div>

      {/* FIX: Dark backdrop overlay on mobile — clicking it closes the sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`h-screen w-64 bg-white p-4 flex flex-col 
        fixed top-0 left-0 overflow-y-auto scrollbar-hide
        transition-transform transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 z-50`}
      >
        {/* Profile section */}
        <div className="p-6 flex items-center flex-col">
          <Link to="/" onClick={handleNavClick}>
            <img src={Images.Logo} alt="logo" className="w-full max-w-[150px] mb-4" />
          </Link>
          <FaCircle className="relative w-[10px] h-[10px] top-6 left-6 text-[#40e6b9]" />
          <img
            className="sm:h-[50px] sm:w-[50px] w-[25px] h-[25px] rounded-full object-cover mb-4"
            src={user?.avatar || Images.ProfileImage}
            alt="Profile"
          />

          {/* Username + dropdown — FIX: dropdownRef scoped here for correct click-outside detection */}
          <div ref={dropdownRef} className="relative">
            <button
              className="flex items-center gap-1 text-md font-bold text-[#2AA100]"
              onClick={toggleDropdown}
            >
              {user?.name}
              <IoMdArrowDropdown
                size="20"
                color="#EE009D"
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute bg-gray-700 text-white rounded shadow-md mt-2 w-48 z-10 border border-gray-600">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer border-b border-gray-600">
                    <Link to="/employers-profile" onClick={handleDropdownItemClick}>
                      Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer border-b border-gray-600">
                    <Link to="/employers-account-settings" onClick={handleDropdownItemClick}>
                      Settings
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                    <Link to="/employers-logout-account" onClick={handleDropdownItemClick}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1">
          <ul>
            {/* Dashboard */}
            <Link to="/employers-dashboard" onClick={handleNavClick}>
              <li
                className={`py-2 text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/employers-dashboard")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] mx-[1rem] text-[#2aa100]"
                    : "text-[#2AA100] hover:text-[#2aa100]"
                }`}
              >
                <UilCreateDashboard
                  size={25}
                  color="#EE009D"
                />
                Dashboard
              </li>
            </Link>

            {/* Account Settings */}
            <Link to="/employers-account-settings" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/employers-account-settings")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] mx-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <FaRocket size={25} /> Account Settings
              </li>
            </Link>

            {/* Applicants */}
            <Link to="/all-applicant/:slug" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/all-applicant/:slug")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <FaFileAlt size={25} /> Applicants
              </li>
            </Link>

            {/* Submit Job */}
            <Link to="/submit-jobs" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/submit-jobs")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <IoNotificationsOutline size={25} /> Submit Job
              </li>
            </Link>

            {/* Browse Candidates */}
            <Link to="/browse-candidates" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/browse-candidates")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <IoBookmarkOutline size={25} /> Talent Vault
              </li>
            </Link>

            <Link to="/smartstart" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/Smartstart")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <IoBookmarkOutline size={25} /> Smartstart
              </li>
            </Link>

            {/* Approved Candidates */}
            <Link to="/approved-candidate" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/approved-candidate")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <IoBookmarkOutline size={25} /> Approved Candidates
              </li>
            </Link>

            {/* Message — FIX: was checking isActive("/approved-candidate") instead of correct path */}
            <Link to="/employers-messages" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/employers-messages")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <FaEnvelope size={25} /> Message
              </li>
            </Link>

            {/* Wallet Account */}
            <Link to="/employers-wallet-account" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/employers-wallet-account")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <UilWallet size={25} /> Wallet Account
              </li>
            </Link>

            {/* Career Tips */}
            <Link to="/client-career-tips" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/client-career-tips")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <UilWallet size={25} /> Career Tips
              </li>
            </Link>

            {/* Report */}
            <Link to="/employers-report" onClick={handleNavClick}>
              <li
                className={`py-2 hover:text-[#2AA100] hover:rounded-lg mt-[1.5rem] text-[16px] font-sans font-semibold flex items-center gap-[1rem] ${
                  isActive("/employers-report")
                    ? "outline outline-1 outline-[#EE009D] rounded-lg px-[1rem] text-[#2AA100]"
                    : "text-[#1E2A38] hover:text-[#2AA100]"
                }`}
              >
                <UilWallet size={25} /> Report
              </li>
            </Link>
          </ul>

          {/* Progress bar */}
          <div className="px-[2rem] py-[2rem]">
            <p className="text-[#2aa100] py-[1rem] font-medium">87%</p>
            <ProgressBar progress={progress} />
            <p className="text-[12px] text-[#646A73]">Profile complete</p>

            <div className="mt-[4rem]">
              <Link to="/employers-logout-account" onClick={handleNavClick}>
                <button className="text-[#2aa100] hover:text-[#EE009D] text-[18px] flex items-center gap-2">
                  <UilSignout /> Logout
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideNav;