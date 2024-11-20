import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../layout/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'
import { GetPerson } from '../../store/person/actions/actionsCreators'
import { Col, Row } from 'react-bootstrap'
import { MdOutlineEmail } from "react-icons/md";
import profilePic from '../../assets/images/images (1).jpeg'
import PageHeader from '../../shared/PageHeader'
import UserInfoEditModel from '../../components/Models/UserInfoEditModel'
const Setting = () => {
    const { Persondata } = useSelector((state) => state.person)
    const {user,token } = useSelector((state) => state.user)
    console.log("🚀 : ~ file: Setting.js:14 ~ Setting ~ user", user);
    const[editModel,setEditModel]=useState(false)
    const Dispatch = useDispatch()
    useEffect(() => {
        Dispatch(GetPerson(user.userId))
    }, [Dispatch])
    const handleConfrim=()=>{

    }
    return (
        <>
           
            <PageHeader title="User Info" subtitle="Manage Your Team"  btnText="Edit" onClick={()=> setEditModel(true)}/>


            <div className='section-main m-3 px-3 py-5 bg-white  shadow-lg'>
                <Image src={profilePic} width={100} height={100} style={{ borderRadius: '50px' }} />
                <Row className='my-3'>
                    <Col >
                        <h5 className='fw-bold'> Email : </h5>
                        <h6>{Persondata?.data?.email}</h6>

                    </Col>

                    <Col>
                        <h5 className='fw-bold'> Role : </h5>
                        <h6>{Persondata?.data?.role}</h6>
                    </Col>
                    <Col>
                        <h5 className='fw-bold'>First Name : </h5>
                        <h6>{Persondata?.data?.firstName}</h6>
                    </Col>
                    <Col>
                        <h5 className='fw-bold'>Last Name : </h5>
                        <h6> {Persondata?.data?.lastName}</h6>
                    </Col>

                </Row>

            </div>
            {editModel && <UserInfoEditModel show={editModel} onClose={()=>setEditModel(false)} onclick={handleConfrim}/>}
        </>

    )
}

export default DashboardLayout(Setting)