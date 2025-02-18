import React from 'react'
import PageHeader from '../../shared/PageHeader.js'
import DashboardLayout from '../../layout/DashboardLayout';
import AllPersonsTable from '../../components/Person/AllPersonsTable.js';
import { useNavigate } from 'react-router-dom';
const AllPerson = () => {
    const Navigate = useNavigate()
    return (
        <>
            <PageHeader title="All User" subtitle="Manage Your Users" btnText="Add New User" onClick={() => Navigate('/dashboard/addperson')} />
            <AllPersonsTable />
        </>


    )
}

export default DashboardLayout(AllPerson)