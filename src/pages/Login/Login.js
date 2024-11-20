import React from 'react'
import LoginForm from '../../components/Login/LoginForm'
import AuthLayout from "../../layout/AuthLayout";
const Login = () => {
  return (
   <LoginForm/>
  )
}

export default AuthLayout(Login)