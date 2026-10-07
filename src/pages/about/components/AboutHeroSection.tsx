import React from "react";
import Images from "../../../components/constant/Images";
import { useCMS } from "../../../hooks/useCMS";

const AboutHeroSection: React.FC = () => {
  const { about } = useCMS();

  return (
    <section>
      {/* Full-screen hero with background image */}
      <section
        className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: `url(${Images.AboutHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="lg:text-[70px] md:text-[55px] text-[35px] mt-[1.5rem] font-bold tracking-wide leading-[1.2] text-white">
            {about.about_hero_heading} <br />
            you <span className="text-[#ee009d]">{about.about_hero_highlight}</span>
          </h1>
        </div>
      </section>

      {/* Intro text below hero */}
      <div className="text-center px-6 max-w-3xl mx-auto py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0A2414] mb-6 leading-tight">
          {about.about_intro_heading}
        </h1>
        <div
          className="text-gray-700 text-sm md:text-base leading-relaxed prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: about.about_intro_description_html }}
        />
      </div>
    </section>
  );
};

export default AboutHeroSection;
