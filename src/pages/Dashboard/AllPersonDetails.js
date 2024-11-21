import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GetPersonsById } from '../../store/person/actions/actionsCreators'
import DashboardLayout from '../../layout/DashboardLayout'
const AllPersonDetails = () => {
    const { id } = useParams()
    const { token } = useSelector((state) => state.user)
    const { PersonDetails } = useSelector((state) => state.person)
    const Dispatch = useDispatch()
    useEffect(() => {
        Dispatch(GetPersonsById(id, token))
    }, [Dispatch, id, token])

    const Navigate = useNavigate()


    return (
        <>
            <h1 className="font-bold my-3">Person Details</h1>
            <div className="text-end  pe-4  ">
                <button className='Team-register-btn'
                    onClick={() => Navigate(-1)}>Go Back</button>
            </div>

            <div className="bg-white  rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">

                <Row className="row row-cols-3 align-items-center  gy-3">
                    <Col >
                        <h5 className=" text-nowrap  fw-bold">Name:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.name}</h6>

                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">First Name:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.firstName}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap">Last Name:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.lastName}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">Address 1:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.address1}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap fw-bold">Address 2:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.address2}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">Points:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.points}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap fw-bold">Ranking:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.ranking}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">City:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.city}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">State:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.state}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">Zip Code:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.zipCode}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">Tournaments Played:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.tournamentsPlayed ? PersonDetails?.tournamentsPlayed : 0}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold" >Games Played:</h5>
                        <h6 className=" text-nowrap ">{PersonDetails?.gamesPlayed ? PersonDetails?.gamesPlayed : 0}</h6>
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default DashboardLayout(AllPersonDetails)