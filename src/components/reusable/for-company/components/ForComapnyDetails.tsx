import React from 'react';

const ForCompanyAndJobSeeker: React.FC = () => {
  return (
    <div className="bg-gray-100 p-8 md:p-12 lg:p-20 mt-12">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10 lg:p-12 space-y-12">
        <section>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            For Company
          </h1>
          <p className="text-gray-600 mb-4">
            We all know running a business is not for slackers, and it might involve hiring someone to help you achieve your set goal. It will make no business sense to employ someone as a permanent staff who will be on your payroll, thereby increasing your monthly expenses as a startup that is not financially buoyant.
          </p>
          <p className="text-gray-600 mb-4">
            Many professionals are also moving from paid jobs to freelancing due to work balance and flexibility. As a company, freelancers provide you with high-quality work at a low cost. It is comforting to know that the risk is very low because the money you deposited for the job will remain in the escrow account until you are satisfied with the quality of the job, and you must approve the release of the funds to the freelancer.
          </p>
        </section>
        
        <section>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            For Job Seeker
          </h1>
          <p className="text-gray-600 mb-4">
            If you love to work for yourself, it is time to start your own business or join a community of freelancers and start freelancing, taking on several projects. There are various benefits of working as a freelancer, including choosing which project to work on, setting your earning potential, and the flexibility of working for yourself.
          </p>
          <p className="text-gray-600 mb-4">
            Some of us love to spend more time with our family, thereby needing the flexibility to choose our working time and the project we work on. Such a person can achieve that through freelancing.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ForCompanyAndJobSeeker;
