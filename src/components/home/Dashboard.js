import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import DashboardCard from './DashboardCard';
import { useSelector } from 'react-redux';
import { GetVenue } from '../../store/Venue/actions/actionCreators';
import { useDispatch } from 'react-redux';
import { GetPersons } from '../../store/person/actions/actionsCreators';
import { GetTournaments } from '../../store/tournament/actions/actionsCreators';
import { GetTeams } from '../../store/team/actions/actionsCreators';
import { FaUsers, FaLocationDot } from "react-icons/fa6";
import { MdTour } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";

const Dashboard = () => {
    const { TeamData } = useSelector((state) => state.team);
    const { TournamentData } = useSelector((state) => state.tournament);
    const { VenueData } = useSelector((state) => state.venue);
    const { PersonData } = useSelector((state) => state.person);
    const { token, user } = useSelector((state) => state.user)
    const Dispatch = useDispatch()
    useEffect(() => {
        Dispatch(GetVenue(0, token));
        Dispatch(GetPersons(0, token))
        Dispatch(GetTournaments(0, token))
        Dispatch(GetTeams(0, token, user, ''))
        // Dispatch(GetAllDivisions(0, token))

    }, [Dispatch,token,user])
    const data = [

        { icon: <RiTeamFill className='card-icon' style={{ color: '#fff' }} />, title: 'All Teams', count: TeamData?.totalRecords ? TeamData?.totalRecords : 0, cardColor: '#e30613' },
        { icon: <MdTour className='card-icon' style={{ color: '#fff' }} />, title: 'All Tournaments', count: TournamentData?.totalRecords ? TournamentData?.totalRecords : 0, cardColor: '#317DEE' },
        { icon: <FaLocationDot className='card-icon' style={{ color: '#fff' }} />, title: 'All Venues', count: VenueData?.totalRecords ? VenueData?.totalRecords : 0, cardColor: '#e30613' },
        { icon: <FaUsers className='card-icon' style={{ color: '#fff' }} />, title: 'All Users', count: PersonData?.totalRecords ? PersonData?.totalRecords : 0, cardColor: '#209040' },

    ];

    return (
        <Row className='mx-2 mx-sm-3 me-lg-0'>
            {data?.map((item, index) => {
                return (
                    <Col key={index} xs='12' md='6' xl='3' className=''>
                        <DashboardCard
                            icon={item?.icon}
                            title={item?.title}
                            count={item?.count}
                            cardColor={item?.cardColor}
                        />
                    </Col>
                );
            })}
        </Row>
    );
}

export default Dashboard;
