import React from "react";
import PrivacyPolicyDetails from "./components/PrivacyPolicyDetails";
import FooterSection from "../FooterSection";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
        <PrivacyPolicyDetails />
        <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;
