import React from "react";
import { useCMS } from "../../../hooks/useCMS";

const Innovations: React.FC = () => {
  const { about } = useCMS();

  return (
    <section className="py-12 flex flex-col gap-12 justify-center px-6">
      <div className="bg-[#023020] border border-gray-200 shadow-md rounded-xl p-8 max-w-2xl mx-auto text-center">
        <h2 className="text-white text-sm font-semibold tracking-wide mb-3">
          {about.about_vision_label}
        </h2>
        <h3 className="text-white text-xl md:text-2xl font-bold leading-relaxed">
          {about.about_vision_description}
        </h3>
      </div>
    </section>
  );
};

export default Innovations;
