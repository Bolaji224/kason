import React, { FunctionComponent } from 'react';
import CardSection from './CardSection';
import Images from '../../../../components/constant/Images';

const ManagementSection: FunctionComponent = () => {
  return (
    <section>
       <div className="flex justify-center">
  <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:items-center justify-center gap-[2rem] py-[4rem]">
    <CardSection
      companyLogo={Images.MoniepointImage}
      companyName='Moniepoint'
      LocationName='Ikeja Lagos, Nigeria'
      jobTitle="Backend Engineer"
      jobDescription="We are looking for a talented backend engineer to join our team..."
      payment={2800} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.PalmpayImage}
      companyName='Palmpay'
      LocationName='Ikeja Lagos, Nigeria'
      jobTitle="Full stack Developer"
      jobDescription="We are looking for full stack developer to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.PaypalImage}
      companyName='Paypal'
      LocationName='New York, USA'
      jobTitle="Software Engineer"
      jobDescription="We are looking for a talented software engineer to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.TiktokImage}
      companyName='Tiktok'
      LocationName='Alanta Georgia, USA'
      jobTitle="Product Designer"
      jobDescription="We are looking for a product designer to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.AppleImage}
      companyName='Apple'
      LocationName='Alanta Georgia, USA'
      jobTitle="Swift Developer"
      jobDescription="We are looking for a swift developer to join our team..."
      payment={2500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.MicrosoftImage}
      companyName='Mircrosoft'
      LocationName='Alanta Georgia,USA'
      jobTitle="Technical Analyst"
      jobDescription="We are looking technical analyst engineer to join our team..."
      payment={2000} // example payment amount in Naira
    />
  </div>
</div>
    </section>
  );
};

export default ManagementSection;
