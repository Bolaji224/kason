import { UilAngleRight } from "@iconscout/react-unicons";
import React from "react";
import { RiNumber1 } from "react-icons/ri";

interface CandidateProfile {
  candidate: any;
}

const CandidateDetails = ({ candidate }: CandidateProfile) => {
  const { Resume, social_medias } = candidate;

  return (
    <div className="mt-[4rem] text-gray-800">
      {/* Overview Section */}
      {Resume?.overview && (
        <section className="mb-8 p-5 rounded-lg border border-gray-300">
          <h2 className="text-2xl font-semibold font-sans text-[#2aa100] border-b-2 tracking-[0.4px] border-[#2aa100] pb-2 mb-4">
            Overview
          </h2>
          <p className="mb-4">{Resume.overview}</p>
        </section>
      )}

      {/* Intro Section */}
      {Resume?.intro && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2AA100] tracking-[0.4px] font-sans pb-2 mb-4">
            Intro
          </h2>
          <div className="video-container">
            <video className="w-full h-auto rounded-lg" controls>
              <source src={Resume.intro} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      )}

      {/* Education Section */}
      {Resume?.educations?.length > 0 && (
        <section className="mb-8 p-5 rounded-lg border border-gray-300">
          <h2 className="text-xl font-semibold border-b-2 border-blue-600 pb-2 mb-4">
            Education
          </h2>
          {Resume.educations.map((education: any) => (
            <div key={education.id} className="mb-6">
              <h3 className="text-lg font-bold">{education.academy}</h3>
              <p>{education.title}</p>
              <p className="text-sm text-gray-600">{education.year}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {Resume?.skills && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b-2 border-blue-600 pb-2 mb-4">
            Skills
          </h2>
          <ul className="flex flex-wrap gap-2">
            {Resume.skills.split(",").map((skill: string, index: number) => (
              <li key={index} className="bg-gray-200 px-3 py-1 rounded-md">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

       {/* Experience Section */}
      {Resume?.experience ? (
        <section className="mb-8 p-5 rounded-lg border border-gray-300">
          <h2 className="text-xl font-semibold border-b-2 border-[#2AA100] pb-2 mb-4">
            Years of experience
          </h2>
          <p>{Resume.experience}</p>
        </section>
      ) : (
        <section className="mb-8 p-5 rounded-lg border border-gray-300">
          <h2 className="text-xl font-semibold border-b-2 border-[#2AA100] pb-2 mb-4">
          Years of xperience
          </h2>
          <p className="text-gray-500">No experience information available.</p>
        </section>
      )}

      {/* Portfolio Section */}
      {Resume?.portfolio?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold border-b-2 border-[#2AA100] pb-2 mb-4">
            Portfolio
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Resume.portfolio.map((item: any) => (
              <img
                key={item.id}
                src={item.file_url}
                alt="Portfolio"
                className="w-full h-auto rounded-lg"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CandidateDetails;
