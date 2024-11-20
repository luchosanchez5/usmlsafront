import React from 'react'
import YourTeamTable from '../../components/Team/YourTeamTable'
import DashboardLayout from '../../layout/DashboardLayout'
import PageHeader from '../../shared/PageHeader'
const YourTeams = () => {
  return (
    <>
    <PageHeader title='Your Team' subtitle='Manage Your Team'/>
   <YourTeamTable/>

    </>
  )
}

export default DashboardLayout(YourTeams)