import React, { useEffect, useRef, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../layout/DashboardLayout'
import { GetDivisionsDetailsByDivisionId } from '../../store/tournament/actions/actionsCreators'
import DetailSkeleton from '../../components/SkeletonTable/DetailSkeleton'
import { FaCamera } from "react-icons/fa";
const AllDivisionDetails = () => {
    const { id } = useParams()
    const { token } = useSelector((state) => state.user)
    const { DivisionDetails, isLoading } = useSelector((state) => state.tournament)
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);
    const Navigate = useNavigate()
    const Dispatch = useDispatch()
    useEffect(() => {
        Dispatch(GetDivisionsDetailsByDivisionId(id, token))
    }, [Dispatch, id, token])
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
            // Dispatch()     Dispatch here @hussnain
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };
    return (
        <>
            <h1 className="font-bold my-3"> Divisions Details </h1>
           
            <div className="Upload-picture d-flex flex-column align-items-center justify-content-center   gap-2   " onClick={triggerFileInput}>
                {previewImage ? (
                    <img
                        src={previewImage}
                        alt="Preview"
                       
                     
                    />
                ) : (
                    <>
                        <span>Upload Picture</span>
                        <FaCamera size={30} />
                    </>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    accept="image/*" // Restrict to image files only
                />


            </div>
            <div className="text-end  pe-4  ">
                <button className='Team-register-btn'
                    onClick={() => Navigate(-1)}>Go Back</button>
            </div>
            {isLoading ? <DetailSkeleton /> :
                <div className="bg-white  rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">

                    <Row className="row row-cols-3 align-items-center  gy-3">
                        <Col >
                            <h5 className=" text-nowrap  fw-bold ">Name:</h5>
                            <h6 className=" text-nowrap ">{DivisionDetails?.data?.divisionName}</h6>

                        </Col>
                        <Col>
                            <h5 className=" text-nowrap fw-bold  ">Tournament Name:</h5>
                            <h6 className=" text-nowrap ">{DivisionDetails?.data?.tournamentName}</h6>
                        </Col>
                        <Col>
                            <h5 className=" text-nowrap fw-bold  ">Initial Deposite  Fee:</h5>
                            <h6 className=" text-nowrap ">{DivisionDetails?.data?.initialDepositFee}</h6>
                        </Col>
                        <Col>
                            <h5 className=" text-nowrap fw-bold  ">Entry Fee:</h5>
                            <h6 className=" text-nowrap ">{DivisionDetails?.data?.entryFee}</h6>

                        </Col>
                        <Col>
                            <h5 className=" text-nowrap ">Max Teams:</h5>
                            <h6 className=" text-nowrap ">{DivisionDetails?.data?.maxTeams}</h6>
                        </Col>
                        <Col>
                            <h5 className=" text-nowrap fw-bold  ">Division StartTime:</h5>
                            <h6 className=" text-nowrap ">{DivisionDetails?.data?.startTime}</h6>
                        </Col>
                        <Col>
                            <h5 className=" text-nowrap fw-bold ">Prize 1:</h5>
                            <h6 className=" text-nowrap ">${DivisionDetails?.data?.prize1}</h6>
                        </Col>

                        <Col>
                            <h5 className=" text-nowrap fw-bold ">Prize 2:</h5>
                            <h6 className=" text-nowrap ">${DivisionDetails?.data?.prize2}</h6>
                        </Col>

                        <Col>
                            <h5 className=" text-nowrap fw-bold ">Prize 3:</h5>
                            <h6 className=" text-nowrap  ">${DivisionDetails?.data?.prize3}</h6>
                        </Col>

                        <Col>
                            <h5 className=" text-nowrap fw-bold ">Prize 4:</h5>
                            <h6 className=" text-nowrap ">${DivisionDetails?.data?.prize4}</h6>
                        </Col>
                        <Col>
                            <h5 className=" text-nowrap fw-bold ">Division Status :</h5>
                            <h6 className=" text-nowrap " style={{
                                color: DivisionDetails?.data?.divisionStatus === 'OPEN' ? 'green' : 'red',
                            }} >{DivisionDetails?.data?.divisionStatus}</h6>
                        </Col>
                    </Row>
                </div>}


        </>
    )
}

export default DashboardLayout(AllDivisionDetails)