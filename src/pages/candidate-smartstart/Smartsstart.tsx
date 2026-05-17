// src/pages/ordinary/Ordinary.tsx
import React from "react";
import SmartStartTalents from "./components/Home";
import FooterSection from "../../components/reusable/FooterSection";



const Smartsstart: React.FC = () => {
  return (
    <div>
      <SmartStartTalents />
      <FooterSection />
    </div>
  );
};

export default Smartsstart;
