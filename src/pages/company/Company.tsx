import React from 'react'
import HeroSection from './components/HeroSection'
// import ClientSection from './components/ClientSection'
import EasyManageSection from './components/EasyManageSection'
import VideoCallSection from './components/VideoCallSection'
import EasyStepSection from './components/EasyStepSection'
import WhatTheySayingSection from './components/WhatTheySayingSection'
import JoinUsSection from './components/JoinUsSection'
import FooterSection from '../../components/reusable/FooterSection'

const Company: React.FC = () => {
  return (
   <>
    <HeroSection />
    {/* <ClientSection /> */}
    <EasyManageSection />
    <VideoCallSection />
    <EasyStepSection />
    <WhatTheySayingSection />
    <JoinUsSection />
    <FooterSection />
   </>
  )
}

export default Company
