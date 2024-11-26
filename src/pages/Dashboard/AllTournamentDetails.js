import React, { useEffect, useState, useRef } from 'react';
import PageHeader from '../../shared/PageHeader';
import DashboardLayout from '../../layout/DashboardLayout';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetTournamentsDetailsByTournamentId, uploadTournamentPicture } from '../../store/tournament/actions/actionsCreators';
import AddVenueModel from '../../components/Models/AddVenueModel';
import DetailSkeleton from '../../components/SkeletonTable/DetailSkeleton';
import PaymentHistoryTable from '../../components/Paymenthistory/PaymentHistoryTAble';
import { FaCamera } from 'react-icons/fa';

const AllTournamentDetails = () => {
    const { TournamentDetails, isLoading } = useSelector((state) => state.tournament);
    const { token } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const [previewImage, setPreviewImage] = useState(null);
    const [assignVenueBoxModel, setVenueModel] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        // Fetch tournament details by ID
        dispatch(GetTournamentsDetailsByTournamentId(id, token));
    }, [id, dispatch, token]);

    // Handle image preview from tournament details
    useEffect(() => {
        if (TournamentDetails?.picture) {
            try {
                // Decode Base64 if it's encoded
                const binaryData = atob(TournamentDetails.picture);
                const bytes = new Uint8Array(binaryData.length);

                // Populate Uint8Array with decoded bytes
                for (let i = 0; i < binaryData.length; i++) {
                    bytes[i] = binaryData.charCodeAt(i);
                }

                // Create a Blob from the decoded bytes (you can adjust the MIME type if necessary)
                const blob = new Blob([bytes], { type: 'image/jpeg' });
                const imageURL = URL.createObjectURL(blob);  // Create an object URL for the image

                // Set the preview image URL to the state
                setPreviewImage(imageURL);
            } catch (e) {
                console.error("Error decoding image", e);
                setPreviewImage(null);  // Reset preview if an error occurs
            }
        } else {
            setPreviewImage(null);  // If no picture data, reset to null
        }
    }, [TournamentDetails]);  // Runs whenever TournamentDetails changes



    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Set the preview image
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
            // Upload the image to the server
            dispatch(uploadTournamentPicture(id, token, file));
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <h1 className="font-bold my-3">Tournament Details</h1>

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
                        style={{ width: '120px', height: 'auto', borderRadius: '50%' }}
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
                <button className="Team-register-btn" onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>

            {/* Add Venue Button (only if no venue is assigned) */}
            {TournamentDetails.venueName === null && (
                <PageHeader btnText="Add Venue" onClick={() => setVenueModel(true)} />
            )}

            {/* Tournament Details */}
            {isLoading ? (
                <DetailSkeleton />
            ) : (
                <div className="bg-white rounded-lg shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">
                    <Row className="row row-cols-3 align-items-center gy-3">
                        <Col>
                            <h5 className="text-nowrap fw-bold">Tournament Name:</h5>
                            <h6 className="text-nowrap">{TournamentDetails?.name}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Venue Name:</h5>
                            <h6 className="text-nowrap">
                                {TournamentDetails?.venueName ? TournamentDetails?.venueName : 'No Venue Selected Yet'}
                            </h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">Start Date:</h5>
                            <h6 className="text-nowrap">{TournamentDetails?.startDate}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-nowrap fw-bold">End Date:</h5>
                            <h6 className="text-nowrap">{TournamentDetails?.endDate}</h6>
                        </Col>
                        <Col>
                            <h5 className="text-green fw-bold">Status Tournament:</h5>
                            <h6
                                className="text-nowrap"
                                style={{
                                    color: TournamentDetails?.status === 'ACTIVE' ? 'green' : 'red',
                                }}
                            >
                                {TournamentDetails?.status}
                            </h6>
                        </Col>
                    </Row>
                </div>
            )}

            {/* Add Venue Modal */}
            {assignVenueBoxModel && (
                <AddVenueModel show={assignVenueBoxModel} onClose={() => setVenueModel(false)} SetVenueModel={setVenueModel}  />
            )}

            {/* Payment History Section */}
            <h2 className="ps-4 text-danger">Payment Records:</h2>
            <PaymentHistoryTable tournamentId={id} />
        </>
    );
};

export default DashboardLayout(AllTournamentDetails);
