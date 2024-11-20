import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'
import { GetTeamsbyTeamId } from '../../store/team/actions/actionsCreators'
import DashboardLayout from '../../layout/DashboardLayout'
const YourTeamDetails = () => {
    const{id}=useParams()
    const { TeamDetailsData } = useSelector((state) => state.team)
    const{token}=useSelector((state)=>state.user)
    const Dispatch=useDispatch()
    const Navigate=useNavigate()
    useEffect(() => {
        Dispatch(GetTeamsbyTeamId(id, token))


    }, [id, Dispatch])
    return (
        <>
            <h1 className="font-bold my-3"> Team Details </h1>
            <div className="text-end  pe-4  ">
                <button className='Team-register-btn'
                    onClick={() => Navigate(-1)}>Go Back</button>
            </div>

            <div className="bg-white  rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">

                <Row className="row row-cols-3 align-items-center  gy-3">
                <Col >
                        <h5 className=" text-nowrap fw-bold">Team Name:</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.name}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold">Team Email:</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.email}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold">Team Address:</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.address}</h6>
                    </Col>
                  
                    <Col >
                        <h5 className=" text-nowrap fw-bold"> Team City :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.city}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold">Team State :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.state}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold">Team Points :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.points}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold"> Team Ranking :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.ranking}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold">Team Games Win :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.gamesWin}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold"> Team Games Lost :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.gamesLost}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold">Team Games Tied :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.gamesTied}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold">Team Avg Runs Scored :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.avgRunsScored}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold"> Team Avg Runs Allowed :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.avgRunsAllowed}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold"> Team Avg Runs Diff :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.avgRunsDiff}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold"> Team Run Scored :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.runScored}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold">Team Run Allowed  :</h5>
                        <h6 className=" text-nowrap ">{TeamDetailsData?.runAllowed}</h6>
                    </Col>
                    <Col >
                        <h5 className=" text-nowrap fw-bold">Team Status :</h5>
                        <h6
                            className="text-nowrap fw-bold"
                            style={{
                                color: TeamDetailsData?.teamStatus === 'ACTIVE' ? 'green' : 'red',
                            }}
                        >
                            {TeamDetailsData?.teamStatus ?? 'N/A'}
                        </h6>
                    </Col>










                </Row>
            </div>
        </>
    )
}

export default DashboardLayout(YourTeamDetails)