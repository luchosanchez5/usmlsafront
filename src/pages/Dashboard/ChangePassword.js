import DashboardLayout from '../../layout/DashboardLayout.js';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../../shared/TextField";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SpinNer from '../../components/LoadingSpinner/SpinNer.jsx';
import { changePassword } from '../../store/user/actions/actionCreators.js';
const ChangePassword = () => {
    const { token } = useSelector((state) => state.user);
    const { isLoading } = useSelector((state) => state.user);
    const Dispatch = useDispatch();

    const [eye, setEye] = useState(false);
    const navigate = useNavigate();
    const users = {
        password: "",
    };

    const errorSchema = Yup.object().shape({
        password: Yup.string().required("Password is required"),
    });

    const loginHandler = (values, action) => {
        const data = {
            password: values.password,
        };

        Dispatch(changePassword(data, navigate, token));

        action.resetForm();
    };

    return (
        <>
            <div
                className="form-space d-flex flex-column align-items-center justify-content-center"
            >
                <div>
                    <h4 className="auth-heading text-dark">
                        Enter <span className="auth-special">Your Password</span>
                    </h4>
                </div>
                <Formik
                    initialValues={users}
                    validationSchema={errorSchema}
                    onSubmit={loginHandler}
                >
                    <Form>
                        <Row className="login-form row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 gy-3">
                            <Col className="d-flex flex-column">
                                <TextField
                                    icon={<FaLock />}
                                    righticon={
                                        eye ? (
                                            <AiFillEyeInvisible onClick={() => setEye(!eye)} />
                                        ) : (
                                            <AiFillEye onClick={() => setEye(!eye)} />
                                        )
                                    }
                                    placeholder="Password"
                                    name="password"
                                    type={eye ? "text" : "password"}
                                />
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mb-3  px-0">
                            <button type="submit" className=" mt-3 gradient-btn-orange">
                                {isLoading ? <SpinNer /> : "Change Password"}
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>


    )
}

export default DashboardLayout(ChangePassword)