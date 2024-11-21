import React from 'react'
import PageHeader from '../../shared/PageHeader.js'
import DashboardLayout from '../../layout/DashboardLayout';
import AllPersonsTable from '../../components/Person/AllPersonsTable.js';
import { useNavigate } from 'react-router-dom';
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