// src/pages/ordinary/Ordinary.tsx
import React from "react";
import OrdinaryFreelancers from "./components/Home";
import FooterSection from "../../components/reusable/FooterSection";



const Candidates: React.FC = () => {
  return (
    <div>
      <OrdinaryFreelancers />
      <FooterSection />
      
    </div>
  );
};

export default Candidates;
