import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import PageHeader from '../../shared/PageHeader.js'
import DashboardLayout from '../../layout/DashboardLayout';
import AllPersonModel from '../../components/Models/AllPersonModel.jsx';
import AllPersonsTable from '../../components/Person/AllPersonsTable.js';
import { useNavigate } from 'react-router-dom';
import CardPaymentForm from '../../components/Models/CardPaymentForm.jsx';
const AllPerson = () => {
    const Navigate=useNavigate()
    return (
        <>
            <PageHeader title="All Persons" subtitle="Manage Your Persons" btnText="Add New Person" onClick={() =>Navigate('/dashboard/addperson')} />
            <AllPersonsTable  />
     {/* <CardPaymentForm/> */}

        </>


    )
}

export default DashboardLayout(AllPerson)