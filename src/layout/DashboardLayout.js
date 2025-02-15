
import React, { useContext, useEffect } from 'react'
import SidebarNav from '../shared/SidebarNav'
import { Container } from 'react-bootstrap'
import TopBar from '../shared/TopBar'
import { useLocation } from 'react-router-dom'
import { GlobalInfo } from '../App'

const DashboardLayout = (WrapComponent) => {

    return function Globally(props) {
        const { SetVenueEdit, SetVenueId, SetTournamentEdit, SetTournamentId, SetTeamEdit, SetTeamId, SetDivisionEdit, SetDivisionId } = useContext(GlobalInfo)
        const location = useLocation()
        const IsPathlistAllVenue = location.pathname === '/dashboard/addvenue'
        const IsPathAddTournaments = location.pathname === '/dashboard/addtournaments'
        const IsPathAddTeams = location.pathname === '/dashboard/addteams'
        const IsPathAddDivision = location.pathname === '/dashboard/addivision'
        useEffect(() => {
            if (!IsPathlistAllVenue) {
                SetVenueEdit(false)
                SetVenueId(null)
            }
        }, [IsPathlistAllVenue, SetVenueEdit])
        useEffect(() => {
            if (!IsPathAddTournaments) {
                SetTournamentEdit(false)
                SetTournamentId(null)
            }
        }, [IsPathAddTournaments, SetTournamentEdit])
        useEffect(() => {
            if (!IsPathAddTeams) {
                SetTeamEdit(false)
                SetTeamId(null)
            }
        }, [IsPathAddTeams, SetTeamEdit])
        useEffect(() => {
            if (!IsPathAddDivision) {
                SetDivisionEdit(false)
                SetDivisionId(null)
            }
        }, [IsPathAddDivision, SetDivisionEdit])
        return (

            <div className='page-container'>
                <SidebarNav />
                <main className='main-container '>
                    <Container fluid >
                        <TopBar />
                        <div className='m-lg-4'>
                            <WrapComponent {...props} />

                        </div>
                    </Container>
                </main>
            </div>
        )
    }
}

export default DashboardLayout;