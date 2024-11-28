import React, { lazy } from 'react'
import { Route } from 'react-router-dom';
import ChangePassword from '../pages/Dashboard/ChangePassword.js';
const YourTeams = lazy(() => import('../pages/Dashboard/YourTeams.js'));
const YourTeamDetails = lazy(() => import('../pages/Dashboard/YourTeamDetails.js'));
const Setting = lazy(() => import('../pages/Dashboard/Setting.js'));
const Co_ManagerRoutes = (
    <>
        <Route exact path='/dashboard/yourteam' element={<YourTeams />}></Route>
        <Route exact path='/dashboard/yourteam/:id' element={<YourTeamDetails />}></Route>
        <Route exact path='/dashboard/user/setting' element={<Setting />}></Route>
        <Route exact path='/dashboard/user/change-password' element={<ChangePassword />}></Route>


    </>
)

export default Co_ManagerRoutes