import React, { useEffect, useState } from "react";
import { Image, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import PaymentModel from "../CardModel/PaymentModel";
import { useNavigate, Link } from "react-router-dom";
import TextField from "../../shared/TextField";
import GoogleLogin from "./GoogleLogin";
import SelectField from "../../shared/SelectField";
import RateIcon from "../../assets/images/icons/@.png";
import { FaLock } from "react-icons/fa";
import PassIcon from "../../assets/images/icons/lock.png";
import EyeIcon from "../../assets/images/icons/eye.svg";
import CloseEye from "../../assets/images/icons/eyeclose.svg";
import { BiLogoGoogle } from "react-icons/bi";
import "../../assets/css/login-form.css";
import Toast from "../../shared/Toast";
import axios from "axios";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/user/actions/actionCreators";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const LoginForm = () => {
    // const FacebookUrl = process.env.REACT_APP_FACEBOOK_URL;
    // const EmailUrl = process.env.REACT_APP_EMAIL_URL;
    // const TwitterUrl = process.env.REACT_APP_TwitterUrl_URL;
    const Dispatch = useDispatch()
    const [ModelShow, SetModelShow] = useState(false)

    const [eye, setEye] = useState(false);
    const navigate = useNavigate();
    const users = {
        email: 'chsaab98132@gmail.com',
        password: 'Farooq@123'
    }

    const validValues = {
        Email: "",
        Password: "",
    };

    const errorSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be 8 characters long")
            .required("Password is required"),
    });

    const loginHandler = (values, action) => {

        const data = {
            email: values.email,
            password: values.password
        }


        Dispatch(userLogin(data, navigate))


        action.resetForm()



    }
    const handleCloseModel = () => {
        SetModelShow(false);
    };
    return (

        <div className="form-space px-lg-5 mx-xl-5 d-flex flex-column align-items-center    mt-5 pt-5 justify-content-center  " style={{ heigth: '1000px' }}   >
            <Image
                fluid
                className="field-icon"
                src='https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png'
                loading="lazy"
                width={200}
                height={100}
            />
            <div>
                <h2 className="auth-heading py-2 text-white">Login <span className="auth-special">To Your Account</span></h2>
            </div>
            <Formik
                initialValues={users}
                validationSchema={errorSchema}
                onSubmit={loginHandler}
            >
                <Form   >
                    <Row className="login-form row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 gy-3">
                        <Col className="d-flex flex-column">
                            <TextField
                                icon={
                                    <Image
                                        fluid
                                        className="field-icon flex-grow-1"
                                        src={RateIcon}
                                        loading="lazy"
                                        width={20}
                                        height={20}
                                    />
                                }
                                placeholder="Enter Your Email"
                                name="email"
                                type="email"
                            />
                        </Col>
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
                        <Link to='/auth/forget-password'><p className="text-danger text-end">Forget Password</p></Link>



                    </Row>
                    <div className="d-flex justify-content-center mb-3  px-0">
                        <button type="submit" className=" mt-3 gradient-btn-orange">
                            Login
                        </button>
                    </div>
                    <p className="auth-subheading fw-bold text-center text-dark text-white">
                        Don't have an account?
                        <Link
                            to="/auth/register"
                            className="text-decoration-none fs-6"
                        >
                            <span className="forget ps-1 " >Sign Up</span>
                        </Link>
                    </p>
                    <div className="text-center text-white py-2">OR</div>
                    <div className="d-flex  justify-content-center">
                        {/* <GoogleLogin title='Login With Google' /> */}

                        <a className="google-login-button px-5" href="http://localhost:8082/oauth2/authorization/google" >
                            <BiLogoGoogle size={24} />   Login with Google    {/* Google icon */}
                        </a>

                    </div>
                    {/* 
                    <div className="d-flex justify-content-center gap-5 mt-2 mb-3">
                        <FacebookShareButton url={FacebookUrl}>
                            <FaFacebook borderRadius={100} fontSize={30} color="rgb(24, 119, 242)" />
                        </FacebookShareButton>
                        <EmailShareButton url={EmailUrl}>
                            <BiLogoGmail borderRadius={100} color="#DB4437" fontSize={30} />
                        </EmailShareButton>
                        <TwitterShareButton url={TwitterUrl}>
                            <FaXTwitter borderRadius={100} fontSize={30} />
                        </TwitterShareButton>
                    </div> */}
                </Form>

            </Formik>
            <PaymentModel show={ModelShow} onClose={handleCloseModel} />
        </div>
    );
};

export default LoginForm;
