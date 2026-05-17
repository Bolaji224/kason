import React from 'react';
import { UilEnvelope } from '@iconscout/react-unicons';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaDribbble, FaTiktok } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface PersonalProfileProps {
  profileData: {
    avatar?: string;
    name: string;
    email: string;
    location?: string;
    city: string;
    state: string;
    // country: string;
    qualification?: string;
    gender?: string;
    expectedSalary?: string | null;
    resume_title?: string | null;
    resume: string;
    social_medias: {
      id: number;
      label: string;
      value: string | null;
    }[];
  };
}

const PersonalProfile: React.FC<PersonalProfileProps> = ({ profileData }) => {
  // const socialMediaIcons: { [key: string]: JSX.Element } = {
  //   Facebook: <FaFacebook className="w-4 h-4" color="#2AA100" />,
  //   Twitter: <FaTwitter className="w-4 h-4" color="#2AA100" />,
  //   LinkedIn: <FaLinkedin className="w-4 h-4" color="#2AA100" />,
  //   Instagram: <FaInstagram className="w-4 h-4" color="#2AA100" />,
  //   Tiktok: <FaTiktok className="w-4 h-4" color="#2AA100" />,
  //   Dribble: <FaDribbble className="w-4 h-4" color="#2AA100" />,
  // };

  return (
    <div className="py-8 md:py-16 mt-8 md:mt-16 bg-white w-full md:w-[600px] lg:w-[800px] xl:w-[1000px] h-auto rounded-lg shadow-lg text-gray-800">
      <div className="flex flex-col items-start w-[90%] mx-auto">
        <div className="flex items-center justify-center w-full mb-4">
          <img
            src={profileData.avatar || '/default-avatar.png'}
            alt="personal-profile"
            className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover rounded-full"
          />
        </div>
        <div className="w-full border-b border-gray-300 pb-4 mb-4">
          <h1 className="text-xl md:text-2xl text-center font-bold">{profileData.name}</h1>
        </div>
        <div className="w-full border-b border-gray-300 pb-4 mb-4">
          <p className="text-[#2AA100] text-[14px] md:text-[16px] font-semibold">Location:</p>
         <div className='flex gap-1'> <p className="text-[#646A73] text-[12px] md:text-[14px]">{profileData.city || 'Not Provided'}, </p>
         <p className="text-[#646A73] text-[12px] md:text-[14px]">{profileData.state || 'Not Provided'}</p>
         {/* <p className="text-[#646A73] text-[12px] md:text-[14px]">{profileData.country || 'Not Provided'}</p> */}
         </div>
        </div>
        <div className="w-full border-b border-gray-300 pb-4 mb-4">
          <p className="text-[#2AA100] text-[14px] md:text-[16px] font-semibold">Email:</p>
          <p className="flex items-center text-[12px] md:text-[14px]">
            <UilEnvelope className="mr-2" />
            {profileData.email}
          </p>
        </div>
        <div className="w-full border-b border-gray-300 pb-4 mb-4">
          <p className="text-[#2AA100] text-[14px] md:text-[16px] font-semibold">Qualification:</p>
          <p className="text-[#646A73] text-[12px] md:text-[14px]">{profileData.qualification || 'Not Provided'}</p>
        </div>
        <div className="w-full border-b border-gray-300 pb-4 mb-4">
          <p className="text-[#2AA100] text-[14px] md:text-[16px] font-semibold">Gender:</p>
          <p className="text-[#646A73] text-[12px] md:text-[14px]">{profileData.gender || 'Not Provided'}</p>
        </div>
        <div className="w-full border-b border-gray-300 pb-4 mb-4">
          <p className="text-[#2AA100] text-[14px] md:text-[16px] font-semibold">Expected Salary:</p>
          <p className="text-[#646A73] text-[12px] md:text-[14px]">
            {profileData.expectedSalary || 'Not Provided'}
          </p>
        </div>
        <div className="w-full border-b border-gray-300 pb-4 mb-4">
          <p className="text-[#2AA100] text-[14px] md:text-[16px] font-semibold">Social:</p>
          {/* <div className="flex mt-4 space-x-4">
            {profileData.social_medias.map((media) =>
              media.value ? (
                <a
                  key={media.id}
                  href={media.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  {socialMediaIcons[media.label] || null}
                </a>
              ) : null
            )}
          </div> */}
        </div>
        <div className="w-full">
          {profileData.resume_title ? (
            <Link
              to={profileData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700"
            >
              Download CV
            </Link>
          ) : (
            <p className="text-gray-500 text-center">No CV Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
