import React from "react";
import Images from "../../../components/constant/Images";

const SmartStartSection: React.FC = () => {
  const heroImages = [
    {
      src: Images.CvBuilders,
      alt: "Checklist",
      className: "w-48 h-36",
    },
    {
      src: Images.CareerCardImageFour,
      alt: "virtual Assistance ",
      className: "w-44 h-32",
    },
    {
      src: Images.OfficeSetting,
      alt: "Client meeting",
      className: "w-52 h-36",
    },
    { src:Images.Checklist,  alt: "Cv Builders", className: "w-48 h-36" },
    // {
    //   src: Images.CareerCardImageSix,
    //   alt: "Portfolio showcase",
    //   className: "w-48 h-40",
    // },
    // { src: Images.SocialMedia, alt: "Tools and apps", className: "w-44 h-32" },
    // {
    //   src: Images.SuccessMetric,
    //   alt: "Success metrics",
    //   className: "w-48 h-44",
    // },
    // {
    //   src: Images.EmployerRegisterImage,
    //   alt: "Freelance profile",
    //   className: "w-40 h-36",
    // },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            {/* Navigation Breadcrumb */}

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartStart
              </span>
            </h1>

            {/*Subtitle*/}
            {/* <p className="text-xl text-gray-600 mb-8 font-medium">
              Start Smarter, grow faster.
            </p> */}

            {/* Description */}
            <span className="text-gray-800 text-2xl block mt-2 font-bold leading-tight">
                What is SmartStart?
              </span>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            SmartStart™ is a launch toolkit that helps new freelancers get
              started faster and look professional from day one — even with no
              prior experience. It provides templates, guidance, and setup tools
              to help them start earning quickly on Workason.
            </p>

            {/* What's Inside Section*/}
            <div className="mb-10">
              <h2 className="text-2xl font-bold to-gray-800 mb-6">
                What's Inside SmartStart
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Editable Gig Templates (e.g., 'I will be your VA...')
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Proposal Examples & Cover Letters
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Smart CV Builder (with downloadable formats)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Onboarding Steps Checklist
                  </span>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Optional Video Tutorials
                  </span>
                </div>
              </div>
            </div>
            {/* SkillStamped Section */}
            {/* <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Want to get SkillStamped™?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                SmartGuide™ is the path to earning your SkillStamp™ verification
                badge. Complete your guide, submit your test project, and unlock
                new opportunities on the platform!
              </p>
            </div> */}

            {/* CTA Section */}
            {/* <div className="text-center lg:text-left"> */}
              {/* <button className="bg-gradient-to-r from-pink-500 to-purple-700 hover:from-pink-500 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl mb-4">
                Start Your SmartStart Now
              </button> */}
              {/* <p className="text-gray-600 font-medium">
                Follow the roadmap. Build your reputation. Get hired faster.
              </p> */}
            {/* </div> */}
          </div>

          {/* Right Images Grid */}
          <div className="flex-1 relative max-w-2xl lg:block hidden">
            <div className="relative w-full h-[600px] lg:h-[700px]">
              {/* Image Grid Container */}
              <div className="absolute inset-0 grid grid-cols-3 gap-4 p-4">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`
                      relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1
                      ${index === 0 ? "col-span-2 row-span-2" : ""}
                      ${index === 2 ? "row-span-2" : ""}
                      ${index === 4 ? "col-span-2" : ""}
                    `}
                    style={{
                      background: `linear-gradient(${45 + index * 30}deg, 
                        ${
                          index % 3 === 0
                            ? "#6366f1"
                            : index % 3 === 1
                            ? "#8b5cf6"
                            : "#06b6d4"
                        }20, 
                        ${
                          index % 3 === 0
                            ? "#8b5cf6"
                            : index % 3 === 1
                            ? "#06b6d4"
                            : "#6366f1"
                        }20)`,
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}
              </div>

              {/* Floating Elements */}
              {/* <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400 rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute bottom-20 left-10 w-16 h-16 bg-pink-400 rounded-full opacity-60 animate-pulse"></div> */}
              <div className="absolute top-1/2 right-0 w-12 h-12 bg-green-400 rounded-full opacity-70 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartStartSection;
