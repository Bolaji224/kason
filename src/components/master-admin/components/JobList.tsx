import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../global/state';
import { httpGetWithoutToken, httpGetWithToken } from '../../../utils/http_utils';
import Pagination from '../../../pages/findJob/components/Pagination';

interface Job {
  id: number;
  title: string;
  company: any;
  slug: string;
  location: string;
}
const ITEMS_PER_PAGE = 12;

const AdminJobList: React.FC = () => {
  const navigate = useNavigate();
  const { user } : any = useContext(AppContext);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [noJobs, setNoJobs] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("pending")
  // 'active','inactive','declined','deleted'
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(()=> {
    if(!user || user.role != "admin") {
      navigate("/admin")
    }else {
      fetchJobs();
    }
  }, [status])

  const fetchJobs = async () => {
      let url = `admin/jobs?limit=${ITEMS_PER_PAGE}&status=${status}`;
      let resp:any = await httpGetWithToken(url);
      setIsLoading(true)
      if(resp.status == "success") {
          setCurrentPage(1);
          var data = resp.data;
          data = data.map((d:any) => {
            return {
              id: d.id,
              slug: d.slug,
              title: d.title,
              company: d.company,
              location: d.location
            }
          })
          setDisplayedJobs(data)
          setIsLoading(false)
          setTotalPages(Math.ceil(resp.data.length / ITEMS_PER_PAGE));
          setNoJobs(resp.data.length == 0)
      }else{
          setIsLoading(false)
      }
  }
  const viewJobDetails = (slug: string) => {
    navigate(`/job-details/${slug}`);
  };
  // static $active = "active";
  // static $inactive = "inactive";
  // static $declined = "declined";
  // static $deleted = "deleted";
  return (
    <div className="max-w-4xl mx-auto mt-5 p-6">
      <br />
      <h1 className="text-2xl font-bold mb-6">Job Listings</h1>
      <div className="mt-3 flex justify-end">
        <select className="w-[150px] border rounded-lg border-gray-300 bg-white p-2 shadow-sm focus:ring-0 focus:outline-none" onChange={(e)=> setStatus(e.target.value)} name="job_status" id="" value={status}>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="declined">Declined</option>
        </select>
      </div>
      <div className="space-y-4">
        {
          !isLoading && displayedJobs.length == 0 && <div className='my-3'>No jobs not found!</div>
        }
      {displayedJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((job:any) => (
          <div key={job.id} className="bg-white p-4 rounded-md shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.company.name} - {job.location}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => viewJobDetails(job.slug)}
            >
              View
            </button>
          </div>
        ))}

        <div className="my-4">
          {totalPages > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> }
        </div>
      </div>
    </div>
  );
};

export default AdminJobList;
