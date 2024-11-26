import React, { useEffect,  useContext } from 'react'
import InputField from '../product/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
import SelectTag from '../product/SelectTag';
import { Add_Persons, GetPersonsById, Update_Persons } from '../../store/person/actions/actionsCreators';
import { useFormik } from 'formik';
import SpinNer from '../LoadingSpinner/SpinNer';
import { AddPersonSchema } from '../../Schemas/Schemas';
import { useNavigate } from 'react-router-dom';
import { GlobalInfo } from '../../App';
const AddPersonFields = () => {
    const Dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const role = user?.roles[0] || user?.role
    const { UserEdit, UserId } = useContext(GlobalInfo)
    const { PersonDetails, isLoading } = useSelector((state) => state.person)
    const Token = user?.access_token
    const Navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
        name: '',
        role: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        points: null,
        ranking: null,
        division: "",
        city: "",
        state: "",
        zipCode: "",
        mobilePhone: "",
        tournamentsPlayed: null,
        playerStatus: '',
        gamesPlayed: null,
    };

    const { values, handleChange, errors, handleSubmit, touched, setValues  } = useFormik({
        initialValues: initialValues,
        validationSchema: AddPersonSchema,
        onSubmit: (values, action) => {
            const data = {
                email: values.email,
                password: UserEdit && values.password,
                name: values.name,
                role: values.role,
                firstName: values.firstName,
                lastName: values.lastName,
                address1: values.address1,
                address2: values.address2,
                points: values.points,
                ranking: values.ranking,
                division: values.division,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode,
                mobilePhone: values.mobilePhone,
                playerStatus: values.playerStatus,
                tournamentsPlayed: values.tournamentsPlayed,
                gamesPlayed: values.gamesPlayed,
                personAPlayer: values?.role === 'PLAYER' ? true : false
            }
            if (UserEdit) {
                Dispatch(Update_Persons(data, UserId, Token, Navigate, role))
            } else {
                Dispatch(Add_Persons(data, Token, Navigate, role))

            }
            action.resetForm();

        }
    });
   
    let roleOptions

    if (role === "ADMIN") {
        roleOptions = [
            { value: 'CO_MANAGER', label: ' CO MANAGER' },
            { value: 'MANAGER', label: 'MANAGER' },
            { value: 'PLAYER', label: 'PLAYER' },
        ]
    } else {
        roleOptions = [
            { value: 'CO_MANAGER', label: ' CO MANAGER' },
            { value: 'PLAYER', label: 'PLAYER' },
        ]
    }



    useEffect(() => {

        if (UserEdit && PersonDetails) {
            Dispatch(GetPersonsById(UserId, Token))
        }
    }, [UserEdit, Dispatch,UserId,Token])
    useEffect(() => {
        if (values.role !== 'PLAYER') {
            setValues({
                ...values,
                tournamentsPlayed: null,
                points: null,
                ranking: null,
                gamesPlayed: null,
            });
        }
    }, [values.role, setValues]);

    const PersonStatusOptions = [
        { value: "ACTIVE", label: "ACTIVE" },
        { value: "INACTIVE", label: "INACTIVE" },
        { value: "SUSPENDED", label: "SUSPENDED" }
    ]
    useEffect(() => {
        if (UserEdit && PersonDetails) {
            setValues({
                email: PersonDetails.email || '',
                name: PersonDetails.name || '',
                role: PersonDetails.role || '',
                firstName: PersonDetails.firstName || '',
                lastName: PersonDetails.lastName || '',
                address1: PersonDetails.address1 || '',
                address2: PersonDetails.address2 || '',
                points: PersonDetails.points || '',
                ranking: PersonDetails.ranking || '',
                division: PersonDetails.division || '',
                city: PersonDetails.city || '',
                state: PersonDetails.state || '',
                zipCode: PersonDetails.zipCode || '',
                mobilePhone: PersonDetails.mobilePhone || '',
                playerStatus: PersonDetails || '',
                tournamentsPlayed: values.tournamentsPlayed || '',
                gamesPlayed: PersonDetails.gamesPlayed || '',
            });
        }
    }, [PersonDetails, UserEdit, setValues]);
    return (
        <div className='mt-3'>
            <h2 className='mb-3 fw-bold'>{UserEdit ? 'Update User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <Row className='row gy-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2'>
                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="email"
                            name="email"
                            label="Email"
                            onChange={handleChange}
                            value={values.email}
                            className="form-control"
                            touched={touched.email}
                            error={errors.email}
                        />
                    </div>

                    {/* Password Field */}

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="password"
                            name="password"
                            label="Password"
                            onChange={handleChange}
                            value={values.password}
                            className="form-control"
                            touched={touched.password}
                            error={errors.password}
                        />
                    </div>

                    {/* Name Field */}
                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="name"
                            label="Name"
                            onChange={handleChange}
                            value={values.name}
                            className="form-control"
                            touched={touched.name}
                            error={errors.name}
                        />
                    </div>

                    <div className="d-flex  flex-column flex-grow-1">
                        <SelectTag
                            options={roleOptions}
                            className="d-flex flex-grow-1  bg-white form-control  "
                            name="role"
                            label='Role'
                            value={values.role}
                            deFaultValue="Select Role"
                            onChange={handleChange}
                            touched={touched.role}
                            error={errors.role}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="firstName"
                            label="First Name"
                            onChange={handleChange}
                            value={values.firstName}
                            className="form-control"
                            touched={touched.firstName}
                            error={errors.firstName}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="lastName"
                            label="Last Name"
                            onChange={handleChange}
                            value={values.lastName}
                            className="form-control"
                            touched={touched.lastName}
                            error={errors.lastName}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="address1"
                            label="Address 1"
                            onChange={handleChange}
                            value={values.address1}
                            className="form-control"
                            touched={touched.address1}
                            error={errors.address1}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="address2"
                            label="Address 2"
                            onChange={handleChange}
                            value={values.address2}
                            className="form-control"
                            touched={touched.address2}
                            error={errors.address2}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="city"
                            label="City"
                            onChange={handleChange}
                            value={values.city}
                            className="form-control"
                            touched={touched.city}
                            error={errors.city}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="state"
                            label="State"
                            onChange={handleChange}
                            value={values.state}
                            className="form-control"
                            touched={touched.state}
                            error={errors.state}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="zipCode"
                            label="Zip Code"
                            onChange={handleChange}
                            value={values.zipCode}
                            className="form-control"
                            touched={touched.zipCode}
                            error={errors.zipCode}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="mobilePhone"
                            label="Mobile Phone"
                            onChange={handleChange}
                            value={values.mobilePhone}
                            className="form-control"
                            touched={touched.mobilePhone}
                            error={errors.mobilePhone}
                        />
                    </div>


                    <div className="d-flex flex-column flex-grow-1">
                        <SelectTag
                            options={PersonStatusOptions}
                            onChange={handleChange}
                            deFaultValue='Select Status'
                            name='playerStatus'
                            label='Select Status'
                            touched={touched.playerStatus}
                            error={errors.playerStatus}
                            value={values.playerStatus}
                            className="form-control"
                        />
                    </div>

                    {values?.role === 'PLAYER' && (
                        <>
                            <div className="d-flex flex-column flex-grow-1">
                                <InputField
                                    type="number"
                                    name="tournamentsPlayed"
                                    label="Tournaments Played"
                                    onChange={handleChange}
                                    value={values.tournamentsPlayed}
                                    className="form-control"
                                    touched={touched.tournamentsPlayed}
                                    error={errors.tournamentsPlayed}
                                />
                            </div>
                            <div className="d-flex flex-column flex-grow-1">
                                <InputField
                                    type="number"
                                    name="points"
                                    label="Points"
                                    onChange={handleChange}
                                    value={values.points}
                                    className="form-control"
                                    touched={touched.points}
                                    error={errors.points}
                                />
                            </div>


                            {/* Ranking Field */}
                            <div className="d-flex flex-column flex-grow-1">
                                <InputField
                                    type="number"
                                    name="ranking"
                                    label="Ranking"
                                    onChange={handleChange}
                                    value={values.ranking}
                                    className="form-control"
                                    touched={touched.ranking}
                                    error={errors.ranking}
                                />
                            </div>
                            {/* Games Played Field */}
                            <div className="d-flex flex-column flex-grow-1">
                                <InputField
                                    type="number"
                                    name="gamesPlayed"
                                    label="Games Played"
                                    onChange={handleChange}
                                    value={values.gamesPlayed}
                                    className="form-control"
                                    touched={touched.gamesPlayed}
                                    error={errors.gamesPlayed}
                                />
                            </div>
                        </>
                    )}

                </Row>
                <div className="d-flex justify-content-center ">
                    <button type="submit" className="mt-3 gradient-btn-orange" >
                        {isLoading ? <SpinNer /> : "Submit"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddPersonFields;
