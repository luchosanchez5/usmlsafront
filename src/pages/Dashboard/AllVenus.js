import React from 'react'
import PageHeader from '../../shared/PageHeader.js'
import AllvenuesTable from '../../components/Venue/AllvenuesTable.jsx'
import DashboardLayout from '../../layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
const AllVenus = () => {
    const Navigate = useNavigate()
    return (
        <>
            <PageHeader title="All Venues" subtitle="Manage Your Venues" btnText="Add New Venue" onClick={() => Navigate('/dashboard/addvenue')} />
            <AllvenuesTable />


        </>


    )
}

export default DashboardLayout(AllVenus)