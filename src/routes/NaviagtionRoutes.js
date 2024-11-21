import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Form from '../Form.js';
import YourTeamDetails from '../pages/Dashboard/YourTeamDetails.js';
const Login = lazy(() => import('../pages/Login/Login.js'));
const YourTeams = lazy(() => import('../pages/Dashboard/YourTeams.js'));
const Home = lazy(() => import('../pages/Home/Home'));
const AddPerson = lazy(() => import('../pages/Dashboard/AddPerson.js'));
const AllPersonDetails = lazy(() => import('../pages/Dashboard/AllPersonDetails.js'));
const PaymentHistory = lazy(() => import('../pages/Dashboard/Payment.js'));
const Setting = lazy(() => import('../pages/Dashboard/Setting.js'));
const RegisterTeam = lazy(() => import('../pages/Payment/RegisterTeam.jsx'));
const ForgetPassword = lazy(() => import('../pages/Login/ForgetPassword.js'));
const SelectRole = lazy(() => import('../pages/Login/SelectRole.js'));
const ResetPassword = lazy(() => import('../pages/Login/ResetPassword.js'));
const AllTeamsDetails = lazy(() => import('../pages/Dashboard/AllTeamsDetails.js'));
const AddTeams = lazy(() => import('../pages/Dashboard/AddTeams.js'));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AllTournament = lazy(() => import("../pages/Dashboard/AllTournament.js"));
const AddTournament = lazy(() => import("../pages/Dashboard/AddTournament.js"));
const AllTournamentDetails = lazy(() => import("../pages/Dashboard/AllTournamentDetails.js"));
const AllPerson = lazy(() => import("../pages/Dashboard/AllPerson.js"));
const Category = lazy(() => import("../pages/Category"));
const Sales = lazy(() => import("../pages/Sales"));
const AllTeam = lazy(() => import("../pages/Dashboard/AllTeam.js"));
const AddVenues = lazy(() => import("../pages/Dashboard/AddVenue.js"));
const AllVenues = lazy(() => import("../pages/Dashboard/AllVenus.js"));
const AddDivision = lazy(() => import("../pages/Dashboard/AddDivision.js"));
const AllDivision = lazy(() => import("../pages/Dashboard/AllDivision.js"));
const AllDivisionDetails = lazy(() => import("../pages/Dashboard/AllDivisionDetails.js"));
const AllVenusDetails = lazy(() => import("../pages/Dashboard/AllVenusDetails.js"));
const Expense = lazy(() => import("../pages/Expense"));
const Quotation = lazy(() => import("../pages/Quotation"));
const ProviderRegister = lazy(() => import("../pages/Login/ProviderRegister.js"));

const NavigationRoutes = () => {

    return (
        <Routes>
            <Route exact path='/dashboard' element={<Dashboard />}></Route>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/auth/register' element={<ProviderRegister />}></Route>
            <Route exact path='/auth/selectrole' element={<SelectRole />}></Route>
            <Route exact path='/dashboard/allteams' element={<AllTeam />}></Route>
            <Route exact path='/dashboard/allteams/:id' element={<AllTeamsDetails />}></Route>
            <Route exact path='/dashboard/yourteam' element={<YourTeams />}></Route>
            <Route exact path='/dashboard/yourteam/:id' element={<YourTeamDetails />}></Route>
            <Route exact path='/dashboard/tournaments' element={<AllTournament />}></Route>
            <Route exact path='/dashboard/payment/history' element={<PaymentHistory />}></Route>
            <Route exact path='/dashboard/tournamentsdetails/:id' element={<AllTournamentDetails />}></Route>
            <Route exact path='/dashboard/addtournaments' element={<AddTournament />}></Route>
            <Route exact path='/dashboard/addvenue' element={<AddVenues />}></Route>
            <Route exact path='/dashboard/allvenue' element={<AllVenues />}></Route>
            <Route exact path='/dashboard/allvenue/:id' element={<AllVenusDetails />}></Route>

            <Route exact path='/dashboard/allpersons' element={<AllPerson />}></Route>
            <Route exact path='/dashboard/allpersons/:id' element={<AllPersonDetails />}></Route>
            <Route exact path='/dashboard/addperson' element={<AddPerson />}></Route>
            <Route exact path='/dashboard/addteams' element={<AddTeams />}></Route>
            <Route exact path='/dashboard/addivision' element={<AddDivision />}></Route>
            <Route exact path='/dashboard/alldivisions' element={<AllDivision />}></Route>
            <Route exact path='/dashboard/alldivisions/:id' element={<AllDivisionDetails />}></Route>
            <Route exact path='/dashboard/user/setting' element={<Setting />}></Route>

            <Route exact path='/dashboard/categories' element={<Category />}></Route>
            <Route exact path='/dashboard/sales' element={<Sales />}></Route>
            <Route exact path='/dashboard/expenses' element={<Expense />}></Route>
            <Route exact path='/dashboard/quotations' element={<Quotation />}></Route>
            <Route exact path='/auth/login' element={<Login />}></Route>
            <Route exact path='/auth/forget-password' element={<ForgetPassword />}></Route>
            <Route exact path='/auth/reset-password' element={<ResetPassword />}></Route>
            <Route exact path='/Form' element={<Form />}></Route>
            <Route exact path='/dashboard/registerteam/:id' element={<RegisterTeam />}></Route>

            {/* <Route
                path="*"
                element={<Navigate to="/" />}
            /> */}
        </Routes>
    );
}

export default NavigationRoutes;
