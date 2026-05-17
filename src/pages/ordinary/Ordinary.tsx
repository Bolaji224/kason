// src/pages/ordinary/Ordinary.tsx
import React from "react";
import Hero from "./components/Hero"; 
import Key from "./components/Key";
import FooterSection from "../../components/reusable/FooterSection";

const Ordinary: React.FC = () => {
  return (
    <div>
      <h1>Ordinary Page Works ✅</h1>
      <Hero />
      <Key />
      <FooterSection />
    </div>
  );
};

export default Ordinary;
