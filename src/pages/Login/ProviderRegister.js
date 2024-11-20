
import React from "react";
import AuthLayout from "../../layout/AuthLayout";
import ProviderRegisterForm from '../../components/register/ProviderRegister';

const ProviderRegister = () => {
  return (
    <>
  <ProviderRegisterForm/>
    </>
  );
}

export default  AuthLayout(ProviderRegister);
