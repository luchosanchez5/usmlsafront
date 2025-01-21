import React from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import AddDivisionFields from '../../components/Division/AddDivisionFields'
// import AllDivisionTable from '../../components/Division/AllDivisionTable'
const AddDivision = () => {
  return (
    <>
      <AddDivisionFields />
      {/* <AllDivisionTable /> */}
    </>
  )
}

export default DashboardLayout(AddDivision)