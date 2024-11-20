import React, { useEffect } from 'react'
import { Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GetPersonsById } from '../../store/person/actions/actionsCreators'
import DashboardLayout from '../../layout/DashboardLayout'
const AllPersonDetails = () => {
    const{id}=useParams()
    const{token}=useSelector((state)=>state.user)
    const { PersonDetails, isLoading } = useSelector((state) => state.person)
    const Dispatch=useDispatch()
    useEffect(()=>{
        Dispatch(GetPersonsById(id,token))
    },[Dispatch,id])
 
  return (
    <>
    <h1 className="font-bold my-3">Person Details</h1>
           
    <div className="bg-white  rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">

        <Row className="row row-cols-3 align-items-center  gy-3">
            <Col >
                <h4 className=" text-nowrap ">Name:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.name}</h6>

            </Col>
            <Col>
                <h4 className=" text-nowrap ">First Name:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.firstName}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap">Last Name:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.lastName}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap ">Address 1:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.address1}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap">Address 2:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.address2}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap ">Points:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.points}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap">Ranking:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.ranking}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap ">City:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.city}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap">State:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.state}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap">Zip Code:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.zipCode}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap">Tournaments Played:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.tournamentsPlayed}</h6>
            </Col>
            <Col>
                <h4 className=" text-nowrap">Games Played:</h4>
                <h6 className=" text-nowrap ">{PersonDetails?.gamesPlayed}</h6>
            </Col>
            <Col>
            <h4 className='text-green text-success'>Status :</h4>
                <h6 className=" text-nowrap">{PersonDetails?.status}</h6>
            </Col>
           
         







        </Row>
    </div>
    </>
  )
}

export default DashboardLayout(AllPersonDetails)