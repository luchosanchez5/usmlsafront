import React, { useState } from "react";
import { Image, Col, Row } from "react-bootstrap";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../store/user/actions/actionCreators";
import TextField from "../../shared/TextField";
import SelectTag from "../product/SelectTag";
import { FaUser, FaAddressBook, FaMedal, FaCity, FaFlag, FaMapMarkerAlt, FaMobileAlt, FaEnvelope, FaLock, FaUserTie } from "react-icons/fa";
import { MdGames } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../../assets/css/login-form.css";
import { ProviderRegisterSchemas } from "../../Schemas/Schemas";
import SpinNer from "../LoadingSpinner/SpinNer";
const ProviderRegisterForm = () => {
  const { isLoading } = useSelector((state) => state.user);
  const [roleValue, SetRoleValue] = useState("");
  const [eye, setEye] = useState(false);
  const[confirmEye,setConfirmEye]=useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const roleOptions = [
    { value: 'MANAGER', label: 'MANAGER' },
    { value: 'PLAYER', label: 'PLAYER' },
  ]

  const initialValues = {
    name: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    points: null,
    ranking: null,
    division: "",
    city: "",
    state: "",
    zipCode: "",
    mobilePhone: "",
    email: "",
    password: "",
    confirmPassword:"",
    tournamentsPlayed: null,
    gamesPlayed: null,
    role: "",
  };


  const RegisterHandler = (values, action) => {

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: roleValue,
      firstName: values.firstName,
      lastName: values.lastName,
      address1: values.address1,
      address2: values.address2,
      // points: values.points,
      // ranking: values.ranking,
      // division: values.division,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      mobilePhone: values.mobilePhone,
      // tournamentsPlayed: values.tournamentsPlayed,
      // gamesPlayed: values.gamesPlayed,
      playerStatus: 'ACTIVE',
      personAPlayer: roleValue === 'PLAYER' ? true : false,
      // country: 'Pakistan',

    };
    dispatch(userRegister(data, navigate));
    action.resetForm();
  };
  // const handleRole = (e) => {
  //   SetRoleValue(e.target.value);
  // };

  return (
    <div className="form-space px-lg-5 mx-xl-5 d-flex flex-column mt-5 pt-5 align-content-center justify-content-center " >
      <div className="text-align-center d-flex justify-content-center flex-column align-items-center">
        <Image
          fluid
          src="https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png"
          width={200}
          height={100}
        />
        <h2 className="auth-heading py-2 text-white">Register <span className="auth-special">Now</span></h2>
        <p className="auth-subheading text-white">Create your new account.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={ProviderRegisterSchemas}
        onSubmit={RegisterHandler}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Row className="Signup-form row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 gy-3">
              <Col>
                <TextField
                  icon={<FaUser />}
                  placeholder="First Name"
                  name="name"
                  type="text"
                />
              </Col>
              <Col>
                <TextField
                  icon={<FaUser />}
                  placeholder="Middle Name (optional)"
                  name="firstName"
                  type="text"
                />
              </Col>
              <Col>
                <TextField
                  icon={<FaUser />}
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                />
              </Col>
              <Col>
                <TextField
                  icon={<FaAddressBook />}
                  placeholder="Address 1"
                  name="address1"
                  type="text"
                />
              </Col>
              <Col>
                <TextField
                  icon={<FaAddressBook />}
                  placeholder="Address 2"
                  name="address2"
                  type="text"
                />
              </Col>
              <Col className="">
                <SelectTag
                  deFaultValue="Select Your Role"
                  icon={<FaUserTie className="me-2" size={20} />}
                  options={roleOptions}
                  className="d-flex flex-grow-1 bg-white"
                  name="role"
                  value={values.role}
                  onChange={(e) => {
                    handleChange(e);
                    SetRoleValue(e.target.value);
                  }}
                  onBlur={handleBlur}
                  error={errors.role}
                  touched={touched.role}
                />
              </Col>
              {/* {values.role === 'PLAYER' && (
                <>
                  <Col>
                    <TextField
                      icon={<FaMedal />}
                      placeholder="Points"
                      name="points"
                      type="number"
                    />
                  </Col>
                  <Col>
                    <TextField
                      icon={<FaMedal />}
                      placeholder="Ranking"
                      name="ranking"
                      type="number"
                    />
                  </Col>
                  <Col>
                    <TextField
                      icon={<FaMedal />}
                      placeholder="Tournaments Played"
                      name="tournamentsPlayed"
                      type="number"
                    />
                  </Col>
                  <Col>
                    <TextField
                      icon={<MdGames />}
                      placeholder="Games Played"
                      name="gamesPlayed"
                      type="number"
                    />
                  </Col>
                  <Col>
                    <TextField
                      icon={<FaFlag />}
                      placeholder="Division"
                      name="division"
                      type="text"
                    />
                  </Col>
                </>
              )} */}
              <Col>
                <TextField
                  icon={<FaCity />}
                  placeholder="City"
                  name="city"
                  type="text"
                />
              </Col>
              <Col>
                <TextField
                  icon={<FaMapMarkerAlt />}
                  placeholder="State"
                  name="state"
                  type="text"
                />
              </Col>
              <Col>
                <TextField
                  icon={<FaMapMarkerAlt />}
                  placeholder="Zip Code"
                  name="zipCode"
                  type="text"
                />
              </Col>
              <Col>
                <TextField
                  icon={<FaMobileAlt />}
                  placeholder="Mobile Phone"
                  name="mobilePhone"
                  type="text"
                />
              </Col>
              <Col>
                <TextField
                  icon={<FaEnvelope />}
                  placeholder="Email"
                  name="email"
                  type="email"
                />
              </Col>
              <Col>
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
              <Col>
                <TextField
                  icon={<FaLock />}
                  righticon={
                    confirmEye ? (
                      <AiFillEyeInvisible onClick={() => setConfirmEye(!confirmEye)} />
                    ) : (
                      <AiFillEye onClick={() => setConfirmEye(!confirmEye)} />
                    )
                  }
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={confirmEye ? "text" : "password"}
                />
              </Col>
            </Row>
            <Row className="my-3">
              <Col xs="12 d-flex flex-grow-1 justify-content-center">
                <button type="submit" className="h-56px gradient-btn-orange">
                  {isLoading ? <SpinNer /> : "Submit"}
                </button>
              </Col>
            </Row>
            <p className="auth-subheading fw-bold text-center text-white">
              Already have an account?
              <Link to="/auth/login" className="text-decoration-none fs-6">
                <span className="forget ps-1">Login</span>
              </Link>
            </p>
          </Form>
        )}
      </Formik>

    </div>
  );
};

export default ProviderRegisterForm;
