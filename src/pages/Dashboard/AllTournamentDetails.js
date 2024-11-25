import React, { useEffect, useState } from 'react'
import PageHeader from '../../shared/PageHeader'
import DashboardLayout from '../../layout/DashboardLayout'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GetTournamentsDetailsByTournamentId } from '../../store/tournament/actions/actionsCreators'
import AddVenueModel from '../../components/Models/AddVenueModel'
import DetailSkeleton from '../../components/SkeletonTable/DetailSkeleton'
import PaymentHistoryTable from '../../components/Paymenthistory/PaymentHistoryTAble'
import PendingHistoryTable from '../../components/Paymenthistory/PendingHistoryTable'
const AllTournamentDetails = () => {
    const { TournamentDetails, isLoading } = useSelector((state) => state.tournament)
    console.log(isLoading, 'isLoading');
    const [state, setState] = useState(false)
    console.log(state)
    const [assignVenueBoxModel, SetVenueModel] = useState(false)
    const { token } = useSelector((state) => state.user)
    const Navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetTournamentsDetailsByTournamentId(id, token))
    }, [id, dispatch, state, token])
    return (
        <>
            <h1 className="font-bold my-3"> Tournament Details</h1>
            <div className="text-end  pe-4  ">
                <button className='Team-register-btn'
                    onClick={() => Navigate(-1)}>Go Back</button>
            </div>
            {TournamentDetails.venueName === null &&
                <PageHeader btnText='Add Venue' onClick={() => SetVenueModel(true)} />
            }


            {
                isLoading ?
                    <DetailSkeleton />
                    :
                    <div className="bg-white  rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">
                        <Row className="row row-cols-3 align-items-center  gy-3">
                            <Col >
                                <h5 className=" text-nowrap fw-bold ">Tournament Name:</h5>
                                <h6 className=" text-nowrap ">{TournamentDetails?.name}</h6>
                            </Col>
                            <Col >
                                <h5 className=" text-nowrap fw-bold ">Venue Name:</h5>
                                <h6 className=" text-nowrap ">{TournamentDetails?.venueName ? TournamentDetails?.venueName : 'No Venue Selected Yet'}</h6>
                            </Col>
                            <Col>
                                <h5 className=" text-nowrap fw-bold ">Start Date:</h5>
                                <h6 className=" text-nowrap ">{TournamentDetails?.startDate}</h6>
                            </Col>
                            <Col>
                                <h5 className=" text-nowrap fw-bold">End Date:</h5>
                                <h6 className=" text-nowrap ">{TournamentDetails?.endDate}</h6>
                            </Col>
                            <Col>
                                <h5 className='text-green fw-bold '>Status Tournament:</h5>
                                <h6 className=" text-nowrap"
                                    style={{
                                        color: TournamentDetails?.status === 'ACTIVE' ? 'green' : 'red',
                                    }}
                                >{TournamentDetails?.status}</h6>
                            </Col>
                        </Row>

                    </div>

            }


            {assignVenueBoxModel && <AddVenueModel show={assignVenueBoxModel} onClose={() => SetVenueModel(false)} SetVenueModel={SetVenueModel} setState={setState} />}
            <h2 className='ps-4 text-danger'>Payment Records:</h2>
            <PaymentHistoryTable />
            <h2 className='ps-4 text-danger'>Tournament Registration:</h2>
            <PendingHistoryTable />
        </>
    )
}

export default DashboardLayout(AllTournamentDetails)