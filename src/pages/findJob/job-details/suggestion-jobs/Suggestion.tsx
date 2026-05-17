import React, { FunctionComponent, useEffect, useState } from 'react';
import Images from '../../../../components/constant/Images';
import SuggestionCrad from './SuggetionCard';
import { useParams } from 'react-router-dom';
import { httpGetWithoutToken } from '../../../../utils/http_utils';

const Suggestion: FunctionComponent = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const fetchJobs = async () => {
    const resp = await httpGetWithoutToken("jobs/similar/"+params.slug);
    if(resp.status == "success") {
       setJobs(resp.data.slice(0, 9))
    }else{
        console.log(resp.error)
    }
    setLoading(false)
}
useEffect(()=> {
  fetchJobs()
} , [])
  return (
    <div className="flex justify-center">
    <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:items-center justify-center gap-[2rem] py-[4rem]">
      {
        jobs.map((item, i)=> (
          <SuggestionCrad
          key={i}
            companyLogo={item.company.avatar}
            companyName={item.company.name}
            LocationName={`${item.location.substring(0, 20)} ...`}
            jobTitle={item.title}
            jobDescription={`${item.description.substring(0, 64)}${item.description.length > 64 ? '...' : ''}`}
            payment={item.salary} // example payment amount in Naira
            slug={item.slug}
            workType={item.work_type.title}
            jobType={item.job_type.title}
            datePosted={item.date_posted}
          />
        ))
      }
    
    </div>
  </div>
  );
};

export default Suggestion;
