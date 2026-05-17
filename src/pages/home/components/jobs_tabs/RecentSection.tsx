import React from 'react';
import CardSection from './CardSection';
import Images from '../../../../components/constant/Images';




const RecentSection: React.FC< {jobs : any[]}>= ({jobs}) => {
 return (
  <div className="flex justify-center">
  <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:items-center justify-center gap-[2rem] py-[4rem]">
    {
      jobs.map((job, i)=> (
            <CardSection
            companyLogo={job.company.avatar}
            companyName={job.company.name}
            LocationName={`${job.location.substring(0, 20)} ...`}
            jobTitle={job.title}
            jobDescription={`${job.description.substring(0, 64)}${job.description.length > 64 ? '...' : ''}`}
            payment={job.salary} // example payment amount in Naira
            workType={job.work_type.title}
            jobType={job.job_type.title}
            datePosted={job.date_posted}
            slug={job.slug}
          />
           
      ))
    }

  </div>
</div>
  );
};

export default RecentSection;
