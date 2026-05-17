import React from "react";
import { useNavigate } from "react-router-dom";


const EmployersSmartStart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-12">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              SmartStart – Get Matched with  <br /> Verified Talent
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              SmartStart uses AI matching to pair you with pre-screened, SkillStamps™ verified talents based on your exact needs, workflow, and budget — without browsing or trial-and-error.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="bg-[#2AA100] text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Hiring
            </button>
          </div>

          {/* Right Content - Image with Candidate Cards */}
          <div className="relative mt-12">
            {/* Main Image */}
            <div className="relative z-10">
             <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop"
                alt="Happy professional"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto px-8 py-16 text-center">
        <p className="text-xl text-gray-600">
          More than{" "}
          <span className="text-green-600 font-bold text-2xl">23,000</span>{" "}
          employers cutting across various industries have trusted us over the past years.
        </p>
      </div>
    </div>
  );
};

export default EmployersSmartStart;
