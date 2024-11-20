import React,{useState} from 'react';
import {  Row } from 'react-bootstrap';
import PageHeader from '../../shared/PageHeader';
import AllTournamentTable from '../../components/tournament/AllTournamentTable';
import DashboardLayout from '../../layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
const AllTournament = () => {
    const Navigate=useNavigate()
    return (
        <>

                <PageHeader title="All Tournament list" btnText="Add New Tournament" subtitle="Manage Your Tournament" onClick={()=>Navigate('/dashboard/addtournaments')}   />

            <AllTournamentTable  />
         
        </>


    )
}

export default DashboardLayout(AllTournament);
