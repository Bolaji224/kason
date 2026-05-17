// src/pages/ordinary/Ordinary.tsx
import React from "react";
import FooterSection from "../../components/reusable/FooterSection";
import TalentVaultPage from "./components/Home";

const Ordinary: React.FC = () => {
  return (
    <div>
      <h1>Ordinary Page Works ✅</h1>
      <TalentVaultPage />
      <FooterSection />
    </div>
  );
};

export default Ordinary;
