import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { GetPerson } from "../../store/person/actions/actionsCreators";
import { Col, Row } from "react-bootstrap";
import profilePic from "../../assets/images/images (1).jpeg";
import PageHeader from "../../shared/PageHeader";
import ManagerInfoEditModel from "../../components/Models/ManagerInfoEditModel";
import AdminInfoEditModel from "../../components/Models/AdminInfoEditModel";
import PlayerInfoEditModel from "../../components/Models/PlayerInfoEditModel";
import CoManagerInfoEditModel from "../../components/Models/CoManagerInfoEditModel";
import DetailSkeleton from "../../components/SkeletonTable/DetailSkeleton";
const Setting = () => {
    const { Persondata, isLoading } = useSelector((state) => state.person);
    const { user } = useSelector((state) => state.user);
    const [editModel, setEditModel] = useState(false);
    const [state, setState] = useState(true);
    console.log(state)
    const Dispatch = useDispatch();
    useEffect(() => {
        Dispatch(GetPerson(user.userId));
    }, [Dispatch, state, user]);
    const handleConfrim = () => { };
    return (
        <>
            <PageHeader
                title="User Info"
                subtitle="Manage Your User"
                btnText="Edit User"
                onClick={() => setEditModel(true)}
            />
            {isLoading ? <DetailSkeleton /> :
                <div className="section-main m-3 px-3 py-5 bg-white  shadow-lg">
                    <Image
                        src={profilePic}
                        width={100}
                        height={100}
                        style={{ borderRadius: "50px" }}
                    />
                    <Row className="my-3">
                        <Col>
                            <h5 className="fw-bold"> Email : </h5>
                            <h6>{Persondata?.data?.email}</h6>
                        </Col>

                        <Col>
                            <h5 className="fw-bold"> Role : </h5>
                            <h6>{Persondata?.data?.role}</h6>
                        </Col>
                        <Col>
                            <h5 className="fw-bold">First Name : </h5>
                            <h6>{Persondata?.data?.firstName}</h6>
                        </Col>
                        <Col>
                            <h5 className="fw-bold">Last Name : </h5>
                            <h6> {Persondata?.data?.lastName}</h6>
                        </Col>
                    </Row>
                </div>}
            {editModel && (
                Persondata?.data?.role === 'ADMIN' ? (
                    <AdminInfoEditModel
                        show={editModel}
                        onClose={() => setEditModel(false)}
                        onClick={handleConfrim}
                        setEditModel={setEditModel}
                        setState={setState}

                    />
                ) : Persondata?.data?.role === 'MANAGER' ? (
                    <ManagerInfoEditModel
                        show={editModel}
                        setEditModel={setEditModel}
                        onClose={() => setEditModel(false)}
                        onClick={handleConfrim}
                        setState={setState}
                    />
                ) : Persondata?.data?.role === 'PLAYER' ? (
                    <PlayerInfoEditModel
                        show={editModel}
                        setEditModel={setEditModel}
                        onClose={() => setEditModel(false)}
                        onClick={handleConfrim}
                    />
                ) : Persondata?.data?.role === 'CO_MANAGER' ? (
                    <CoManagerInfoEditModel
                        show={editModel}
                        setEditModel={setEditModel}
                        onClose={() => setEditModel(false)}
                        onClick={handleConfrim}
                    />
                ) : (
                    ''
                )
            )}
        </>
    );
};

export default DashboardLayout(Setting);
