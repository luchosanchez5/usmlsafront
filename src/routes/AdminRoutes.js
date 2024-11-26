import React,{lazy} from 'react'
import { Route } from 'react-router-dom';
import ChangePassword from '../pages/Dashboard/ChangePassword.js';
const AddPerson = lazy(() => import('../pages/Dashboard/AddPerson.js'));
const AllPersonDetails = lazy(() => import('../pages/Dashboard/AllPersonDetails.js'));
const Setting = lazy(() => import('../pages/Dashboard/Setting.js'));
const AllTeamsDetails = lazy(() => import('../pages/Dashboard/AllTeamsDetails.js'));
const AddTeams = lazy(() => import('../pages/Dashboard/AddTeams.js'));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AllTournament = lazy(() => import("../pages/Dashboard/AllTournament.js"));
const AddTournament = lazy(() => import("../pages/Dashboard/AddTournament.js"));
const AllTournamentDetails = lazy(() => import("../pages/Dashboard/AllTournamentDetails.js"));
const AllPerson = lazy(() => import("../pages/Dashboard/AllPerson.js"));
const AllTeam = lazy(() => import("../pages/Dashboard/AllTeam.js"));
const AddVenues = lazy(() => import("../pages/Dashboard/AddVenue.js"));
const AllVenues = lazy(() => import("../pages/Dashboard/AllVenus.js"));
const AddDivision = lazy(() => import("../pages/Dashboard/AddDivision.js"));
const AllDivision = lazy(() => import("../pages/Dashboard/AllDivision.js"));
const AllDivisionDetails = lazy(() => import("../pages/Dashboard/AllDivisionDetails.js"));
const AllVenusDetails = lazy(() => import("../pages/Dashboard/AllVenusDetails.js"));
const AdminRoutes = (
    <>
        <Route exact path='/dashboard' element={<Dashboard />}></Route>
        <Route exact path='/dashboard/allteams' element={<AllTeam />}></Route>
        <Route exact path='/dashboard/addteams' element={<AddTeams />}></Route>
        <Route exact path='/dashboard/allteams/:id' element={<AllTeamsDetails />}></Route>
        <Route exact path='/dashboard/tournaments' element={<AllTournament />}></Route>
        <Route exact path='/dashboard/tournamentsdetails/:id' element={<AllTournamentDetails />}></Route>
        <Route exact path='/dashboard/addtournaments' element={<AddTournament />}></Route>
        <Route exact path='/dashboard/addvenue' element={<AddVenues />}></Route>
        <Route exact path='/dashboard/allvenue' element={<AllVenues />}></Route>
        <Route exact path='/dashboard/allvenue/:id' element={<AllVenusDetails />}></Route>
        <Route exact path='/dashboard/allpersons' element={<AllPerson />}></Route>
        <Route exact path='/dashboard/allpersons/:id' element={<AllPersonDetails />}></Route>
        <Route exact path='/dashboard/addperson' element={<AddPerson />}></Route>
        <Route exact path='/dashboard/addivision' element={<AddDivision />}></Route>
        <Route exact path='/dashboard/alldivisions' element={<AllDivision />}></Route>
        <Route exact path='/dashboard/alldivisions/:id' element={<AllDivisionDetails />}></Route>
        <Route exact path='/dashboard/user/setting' element={<Setting />}></Route>
        <Route exact path='/dashboard/user/change-password' element={<ChangePassword />}></Route>


    </>
)

export default AdminRoutes