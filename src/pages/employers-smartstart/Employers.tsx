// src/pages/ordinary/Ordinary.tsx
import React from "react";

import EmployersSmartStart from "./components/Home";
import FeaturesSection from "./components/Features";
import FooterSection from "../../components/reusable/FooterSection";



const Employers: React.FC = () => {
  return (
    <div>
      <h1>Ordinary Page Works ✅</h1>
      <EmployersSmartStart />
      <FeaturesSection />
      <FooterSection />
    </div>
  );
};

export default Employers;
