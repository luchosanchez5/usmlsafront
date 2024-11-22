import React, { useEffect } from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GetVenueByVenueId } from '../../store/Venue/actions/actionCreators'
import { Row, Col } from 'react-bootstrap'
import DetailSkeleton from '../../components/SkeletonTable/DetailSkeleton'
const AllVenusDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const { VenuDetails, isLoading } = useSelector((state) => state.venue)
    useEffect(() => {
        dispatch(GetVenueByVenueId(id))
    }, [id, dispatch])

    return (
        <>
            <h1 className="font-bold my-3">Venue Details</h1>
            <div className="text-end  pe-4  ">
                <button className='Team-register-btn'
                    onClick={() => Navigate(-1)}>Go Back</button>
            </div>
            {isLoading ? <DetailSkeleton /> : <div className="bg-white  rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">

                <Row className="row row-cols-3 align-items-center  gy-3">
                    <Col >
                        <h5 className=" text-nowrap fw-bold ">Name:</h5>
                        <h6 className=" text-nowrap ">{VenuDetails?.name}</h6>

                    </Col>
                    <Col>
                        <h5 className="text-nowrap fw-bold ">Address1:</h5>
                        <h6 className=" text-nowrap ">{VenuDetails?.address1}</h6>
                    </Col>
                    <Col>
                        <h5 className="text-nowrap fw-bold">Address2:</h5>
                        <h6 className=" text-nowrap ">{VenuDetails?.address2}</h6>
                    </Col>
                    <Col>
                        <h5 className="text-nowrap fw-bold ">Created On:</h5>
                        <h6 className=" text-nowrap">{VenuDetails?.createdOn}</h6>
                    </Col>
                    <Col>
                        <h5 className="text-nowrap fw-bold">Number Of Fields:</h5>
                        <h6 className="text-nowrap ">{VenuDetails?.numberOfFields}</h6>
                    </Col>
                    <Col>
                        <h5 className=' text-nowrap fw-bold'>State:</h5>
                        <h6 className="text-nowrap ">{VenuDetails?.state}</h6>
                    </Col>
                    <Col>
                        <h5 className='text-nowrap fw-bold'> Venue Status:</h5>
                        <h6 className="text-nowrap" style={{
                            color: VenuDetails?.statusVenue === 'OPEN' ? 'green' : 'red',
                        }} >{VenuDetails?.statusVenue}</h6>
                    </Col>
                </Row>
            </div>}
        </>

    )
}

export default DashboardLayout(AllVenusDetails)
