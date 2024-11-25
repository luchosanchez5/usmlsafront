import React, { lazy } from 'react'
import { Route } from 'react-router-dom';
const AddPerson = lazy(() => import('../pages/Dashboard/AddPerson.js'));
const PaymentHistory = lazy(() => import('../pages/Dashboard/Payment.js'));
const Setting = lazy(() => import('../pages/Dashboard/Setting.js'));
const AllTeamsDetails = lazy(() => import('../pages/Dashboard/AllTeamsDetails.js'));
const AddTeams = lazy(() => import('../pages/Dashboard/AddTeams.js'));
const RegisterTeam = lazy(() => import('../pages/Payment/RegisterTeam.jsx'));
const AllTeam = lazy(() => import("../pages/Dashboard/AllTeam.js"));

const ManagerRoutes = (
    <>
        <Route exact path='/dashboard/allteams' element={<AllTeam />}></Route>
        <Route exact path='/dashboard/allteams/:id' element={<AllTeamsDetails />}></Route>
        <Route exact path='/dashboard/addteams' element={<AddTeams />}></Route>
        <Route exact path='/dashboard/payment/history' element={<PaymentHistory />}></Route>
        <Route exact path='/dashboard/addperson' element={<AddPerson />}></Route>
        <Route exact path='/dashboard/user/setting' element={<Setting />}></Route>
        <Route exact path='/dashboard/registerteam/:id' element={<RegisterTeam />}></Route>
    </>
)

export default ManagerRoutes