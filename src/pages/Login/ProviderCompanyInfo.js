import React from 'react';
import CompanyInfoForm from '../../components/company-info/CompanyInfoForm';
import AuthLayout from "../../layout/AuthLayout";

const ProviderCompanyInfo = () => {

  return (
    <>
      <CompanyInfoForm />
    </>

  );
}

export default AuthLayout(ProviderCompanyInfo);
