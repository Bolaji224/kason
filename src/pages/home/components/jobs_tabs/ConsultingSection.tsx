import React, { FunctionComponent } from 'react';
import CardSection from './CardSection';
import Images from '../../../../components/constant/Images';

const ConsultingSection: FunctionComponent = () => {
  return (
    <div className="flex justify-center">
    <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:items-center justify-center gap-[2rem] py-[4rem]">
    <CardSection
      companyLogo={Images.StanbicImage}
      companyName='Stanbic IBTC'
      LocationName='Lekki Lagos, Nigeria'
      jobTitle="Customer Service"
      jobDescription="We are looking for a customer service to join our team..."
      payment={700} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.UBAImage}
      companyName='UBA Bank'
      LocationName='Surulere Lagos, Nigeria'
      jobTitle="Customer Support Officer"
      jobDescription="We are looking for a talented customer support officer to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.ZenithBankImage}
      companyName='Zenith Bank'
      LocationName='Lekki Lagos, Nigeria'
      jobTitle="Entry Level Recruitment"
      jobDescription="We are looking for graduate training from 25 years below  to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.FidelityImage}
      companyName='Fidelity Bank'
      LocationName='Surulere Lagos, Nigeria'
      jobTitle="Senior Frontend Engineer"
      jobDescription="We are looking for a talented senior frontend engineer to join our team..."
      payment={2500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.FirstBankImage}
      companyName='First Bank'
      LocationName='Marina Lagos Nigeria'
      jobTitle="Team Lead"
      jobDescription="We are looking for a talented team lead to join our team..."
      payment={1500} // example payment amount in Naira
    />
    <CardSection
      companyLogo={Images.AccessbankImage}
      companyName='Access Bank'
      LocationName='Victoria Island Lagos, Nigeria'
      jobTitle="Head of Compliance"
      jobDescription="We are looking a head compliance to join our team..."
      payment={1500} // example payment amount in Naira
    />
    </div>
  </div>
  );
};

export default ConsultingSection;
