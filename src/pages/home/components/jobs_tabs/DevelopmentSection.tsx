import React from 'react'
import CardSection from './CardSection'
import Images from '../../../../components/constant/Images'

export default function DevelopmentSection() {
  return (
    <section>
      <div className="flex justify-center">
  <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:items-center justify-center gap-[2rem] py-[4rem]">
    <CardSection
      companyLogo={Images.HuaweiImage}
      companyName='Huawei'
      LocationName='Lekki Lagos, Nigeria'
      jobTitle="Customer Care Assistant"
      jobDescription="We are looking for a talented Customer Care Assistant to join our team..."
      payment={400} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.ModernaImage}
      companyName='Moderna'
      LocationName='Lekki Lagos, Nigeria'
      jobTitle="Compliance Head"
      jobDescription="We are looking for a talented compliance head to join our team..."
      payment={1000} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.AccessbankImage}
      companyName='Access Bank'
      LocationName='Lekki Lagos, Nigeria'
      jobTitle="IT Specialist"
      jobDescription="We are looking for a talented IT specialist to join our team..."
      payment={2000} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.SterlingBankImage}
      companyName='Sterling Bank'
      LocationName='Surulere Lagos, Nigieria'
      jobTitle="Head of Margeting"
      jobDescription="We are looking for a talented head of marketing to join our team..."
      payment={1400} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.ThreadsImage}
      companyName='Threads'
      LocationName='Alanta Georgia, USA'
      jobTitle="Product Designer"
      jobDescription="We are looking for a talented product designer to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.SamsungImage}
      companyName='Samsung'
      LocationName='Alanta Georgia, USA'
      jobTitle="Digital Marketing"
      jobDescription="We are looking for a talented digital marketing to join our team..."
      payment={800} // example payment amount in Naira
    />
  </div>
</div>
    </section>
  )
}
