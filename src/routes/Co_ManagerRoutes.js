import React, { lazy } from 'react'
import { Route } from 'react-router-dom';
const YourTeams = lazy(() => import('../pages/Dashboard/YourTeams.js'));
const YourTeamDetails = lazy(() => ('../pages/Dashboard/YourTeamDetails.js'));
const Setting = lazy(() => import('../pages/Dashboard/Setting.js'));
const Co_ManagerRoutes = (
    <>
        <Route exact path='/dashboard/yourteam' element={<YourTeams />}></Route>
        <Route exact path='/dashboard/yourteam/:id' element={<YourTeamDetails />}></Route>
        <Route exact path='/dashboard/user/setting' element={<Setting />}></Route>

    </>
)

export default Co_ManagerRoutes