import React, { useState, useRef, useEffect } from "react";
import { UilAngleDown, UilAngleUp } from "@iconscout/react-unicons";
import SavedJobsCard from "./SavedJobsCard";
import { httpGetWithToken, httpPostWithToken } from "../../../utils/http_utils";
import { useToast } from "@chakra-ui/react";

const SavedJobs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [action, setAction] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const toast = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const jobsPerPage = 5;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = savedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleActionClick = (job: any, action: string) => {
    setSelectedAlert(job);
    setAction(action);
    setShowDropdown(null);
  };

  const handleDelete = async () => {
    await handleDeleteSaved(selectedAlert.id)
    setSelectedAlert(null);
    fetchSavedJobs();
  };

  useEffect(() => {
    fetchSavedJobs()
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories = [
    { value: "New", label: "New", color: "#2aa100" },
    { value: "Category", label: "Category", color: "#ff9900" },
    { value: "Job-Type", label: "Job Type", color: "#40E0D0" },
  ];
  const fetchSavedJobs = async () => {
    const res = await httpGetWithToken("jobs/saved");
    if(res.status == "success") {
      let jobs = res.data.map((d:any)=> {
        return {
          id : d.id,
          companyLogo: d.company.avatar,
          jobTitle: d.title,
          jobType: d.job_type.title,
          salary: d.salary,
          paymentTime: "monthly",
          location: d.location,
          category: d.departments.title,
        }
      })
      setSavedJobs(jobs)
    } 
  }
  const handleDeleteSaved = async (id : string) => {
    await httpPostWithToken("jobs/saved/delete/"+id)
    toast({
      status : "success",
      title : "Job deleted!",
      isClosable : true,
    })
  }
  return (
    <div className="container mx-auto mt-[8rem] px-4 md:px-4 lg:px-8">
      <section className="flex flex-col md:flex-row items-center justify-between md:space-x-4">
        <h2 className="text-[#2aa100] text-[24px] sm:text-[38px] font-poppins font-semibold mb-4 md:mb-0">Saved Jobs</h2>
      </section>
      <div className="py-8">
        <div className="flex justify-center">
          <div className="flex flex-col flex-1 space-y-4">
            {
              currentJobs.length == 0
              &&
              <p>No saved jobs found!</p>
            }
            {currentJobs.map((job:any, index) => (
              <SavedJobsCard
                id={job.id}
                companyLogo={job.companyLogo}
                jobTitle={job.jobTitle}
                jobType={job.jobType}
                salary={job.salary}
                paymentTime={job.paymentTime}
                location={job.location}
                category={job.category}
                onClickDots={() => setShowDropdown(index)}
                showDropdown={showDropdown === index}
                dropdownRef={dropdownRef}
                handleActionClick={handleActionClick}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-1">
        {Array.from(Array(Math.ceil(savedJobs.length / jobsPerPage)).keys()).map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 rounded-full border ${currentPage === number + 1 ? "bg-[#EE009D] text-white" : "border-gray-300"}`}
          >
            {number + 1}
          </button>
        ))}
      </div>
      {selectedAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-30">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            {action === "View" && (
              <>
                <h3 className="text-xl font-semibold mb-4 text-green-600">
                  {selectedAlert.jobTitle}
                </h3>
                <p className="text-gray-700">
                  <strong>Salary:</strong> {selectedAlert.salary}
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> {selectedAlert.location}
                </p>
                <p className="text-gray-700">
                  <strong>Category:</strong> {selectedAlert.category}
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
                <button className="bg-[#EE009D] text-white px-4 py-2 rounded-md">Send</button>
              </div>
            )}
            {action === "Delete" && (
              <>
                <p className="text-gray-700 mb-4">Are you sure you want to delete this job?</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setSelectedAlert(null)}
                    className="bg-gray-200 px-4 py-2 rounded-md"
                  >
                    No
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Yes
                  </button>
                </div>
              </>
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
    </div>
  );
};

export default SavedJobs;
