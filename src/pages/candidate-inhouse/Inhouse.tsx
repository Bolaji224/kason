// src/pages/ordinary/Ordinary.tsx
import React from "react";

import FooterSection from "../../components/reusable/FooterSection";
import ManagedServicesPage from "./components/Home";



const Inhouse: React.FC = () => {
  return (
    <div>
      <h1>Inhouse Page Works ✅</h1>
      <ManagedServicesPage />
      <FooterSection />
      
    </div>
  );
};

export default Inhouse;
