import React,{useState} from 'react'
import { Row } from 'react-bootstrap';
import PageHeader from '../../shared/PageHeader';
// import AllplayersTable from '../../components/Allplayers/AllplayersTable';
import DashboardLayout from '../../layout/DashboardLayout';
const AllPlayers = () => {
    const [TeamBoxModel, SetTeamBoxModel] = useState(false)
    return (
        <>
           
                <PageHeader title="All Players list" subtitle="Manage Your Team" btnText="Add New Players" onClick={()=>SetTeamBoxModel(true)} />

            {/* <AllplayersTable /> */}
            {/* <AllplayerModel show={TeamBoxModel} onClose={() => SetTeamBoxModel(false)} SetTeamBoxModel={SetTeamBoxModel} /> */}

        </>


    )
}

export default DashboardLayout(AllPlayers)