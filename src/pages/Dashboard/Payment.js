import React from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import AllPaymentHistoryTable from '../../components/Paymenthistory/AllPaymentHistoryTable'
import PageHeader from '../../shared/PageHeader'
const Payment = () => {
    return (
        <>

         
            <PageHeader title="All Payment Records" subtitle='Manage Your Payment Records' />
            <AllPaymentHistoryTable />

        </>
    )
}

export default DashboardLayout(Payment)