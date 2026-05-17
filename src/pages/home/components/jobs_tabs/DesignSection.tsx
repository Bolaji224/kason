import React, { FunctionComponent } from 'react';
import CardSection from './CardSection';
import Images from '../../../../components/constant/Images';

const DesignSection: FunctionComponent = () => {
  return (
    <section>
       <div className="flex justify-center">
  <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:items-center justify-center gap-[2rem] py-[4rem]">
    <CardSection
      companyLogo={Images.IBMImage}
      companyName='IBM'
      LocationName='Houstin Texas, USA'
      jobTitle="Tech Specalist"
      jobDescription="We are looking for a talented technical specialist to join our team..."
      payment={1000} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.SportifyImage}
      companyName='Spotify'
      LocationName='South America'
      jobTitle="Full-stack Engineer"
      jobDescription="We are looking for a talented full-satck engineer to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.AmazonImage}
      companyName='Amazon'
      LocationName='Ontario, Canada'
      jobTitle="IT Specialist"
      jobDescription="We are looking for a talented IT specialist to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.OracleImage}
      companyName='Oracle'
      LocationName='New York, USA'
      jobTitle="UX/UI Designer"
      jobDescription="We are looking for a ui ux designer to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.UberImage}
      companyName='Uber'
      LocationName='North America'
      jobTitle="SEO Associate"
      jobDescription="We are looking for a talented SEO Associate to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.MicrosoftImage}
      companyName='Mircrosoft'
      LocationName='New York, USA'
      jobTitle="DevOps Engineer"
      jobDescription="We are looking for a talented DevOps engineer to join our team..."
      payment={1500} // example payment amount in Naira
    />
  </div>
</div>
    </section>
  );
};

export default DesignSection;
