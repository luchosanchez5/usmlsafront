import React, { lazy } from 'react'
import { Route } from 'react-router-dom';
import ProviderRegister from '../pages/Login/ProviderRegister';
const Login = lazy(() => import('../pages/Login/Login.js'));
const GoogleSucceed = lazy(() => import('../pages/Login/GoogleResponse.js'));
const ForgetPassword = lazy(() => import('../pages/Login/ForgetPassword.js'));
const SelectRole = lazy(() => import('../pages/Login/SelectRole.js'));
const ResetPassword = lazy(() => import('../pages/Login/ResetPassword.js'));
const Home = lazy(() => import('../pages/Home/Home'));
const GlobalRoutes = (
    <>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/auth/register' element={<ProviderRegister />}></Route>
        <Route exact path='/auth/google-succeed' element={<GoogleSucceed />}></Route>
        <Route exact path='/auth/select-role' element={<SelectRole />}></Route>
        <Route exact path='/auth/login' element={<Login />}></Route>
        <Route exact path='/auth/forget-password' element={<ForgetPassword />}></Route>
        <Route exact path='/auth/reset-password' element={<ResetPassword />}></Route>


    </>
)

export default GlobalRoutes