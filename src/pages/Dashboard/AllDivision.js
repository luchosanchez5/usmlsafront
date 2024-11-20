import React from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import AllDivisionTable from '../../components/Division/AllDivisionTable'
import PageHeader from '../../shared/PageHeader'
import { useNavigate } from 'react-router-dom'
const AllDivision = () => {
  const Navigate=useNavigate()
  return (
    <>
    <PageHeader btnText="Add New Division" title='All Divisions' subtitle='Manager Your Divisions' onClick={() => Navigate('/dashboard/addivision')} />
    <AllDivisionTable/>
    </>


  )
}

export default DashboardLayout(AllDivision)