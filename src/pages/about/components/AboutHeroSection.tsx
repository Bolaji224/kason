import React from "react";
import Images from "../../../components/constant/Images";
import { FaUser } from "react-icons/fa6";

const AboutHeroSection: React.FC = () => {
  return (
    <section>
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${Images.AboutHeroImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        

        <h1 className="lg:text-[70px] md:text-[55px] text-[35px] mt-[1.5rem] font-bold tracking-wide leading-[1.2] text-white">
          We are here to assist <br />
          you <span className="text-[#ee009d]">in recruiting.</span>
        </h1>
      </div>
    </section>

    <div className="text-center px-6 max-w-3xl mx-auto py-12">
  <h1 className="text-3xl md:text-5xl font-bold text-[#0A2414] mb-6 leading-tight">
    Making  marketplace hunt easier
  </h1>

  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
    Workason is a next-generation freelance marketplace designed for global 
    clients who want trusted, verified talent without the stress of unreliable 
    freelancers or complicated hiring processes.
    <br /><br />
    We combine AI matching, SkillStamps™ verification, and our TalentVault to 
    help businesses hire virtual assistants, editors, and digital talent with 
    confidence. Whether you're in London, Lagos, or anywhere in the world, 
    Workason connects you to skilled freelancers who have been trained, tested, 
    and verified.
  </p>
</div>

    </section>
  );
};

export default AboutHeroSection;
