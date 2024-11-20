import React from 'react'
import AuthLayout from '../../layout/AuthLayout'
import ResetPasswordForm from '../../components/Login/ResetPasswordForm'
const ResetPassword = () => {
  return (
   <ResetPasswordForm/>
  )
}

export default AuthLayout(ResetPassword)