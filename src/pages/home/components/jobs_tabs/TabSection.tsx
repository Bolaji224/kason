import React, { useEffect, useState } from "react";
import RecentSection from "./RecentSection";
import DesignSection from "./DesignSection";
import DevelopmentSection from "./DevelopmentSection";
import FinanceSection from "./FinanceSection";
import ManagementSection from "./ManagementSection";
import ConsultingSection from "./ConsultingSection";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { httpGetWithoutToken } from "../../../../utils/http_utils";
import { useToast } from "@chakra-ui/react";

const TabSection: React.FC = () => {
  const [toggle, setToggle] = useState<string>("recent");
  const [recent, setRecent] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [totalList, setTotalList] = useState(0);
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const toast = useToast();
  function updateToggle(id: string) {
    setToggle(id);
  }
  const fetchConstants = async () => {
    let res = await httpGetWithoutToken('jobs/homepage');
    if(res.status == "success") {
      setRecent(res.data.recent)
      setDepartments(res.data.departments);
      setTotalList(res.data.departments.length + 1)
      setActiveJobs(res.data.recent)
      setToggle("recent")
    }else{
      return toast({
        title: "We hit a snag!",
        description : res.error,
        duration : 5000,
        status : "error",
        isClosable : true
      })
    }
  }
useEffect(()=> {
  fetchConstants()
}, [])
  return (
    <section className="py-[4rem]">
      <section className="flex justify-center items-center">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[2rem]">
            <li
              className={`list-none lg:text-[18px] md:text-[16px] text-[14px] text-center ${
                toggle === "recent" ? "text-[#EE009D]" : "text-[#646A73]"
              } cursor-pointer lg:hover:text-[18px] md:hover:text-[16px] hover:text-[14px] hover:text-[#EE009D] font-sans font-semibold tracking-[0.5px]`}
              onClick={() => updateToggle("recent")}
            >
              All Recent
            </li>
            {
              departments.map((dept:any, i)=> (
              <li
                className={`list-none lg:text-[18px] md:text-[16px] text-center text-[14px] ${
                  toggle === dept.title ? "text-[#EE009D]" : "text-[#646A73]"
                } cursor-pointer lg:hover:text-[18px] md:hover:text-[16px] hover:text-[14px] hover:text-[#EE009D] font-sans font-semibold tracking-[0.5px]`}
                onClick={() => updateToggle(dept.title)}
              >
                {dept.title}
              </li>
              ))
            }
                
          {/* {[1, 2, 3, 4, 5, 6].map((tabIndex) => (
            <li
              key={tabIndex}
              className={`list-none lg:text-[18px] md:text-[16px] text-[14px] ${
                toggle === tabIndex ? "text-[#EE009D]" : "text-[#646A73]"
              } cursor-pointer lg:hover:text-[18px] md:hover:text-[16px] hover:text-[14px] hover:text-[#EE009D] font-sans font-semibold tracking-[0.5px]`}
              onClick={() => updateToggle(tabIndex)}
            >
              {tabIndex === 1 && "All Recent"}
              {tabIndex === 2 && "Design"}
              {tabIndex === 3 && "Development"}
              {tabIndex === 4 && "Finance"}
              {tabIndex === 5 && "Management"}
              {tabIndex === 6 && "Consulting"}
            </li>
          ))} */}
        </div>
      </section>
      <section>
        <div className="relative max-w-[1000px] mx-auto mt-[1.5rem]">
          <div className="border-2 border-[#EE009D] opacity-[0.3]" />
          {/* {toggle !== 7 && (
            <div
              className={`absolute inset-x-0 bottom-0 h-0 border-t-4 border-[#EE009D] w-[calc(100%/7)]`}
              style={{ left: `calc(${(toggle - 1) * (100 / 6)}%)` }}
            />
          )} */}
        </div>
        <div className={`${toggle === "recent" ? "block" : "hidden"}`}>
          <RecentSection jobs={activeJobs} />
        </div>
        {
          departments.map((dept:any, i)=> (
            <div className={`${toggle === dept.title ? "block" : "hidden"}`}>
              <RecentSection jobs={dept.jobs} />
            </div>
          ))
        }
        
      </section>
      <div className='pt-[1rem] text-center flex items-center justify-center '>
          <Link to="/find-job">
            <button className="text-sm sm:text-base font-medium text-white bg-[#ee009d] flex items-center gap-4 justify-center hover:bg-green-600 py-2 px-4 sm:py-3 sm:px-6 rounded-lg">View All <FaArrowRightLong /></button>
          </Link>
        </div>
    </section>
  );
};

export default TabSection;
