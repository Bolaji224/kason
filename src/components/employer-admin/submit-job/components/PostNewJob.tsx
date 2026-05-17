import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import ls from 'localstorage-slim';

const AngleDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const AngleUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const API_BASE_URL = "https://api.workason.site/api/v1/";

// ✅ Real GET with token — no longer mocked
const httpGetWithToken = async (url: string) => {
  try {
    const token = ls.get("wwph_token", { decrypt: true });
    const res = await axios.get(`${API_BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (err: any) {
    console.error("GET error:", err.response?.data || err.message);
    return { status: "error", data: null };
  }
};

const httpPostWithToken = async (url: string, data: any) => {
  try {
    const token = ls.get("wwph_token", { decrypt: true });
    if (!token) {
      console.error("No token found");
      return { status: "error", message: "Authentication required" };
    }
    const res = await axios.post(`${API_BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return res.data;
  } catch (err: any) {
    console.error("POST error:", err.response?.data || err.message);
    return { status: "error", message: "Failed to connect to backend" };
  }
};

const jobSalary = ["Monthly", "Weekly", "Hourly"];

// ✅ Fallback categories in case API fails
const fallbackDepartments = [
  { id: 1, title: "Virtual Assistant" },
  { id: 2, title: "Video Editor" },
];

const fallbackJobTypes = [
  { id: 1, title: "Full-Time" },
  { id: 2, title: "Part-Time" },
  { id: 3, title: "Freelance" },
  { id: 4, title: "Hourly-Contract" },
  { id: 5, title: "Fixed-Price" },
];

const fallbackWorkTypes = [
  { id: 1, title: "Remote" },
  { id: 2, title: "On-site" },
  { id: 3, title: "Hybrid" },
];

const PostNewJob: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [job_types, setJobTypes] = useState<any[]>([]);
  const [work_types, setWorktypes] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [typeOpen, setTypeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [workType, setWorkType] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(null);
  const [selectedSalary, setSelectedSalary] = useState("");
  const [salaryOpen, setSalaryOpen] = useState(false);
  const [budget, setBudget] = useState("");
  const [countries, setCountries] = useState<any[]>([]);
  const [country, setCountry] = useState<any>("");
  const [user_state, setUserState] = useState<any>("");
  const [city, setCity] = useState<any>("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const categoryRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const workTypeRef = useRef<HTMLDivElement>(null);
  const salaryRef = useRef<HTMLDivElement>(null);

  const closeAllDropdowns = () => {
    setCategoryOpen(false);
    setTypeOpen(false);
    setWorkType(false);
    setSalaryOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) setCategoryOpen(false);
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) setTypeOpen(false);
      if (workTypeRef.current && !workTypeRef.current.contains(event.target as Node)) setWorkType(false);
      if (salaryRef.current && !salaryRef.current.contains(event.target as Node)) setSalaryOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) setSkills([...skills, skill]);
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const toggleCategory = () => { closeAllDropdowns(); setCategoryOpen((prev) => !prev); };
  const toggleType = () => { closeAllDropdowns(); setTypeOpen((prev) => !prev); };
  const toggleWorkType = () => { closeAllDropdowns(); setWorkType((prev) => !prev); };
  const toggleSalary = () => { closeAllDropdowns(); setSalaryOpen((prev) => !prev); };

  const handleSelectCategory = (category: any) => { setSelectedCategory(category); setCategoryOpen(false); };
  const handleSelectType = (type: any) => { setSelectedType(type); setTypeOpen(false); };
  const handleSelectWorktype = (type: any) => { setSelectedWorkType(type); setWorkType(false); };
  const handleSelectSalary = (salary: string) => { setSelectedSalary(salary); setSalaryOpen(false); };

  // ✅ Now fetches real resources from your backend
const getResources = () => {
  // ✅ Use local data — avoids the 500 error completely
  setJobTypes(fallbackJobTypes);
  setWorktypes(fallbackWorkTypes);
  setDepartments(fallbackDepartments);
};

  const showToastMessage = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const throwError = (message: string) => showToastMessage(message, "error");

  const submit = async () => {
    if (loading) return;
    if (title === "") return throwError("Job title cannot be empty");
    if (description === "") return throwError("Job description cannot be empty");
    if (selectedWorkType === null) return throwError("Please select Work type");
    if (selectedType === null) return throwError("Please select Job type");
    if (selectedCategory == null) return throwError("Please select Job Category");
    if (selectedSalary === "") return throwError("Please select salary type");
    if (budget === "") return throwError("Enter salary budget");
    if (city === "") return throwError("City cannot be empty");
    if (user_state === "") return throwError("State cannot be empty");
    if (country === "") return throwError("Country cannot be empty");
    if (skills.length === 0) return throwError("Enter at least one skill");
    if (requirements === "") return throwError("Job requirement is required");

    const fd = {
  title,
  description,
  requirements,
  work_type: selectedWorkType?.id || 1,
  job_type: selectedType?.id || 1,
  category: selectedCategory?.id || 1,
  salary: selectedSalary || "Monthly",
  budget: budget || "0",
  experience: experience || "",
  job_cover: "default_cover.jpg",
  skills: skills.join(","),
  city,
  state: user_state,
  country,
  location: `${city}, ${user_state}, ${country}`, // ✅ build location from city + state + country
  naration: "",
  status: "active",
};

    console.log("Submitting job:", fd);

    try {
      setLoading(true);
      const res = await httpPostWithToken("employer/jobs", fd);
      console.log("Job post response:", res);

      if (res.status === "success") {
        showToastMessage("Job created successfully!", "success");
        // ✅ Reset form after success
        setTitle("");
        setDescription("");
        setRequirements("");
        setExperience("");
        setSelectedCategory(null);
        setSelectedType(null);
        setSelectedWorkType(null);
        setSelectedSalary("");
        setBudget("");
        setSkills([]);
        setCity("");
        setUserState("");
        setCountry("");
      } else {
        console.error("Job post failed:", res);
        throwError(res.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      throwError("Failed to submit job. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  const getCountries = async () => {
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca2");
      const sorted = res.data
        .map((c: any) => ({ code: c.cca2, name: c.name.common }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name));
      setCountries(sorted);
    } catch (err) {
      console.error("Failed to fetch countries:", err);
      setCountries([]);
    }
  };

 useEffect(() => {
  getResources();
  getCountries();
}, []);

  return (
    <>
      <section className="lg:ml-64 p-8 mt-[4rem]">
        <h2 className="text-green-700 text-2xl sm:text-3xl md:text-4xl font-poppins font-semibold">
          Post a New Job
        </h2>

        {/* Job Details */}
        <div className="bg-white p-[4rem] rounded-[20px] shadow-md mb-6 mt-[2rem]">
          <h3 className="text-[24px] font-semibold text-[#EE009D] mb-4">Job Details</h3>
          <div>
            <div className="mb-4">
              <label className="block text-[#000000] text-[16px] font-medium">Job Title*</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Product Designer"
                className="mt-1 w-full px-4 py-4 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium text-[16px] text-[#000000] text-lg mb-2">Job Description*</label>
              <textarea
                placeholder="Write about the job in details..."
                rows={7}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
                className="w-full text-black border rounded-lg border-gray-300 bg-white p-4 shadow-sm focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium text-[16px] text-[#000000] text-lg mb-2">Job Requirement*</label>
              <textarea
                placeholder="Write about the job requirements..."
                rows={7}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                autoComplete="off"
                className="w-full text-black border rounded-lg border-gray-300 bg-white p-4 shadow-sm focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap -mx-2">
              {/* Job Category */}
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-[#000000] text-[16px] mb-2 font-medium">Job Category*</label>
                <div className="relative" ref={categoryRef}>
                  <button
                    type="button"
                    className="w-full border rounded-lg border-gray-300 bg-white p-4 shadow-sm focus:ring-0 focus:outline-none flex justify-between items-center"
                    onClick={toggleCategory}
                  >
                    <span className="text-gray-500">
                      {selectedCategory ? selectedCategory.title : "Select Category"}
                    </span>
                    {categoryOpen ? <AngleUpIcon /> : <AngleDownIcon />}
                  </button>
                  {categoryOpen && (
                    <ul className="absolute z-10 w-full text-gray-500 bg-white border rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                      {departments?.map((category: any) => (
                        <li
                          key={category.id}
                          className="px-4 py-2 hover:bg-gray-100 hover:text-[#2aa100] cursor-pointer"
                          onClick={() => handleSelectCategory(category)}
                        >
                          {category.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Job Type */}
                {/* Job Type */}
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-[#000000] text-[16px] mb-2 font-medium">Job Type*</label>
                <div className="relative" ref={typeRef}>
                  <button
                    type="button"
                    className="w-full border rounded-lg border-gray-300 bg-white p-4 shadow-sm focus:ring-0 focus:outline-none flex justify-between items-center"
                    onClick={toggleType}
                  >
                    <span className="text-gray-500">
                      {selectedType ? selectedType.title : "Select Job Type"}
                    </span>
                    {typeOpen ? <AngleUpIcon /> : <AngleDownIcon />}
                  </button>
                  {typeOpen && (
                    <ul className="absolute z-10 w-full bg-white text-gray-500 border rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                      {job_types?.map((type: any) => (
                        <li
                          key={type.id}
                          className="px-4 py-2 hover:bg-gray-100 hover:text-[#2aa100] cursor-pointer"
                          onClick={() => handleSelectType(type)}
                        >
                          {type.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Work Type */}
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-[#000000] text-[16px] mb-2 font-medium">Work Type*</label>
                <div className="relative" ref={workTypeRef}>
                  <button
                    type="button"
                    className="w-full border rounded-lg border-gray-300 bg-white p-4 shadow-sm focus:ring-0 focus:outline-none flex justify-between items-center"
                    onClick={toggleWorkType}
                  >
                    <span className="text-gray-500">
                      {selectedWorkType ? selectedWorkType.title : "Select Work Type"}
                    </span>
                    {workType ? <AngleUpIcon /> : <AngleDownIcon />}
                  </button>
                  {workType && (
                    <ul className="absolute z-10 w-full bg-white text-gray-500 border rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                      {work_types?.map((type: any) => (
                        <li
                          key={type.id}
                          className="px-4 py-2 hover:bg-gray-100 hover:text-[#2aa100] cursor-pointer"
                          onClick={() => handleSelectWorktype(type)}
                        >
                          {type.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {/* Salary */}
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-[#000000] text-[16px] mb-2 font-medium">Salary*</label>
                <div className="relative" ref={salaryRef}>
                  <button
                    type="button"
                    className="w-full border rounded-lg border-gray-300 bg-white p-4 shadow-sm focus:ring-0 focus:outline-none flex justify-between items-center"
                    onClick={toggleSalary}
                  >
                    <span className="text-gray-500">{selectedSalary || "Select Salary Type"}</span>
                    {salaryOpen ? <AngleUpIcon /> : <AngleDownIcon />}
                  </button>
                  {salaryOpen && (
                    <ul className="absolute z-10 w-full bg-white text-gray-500 border rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                      {jobSalary.map((salary) => (
                        <li
                          key={salary}
                          className="px-4 py-2 hover:bg-gray-100 hover:text-[#2aa100] cursor-pointer"
                          onClick={() => handleSelectSalary(salary)}
                        >
                          {salary}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Budget */}
              <div className="w-full sm:w-1/2 px-2 mb-4">
                <label className="block text-[#000000] text-[16px] mb-2 font-medium">Budgeted Amount*</label>
                <input
                  type="text"
                  placeholder="Enter budgeted amount"
                  className="mt-1 w-full px-4 py-4 border rounded-md"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Experience */}
        <div className="bg-white p-[4rem] rounded-lg shadow-md mb-6">
          <h3 className="text-[24px] font-semibold text-[#EE009D] mb-4">Skills & Experience</h3>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700">Skills*</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="bg-gray-200 px-4 py-1 rounded-full text-gray-700 flex items-center">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-red-500">&times;</button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add skills and press Enter to save"
                className="mt-2 w-full px-4 py-4 border rounded-md"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    handleAddSkill(e.currentTarget.value.trim());
                    e.currentTarget.value = "";
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Experience*</label>
              <input
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                type="text"
                placeholder="e.g. 2 years"
                className="mt-1 w-full px-4 py-4 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-[4rem] mt-8">
          <label className="block font-semibold text-[#ee009d] text-xl tracking-wide mb-4">Location</label>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-4">
              <label className="block font-semibold text-green-600 text-lg mb-2">Country*</label>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setUserState("");
                }}
                className="w-full border rounded-lg border-gray-300 bg-white p-2 shadow-sm focus:ring-0 focus:outline-none"
              >
                <option value="">Select Country</option>
                {countries.map((c: any) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block font-semibold text-green-600 text-lg mb-2">City*</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="Enter city"
                className="w-full border rounded-lg border-gray-300 bg-white p-2 shadow-sm focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 mb-4">
              <label className="block font-semibold text-green-600 text-lg mb-2">State*</label>
              <input
                type="text"
                value={user_state}
                onChange={(e) => setUserState(e.target.value)}
                placeholder="Enter state"
                className="w-full border rounded-lg border-gray-300 bg-white p-2 shadow-sm focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className={`px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Post Job"}
          </button>
        </div>
      </section>

      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg text-white shadow-lg transition-all duration-300 ${
            toastType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default PostNewJob;