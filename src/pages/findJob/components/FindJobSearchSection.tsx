import React, { useEffect, useState } from "react";
import Dropdown from "../../../components/reusable/DropDownButton";
import { useNavigate } from "react-router-dom";
import { httpGetWithoutToken, httpGetWithToken } from "../../../utils/http_utils";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const FindJobSearchSection: React.FC = () => {
  const [jobQuery, setJobQuery] = useState("");
  const [jobTypes, setJobTypes] = useState<any[]>([]);
  const [location, setLocation] = useState<any[]>([]); // ✅ Always initialized
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Full-time");

  const navigate = useNavigate();

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobQuery(e.target.value);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  // ✅ Fetch resources safely
  const getResources = async () => {
    try {
      const resp = await httpGetWithToken("resources");
      console.log("resources response", resp);

      if (resp?.status === "success") {
        const locations = resp?.data?.location ?? []; // your API doesn’t return this
        setLocation(Array.isArray(locations) ? locations : []); // ✅ defensive
      } else {
        setLocation([]);
      }
    } catch (error) {
      console.error("Failed to fetch resources:", error);
      setLocation([]);
    }
  };

  // ✅ Fetch job types
  const fetchJobTypes = async () => {
    try {
      const resp = await httpGetWithoutToken("fetch-job-types");
      if (resp.status === "success" && Array.isArray(resp.data)) {
        setJobTypes(resp.data);
      } else {
        setJobTypes([]);
      }
    } catch (err) {
      console.error("Error fetching job types:", err);
      setJobTypes([]);
    }
  };

  useEffect(() => {
    fetchJobTypes();
    getResources();
  }, []);

  const handleSearch = () => {
    navigate(
      `/find-job?title=${jobQuery}&location=${locationQuery}&jobType=${selectedOption}&rand=${
        Math.random() * 10000
      }`
    );
  };

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={sectionRef}
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      variants={fadeInVariants}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex justify-center items-center"
    >
      <div className="lg:flex md:flex justify-center items-center w-full lg:mx-[2rem] mx-[2rem] py-[2rem] lg:space-y-0 md:space-y-0 space-y-[1rem]">
        {/* Job title input */}
        <div className="w-[100%]">
          <input
            type="text"
            placeholder="Enter job title"
            value={jobQuery}
            onChange={handleJobChange}
            className="w-[100%] p-4 rounded focus:outline-none bg-[#fff] shadow-m"
          />
        </div>

        {/* Location select */}
        <div className="w-[100%]">
          <select
            className="w-[100%] p-4 rounded focus:outline-none bg-[#fff] shadow-md focus:border-none"
            onChange={(e) => setLocationQuery(e.target.value)}
            value={locationQuery}
            name="location"
            id="location"
          >
            <option value="">Select</option>
            {Array.isArray(location) && location.length > 0 ? (
              location.map((l: any, i) => (
                <option key={i} value={l.state || ""}>
                  {l.state || "Unknown"}, {l.country || ""}
                </option>
              ))
            ) : (
              <option disabled>No locations available</option>
            )}
          </select>
        </div>

        {/* Job type select */}
        <div className="w-[100%]">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="w-[100%] p-4 rounded focus:outline-none bg-[#fff] shadow-md text-[#646A73] text-[16px]"
          >
            <option className="text-[#646A73] text-[14px]" value="">
              Select job type
            </option>
            {Array.isArray(jobTypes) && jobTypes.length > 0 ? (
              jobTypes.map((jt: any, i) => (
                <option key={i} value={jt.title}>
                  {jt.title}
                </option>
              ))
            ) : (
              <option disabled>No job types available</option>
            )}
          </select>
        </div>

        {/* Search button + Dropdown */}
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="bg-[#1E2A38] text-white lg:px-[2rem] md:px-[2rem] px-[2rem] lg:py-[0.8rem] md:py-[0.8rem] py-[0.5rem] lg:text-[18px] md:text-[18px] text-[12px] rounded-md hover:bg-[#2AA100] hover:tracking-[1px] focus:outline-none ease-in duration-300"
          >
            Search
          </button>
          <Dropdown />
        </div>
      </div>
    </motion.div>
  );
};

export default FindJobSearchSection;
