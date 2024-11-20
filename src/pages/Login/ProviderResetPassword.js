import React from "react";
import ResetPasswordForm from "../../components/reset-password/ResetPasswordForm";
import AuthLayout from "../../layout/AuthLayout";
const ProviderResetPassword = () => {
  return (
    <>
      <ResetPasswordForm />
    </>
  );
};

export default AuthLayout(ProviderResetPassword);
