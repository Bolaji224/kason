import React from "react";
import FooterSection from "../FooterSection";
import ContactUs from "./components/ContactUs";
import Navbar from "../../navigation/Navbar";

const Contact: React.FC = () => {
  return (
    <div>
      <ContactUs />
      <FooterSection />
      <Navbar/>
    </div>
  );
};

export default Contact;
