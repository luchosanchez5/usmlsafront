import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { GetPersonsById } from '../../store/person/actions/actionsCreators'
import DashboardLayout from '../../layout/DashboardLayout'
import { FaArrowLeft } from 'react-icons/fa6'
const AllPersonDetails = () => {
    const { id } = useParams()
    const { token } = useSelector((state) => state.user)
    const { PersonDetails } = useSelector((state) => state.person)
    console.log(PersonDetails)
    const Dispatch = useDispatch()

    useEffect(() => {
        Dispatch(GetPersonsById(id, token))
    }, [Dispatch, id, token])

    const Navigate = useNavigate()

    return (
        <>
            <div className="ps-4 my-3">
                <span className="text-white fs-4 fw-bold p-2 rounded" style={{
                    background: "black",
                }}>
                    User Details
                </span>
            </div>
            <div className="text-end  pe-4  ">
                <button className="bg-black rounded">
                    <FaArrowLeft onClick={() => Navigate(-1)} color="white" size={20} />
                </button>
            </div>

            <div className="bg-white  rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4 rounded">

                <Row className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 align-items-center  gy-3">
                    <Col >
                        <h5 className=" text-nowrap  fw-bold">Name:</h5>
                        <h6 >{PersonDetails?.data?.firstName + " " + PersonDetails?.data?.lastName}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">Role</h5>
                        <h6 >{PersonDetails?.data?.role}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">Address 1:</h5>
                        <h6 >{PersonDetails?.data?.address1}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap fw-bold">Address 2:</h5>
                        <h6 >{PersonDetails?.data?.address2}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">Points:</h5>
                        <h6 >{PersonDetails?.data?.points > 0 ? PersonDetails?.data?.points : 0}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap fw-bold">Ranking:</h5>
                        <h6 >{PersonDetails?.data?.ranking}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">City:</h5>
                        <h6 >{PersonDetails?.data?.city}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">State:</h5>
                        <h6 >{PersonDetails?.data?.state}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">Zip Code:</h5>
                        <h6 >{PersonDetails?.data?.zipCode}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold">Tournaments Played:</h5>
                        <h6 >{PersonDetails?.data?.tournamentsPlayed ? PersonDetails?.data?.tournamentsPlayed : 0}</h6>
                    </Col>
                    <Col>
                        <h5 className=" text-nowrap  fw-bold" >Games Played:</h5>
                        <h6 >{PersonDetails?.data?.gamesPlayed ? PersonDetails?.data?.gamesPlayed : 0}</h6>
                    </Col>

                </Row>
            </div>
        </>
    )
}

export default DashboardLayout(AllPersonDetails)