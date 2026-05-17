import React, { useState, useEffect, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { UilAngleDown, UilAngleUp, UilEye, UilShare, UilTrashAlt } from "@iconscout/react-unicons";
import { FaCheckCircle, FaCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import { httpGetWithToken } from "../../../../utils/http_utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";


interface JobAlert {
  id: any;
  title: string;
  jobType: string;
  location: string;
  dateCreated: string;
  applicate: string;
  status: string;
  slug: string;

  
}


const categories = [
  { value: "Active", label: "Active", color: "#2aa100" },
  { value: "Pending", label: "Pending", color: "#FFD700" },
  { value: "Expired", label: "Expired", color: "#C21E56" },
];

const SubmitJobsTable: React.FC = () => {
  const [jobAlerts, setJobAlerts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAlert, setSelectedAlert] = useState<JobAlert | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const itemsPerPage = 10;
  const totalPages = Math.ceil(jobAlerts.length / itemsPerPage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

const handleActionClick = (alert: any, actionType: string) => {
  setSelectedAlert(alert);
  setAction(actionType);
  setShowDropdown(null);

  if (actionType === "View") {
    navigate(`/all-applicant/`+alert.slug); // Navigate to JobDetailsPage
  }
};
const handleDelete = async () => {
  if (selectedAlert) {
    try {
      await httpGetWithToken(`employer/jobs/delete/${selectedAlert.id}`);
      setJobAlerts(jobAlerts.filter((jobAlert) => jobAlert.id !== selectedAlert.id));
      setSelectedAlert(null);
      setAction(null);
      fetchJobs()
    } catch (error) {
      console.error("Failed to delete the job alert:", error);
    }
  }
};


   
    //.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const handleFilterValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilterValue = event.target.value;
    setFilterValue(selectedFilterValue);
  };

  const handleTabChange = (type: string) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setStatus(value)
    setDropdownOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <FaCircle  size={10} className="text-green-600" />;
      case "Pending":
        return <FaCircle size={10} className="text-yellow-500" />;
      case "Expired":
        return <FaCircle size={10} className="text-red-600" />;
      default:
        return null;
    }
  };

  async function fetchJobs() {
    const rsp  = await httpGetWithToken('employer/jobs?status='+status)
    if(rsp.status === "success") {
      setJobAlerts(rsp.data)
    }
  }
  useEffect(()=> {
    fetchJobs()
  }, [status])
  return (
    <section className="mt-[8rem] px-[2.5rem]">
      <section className="flex flex-col md:flex-row gap-4 md:gap-12 justify-between items-center">
        <h2 className="text-green-700 text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold">
          My Jobs
        </h2>
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-2 mb-4">
        <div className="flex justify-center">
       
      </div>
          <label className="block font-medium text-green-600 text-md mb-2 md:mb-0">
            Sort by:
          </label>
          <div className="w-full md:w-40 relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-1 rounded-full focus:outline-none bg-white shadow-md text-gray-600 text-md flex justify-between items-center"
            >
              <span style={{ color: categories.find(cat => cat.value === selectedOption)?.color }}>
                {selectedOption || "Active"}
              </span>
              {dropdownOpen ? <UilAngleUp/> : <UilAngleDown />}
            </button>
            {dropdownOpen && (
              <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                {categories.map((category) => (
                  <li
                    key={category.value}
                    onClick={() => handleOptionChange(category.value)}
                    className="px-4 py-2 cursor-pointer text-gray-600 hover:bg-gray-100"
                    style={{ color: category.color }}
                  >
                    {category.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <div className="max-w-full mx-auto p-4 mt-4 bg-white shadow-md rounded-xl">
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white rounded-[20px]">
            <thead className="bg-pink-100 rounded-xl mt-2">
              <tr className="text-green-700 font-poppins font-medium">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Job Created</th>
                <th className="py-2 px-4 text-left">Applicants</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobAlerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((alert, index) => (
                <tr key={index} className="text-left border-b">
                  <td className="py-4 px-4 text-green-900 font-sans font-semibold">
                    <p>{alert.title}</p>
                    <p className="text-[#646a73] text-[14px] font-sans font-light">{alert.job_type?.title}
                       {alert.location}
                    </p>
                  </td>
                  <td className="py-8 px-4 text-green-700">
                   {moment(alert.date_created).format("Do MMM, y")}
                  </td>
                  <td className="py-8 px-4 text-gray-800">{alert.applicants.length}</td>
                  <td className="py-8 px-4 text-gray-800 flex items-center gap-2">
                    {getStatusIcon(alert.status)}
                    {alert.status}
                  </td>

                  <td className="py-8 px-4 text-gray-800 relative">
                    <button onClick={() => setShowDropdown(index)}>
                      <BiDotsVerticalRounded size={25} color="#ABB2B9" />
                    </button>
                    {showDropdown === index && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-36 z-20 bg-white border rounded shadow-lg"
                      >
                        <button
                          onClick={() => handleActionClick(alert, "View")}
                          className="w-full flex items-center gap-2 text-left text-gray-600 font-poppins px-4 py-2 hover:bg-gray-200"
                        >
                          <UilEye size="18" /> View
                        </button>
                        <button
                          onClick={() => handleActionClick(alert, "Share")}
                          className="w-full flex items-center gap-2 text-left text-gray-600 font-poppins px-4 py-2 hover:bg-gray-200"
                        >
                          <UilShare size="18" /> Share
                        </button>
                        <button
                          onClick={() => handleActionClick(alert, "Delete")}
                          className="w-full flex items-center gap-2 text-left text-gray-600 font-poppins px-4 py-2 hover:bg-gray-200"
                        >
                          <UilTrashAlt size="18" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {
                jobAlerts.length === 0 
                && 
                <p className="text-red-700">No job found!</p>
              }
            </tbody>
          </table>
        </div>
        {selectedAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-30">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
              {action === "View" && (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-green-600">
                    {selectedAlert.title}
                  </h3>
                  <p className="text-gray-700">
                    <strong>JobType:</strong> {selectedAlert.jobType}
                  </p>
                  <p className="text-gray-700">
                    <strong>Applicates:</strong> {selectedAlert.applicate}
                  </p>
                  <p className="text-gray-700">
                    <strong>Location:</strong> {selectedAlert.location}
                  </p>
                  <p className="text-gray-700">
                    <strong>Job Created Date:</strong> {selectedAlert.dateCreated}
                  </p>
                  <p className="text-gray-700">
                    <strong>Status:</strong> {selectedAlert.status}
                  </p>
                 
                </>
              )}
              {action === "Share" && (
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    className="border p-2 rounded-md flex-grow"
                    placeholder="Enter email address"
                  />
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                    Send
                  </button>
                </div>
              )}
              {action === "Delete" && (
                <div className="text-center">
                  <p className="text-gray-800 text-lg mb-4">
                    Are you sure you want to delete this job alert?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleDelete}
                      className="bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setSelectedAlert(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <button
                onClick={() => setSelectedAlert(null)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-end mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded-[50px] ${
                  currentPage === index + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

      </div>
    </section>
  );
};

export default SubmitJobsTable;


