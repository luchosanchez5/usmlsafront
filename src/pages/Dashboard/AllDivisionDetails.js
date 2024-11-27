import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../layout/DashboardLayout';
import { GetDivisionsDetailsByDivisionId, uploadDivisionPicture } from '../../store/tournament/actions/actionsCreators';
import DetailSkeleton from '../../components/SkeletonTable/DetailSkeleton';
import PaymentHistoryTable from '../../components/Paymenthistory/PaymentHistoryTAble';
import { FaCamera } from 'react-icons/fa';

const AllDivisionDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
    const { DivisionDetails, isLoading } = useSelector((state) => state.tournament);
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);
    const Navigate = useNavigate();
    const Dispatch = useDispatch();

    useEffect(() => {
        Dispatch(GetDivisionsDetailsByDivisionId(id, token));
    }, [Dispatch, id, token]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
            dispatch(uploadDivisionPicture(id, token, file));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Image handling for the division picture (similar to tournament picture)
    useEffect(() => {
        if (DivisionDetails?.data?.picture) {
            try {
                // Only process if picture exists
                const binaryData = atob(DivisionDetails.data.picture); // Decode Base64 if it's encoded
                const bytes = new Uint8Array(binaryData.length);
                for (let i = 0; i < binaryData.length; i++) {
                    bytes[i] = binaryData.charCodeAt(i);
                }
                const blob = new Blob([bytes], { type: 'image/jpeg' }); // Adjust MIME type if needed
                const imageURL = URL.createObjectURL(blob);
                setPreviewImage(imageURL); // Set the generated URL as the image source
            } catch (e) {
                console.error("Error decoding image", e);
                setPreviewImage(null); // Reset to null if decoding fails
            }
        } else {
            setPreviewImage(null); // Set to null if no picture data
        }
    }, [DivisionDetails]);

    return (
        <>
            <h1 className="font-bold my-3">Divisions Details</h1>

            {/* Image Upload Section */}
            <div
                className="Upload-picture d-flex flex-column align-items-center justify-content-center gap-2"
                onClick={triggerFileInput}
                style={{ marginLeft: '20px' }}
            >
                {isLoading ? (
                    // Show skeleton loader while loading
                    <div className="skeleton-loader" style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
                ) : previewImage ? (
                    <img
                        src={previewImage}
                        alt="Division Preview"
                        style={{ width: '120px', height: '120px', borderRadius: '50%' }}
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
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                    accept="image/*"
                />
            </div>

            {/* Go Back Button */}
            <div className="text-end pe-4">
                <button className="Team-register-btn" onClick={() => Navigate(-1)}>
                    Go Back
                </button>
            </div>

            {isLoading ? (
                <DetailSkeleton />
            ) : (
                <div className="bg-white rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">
                    <Row className="row row-cols-3 align-items-center gy-3">
                        <Col>
                            <h5 className="text-nowrap fw-bold">Name:</h5>
                            <h6 className="text-nowrap">{DivisionDetails?.data?.divisionName}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Tournament Name:</h5>
                            <h6 className="text-nowrap">{DivisionDetails?.data?.tournamentName}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Initial Deposit Fee:</h5>
                            <h6 className="text-nowrap">{DivisionDetails?.data?.initialDepositFee}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Entry Fee:</h5>
                            <h6 className="text-nowrap">{DivisionDetails?.data?.entryFee}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap">Max Teams:</h5>
                            <h6 className="text-nowrap">{DivisionDetails?.data?.maxTeams}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Division StartTime:</h5>
                            <h6 className="text-nowrap">{DivisionDetails?.data?.startTime}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Prize 1:</h5>
                            <h6 className="text-nowrap">${DivisionDetails?.data?.prize1}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Prize 2:</h5>
                            <h6 className="text-nowrap">${DivisionDetails?.data?.prize2}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Prize 3:</h5>
                            <h6 className="text-nowrap">${DivisionDetails?.data?.prize3}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Prize 4:</h5>
                            <h6 className="text-nowrap">${DivisionDetails?.data?.prize4}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Division Status:</h5>
                            <h6
                                className="text-nowrap"
                                style={{
                                    color: DivisionDetails?.data?.divisionStatus === 'OPEN' ? 'green' : 'red',
                                }}
                            >
                                {DivisionDetails?.data?.divisionStatus}
                            </h6>
                        </Col>
                    </Row>
                </div>
            )}

            {/* Payment History Section */}
            <h2 className="ps-4 text-danger">Payment Records:</h2>
            <PaymentHistoryTable divisionId={id} />
        </>
    );
};

export default DashboardLayout(AllDivisionDetails);
