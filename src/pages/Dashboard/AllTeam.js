import React, { useState } from 'react';
import PageHeader from '../../shared/PageHeader.js';
import AllTeamTable from '../../components/Team/AllTeamTable.js';
import DashboardLayout from '../../layout/DashboardLayout.js';
import { useNavigate } from 'react-router-dom';
const AllTeam = () => {
    const [TeamBoxModel, SetTeamBoxModel] = useState(false)
    const Navigate = useNavigate()
    const handleBtn = () => {
        Navigate('/dashboard/addTeams')
    }
    return (
        <>

            <PageHeader title="All Teams" subtitle="Manage Your Team" btnText="Add New Team" onClick={handleBtn} />

            <AllTeamTable TeamBoxModel={TeamBoxModel} />
            {/* <AllteamModel show={TeamBoxModel} onClose={() => SetTeamBoxModel(false)} SetTeamBoxModel={SetTeamBoxModel} /> */}

        </>
    )
}

export default DashboardLayout(AllTeam);
