import React from "react";
import { useNavigate } from "react-router-dom";
import jenny from "../../../images/workason/jenny.jpg";
import aderonke from "../../../images/workason/aderonke.jpg";
import musa from "../../../images/workason/musa.jpg";
import damilola from "../../../images/workason/damilola.jpg";
import { useCMS } from "../../../hooks/useCMS";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { employersOrdinary } = useCMS();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              {employersOrdinary.emp_ord_heading}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              {employersOrdinary.emp_ord_description}
            </p>
            <button
              onClick={() => navigate(employersOrdinary.emp_ord_button_url)}
              className="bg-[#2AA100] text-black font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {employersOrdinary.emp_ord_button}
            </button>
          </div>

          <div className="relative mt-12">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                alt="Happy professional"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
              />
            </div>

            <div className="absolute top-0 left-0 bg-white rounded-lg shadow-xl p-4 z-20 transform -translate-x-4 translate-y-8">
              <div className="flex items-center gap-3 mb-2">
                <img src={jenny} alt="Chisom Nwosu" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Chisom Nwosu</div>
                  <div className="text-xs text-gray-500">Virtual Assistant</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Experience: 5 years</div>
                <div>Availability: Immediately</div>
                <div>Location: Abuja</div>
              </div>
            </div>

            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl p-4 z-20 transform translate-x-4">
              <div className="flex items-center gap-3 mb-2">
                <img src={aderonke} alt="Aderonke Ajayi" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Aderonke Ajayi</div>
                  <div className="text-xs text-gray-500">Video Editor</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Experience: 3 years</div>
                <div>Availability: Immediately</div>
                <div>Location: Boston</div>
              </div>
            </div>

            <div className="absolute bottom-24 left-0 bg-white rounded-lg shadow-xl p-4 z-20 transform -translate-x-4">
              <div className="flex items-center gap-3 mb-2">
                <img src={musa} alt="Ejiro Oghenedega" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Ejiro Oghenedega</div>
                  <div className="text-xs text-gray-500">Video Editor</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Experience: 7 years</div>
                <div>Availability: Immediately</div>
                <div>Location: Port Harcourt</div>
              </div>
            </div>

            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 z-20 transform translate-x-4">
              <div className="flex items-center gap-3 mb-2">
                <img src={damilola} alt="Mohammed Musa" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Mohammed Musa</div>
                  <div className="text-xs text-gray-500">Virtual Assistant</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Experience: 7 years</div>
                <div>Availability: Immediately</div>
                <div>Location: Lagos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16 text-center">
        <p className="text-xl text-gray-600">
          More than{" "}
          <span className="text-green-600 font-bold text-2xl">{employersOrdinary.emp_ord_stats_count}</span>{" "}
          {employersOrdinary.emp_ord_stats_text}
        </p>
      </div>
    </div>
  );
};

export default Hero;
