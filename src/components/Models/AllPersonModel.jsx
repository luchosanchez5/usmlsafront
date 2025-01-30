import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import InputField from '../product/InputField';
import { AllVenueSchemas } from '../../Schemas/Schemas';
import { useDispatch, useSelector } from 'react-redux';
import { AddVenue, GetVenue } from '../../store/Venue/actions/actionCreators';
import DeleteModel from './DeleteModel';
import SelectTag from '../product/SelectTag';
import { Add_Persons } from '../../store/person/actions/actionsCreators';

const AllPersonModel = ({ show, onClose, SetTeamBoxModel, setState }) => {
    const Dispatch = useDispatch()
    const [roleValue, SetRoleValue] = useState("");
    const { user } = useSelector((state) => state.user)
    const Token = user?.access_token

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
        gamesPlayed: null,
    };

    const { values, handleChange, errors, handleSubmit, touched, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: AllVenueSchemas,
        onSubmit: (values, action) => {
            action.resetForm();

            const data = {
                email: values.email,
                password: values.password,
                name: values.name,
                role: roleValue,
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
                playerStatus: "ACTIVE",
                tournamentsPlayed: values.tournamentsPlayed,
                gamesPlayed: values.gamesPlayed,
                personAPlayer: roleValue === 'PLAYER' ? true : false
            }

            Dispatch(Add_Persons(data, Token, setState))
            SetTeamBoxModel(false)
        }
    });
    const handleRole = (e) => {
        SetRoleValue(e.target.value);
    }
    const roleOptions = [
        { value: 'CO_MANAGER', label: ' CO MANAGER' },
        // { value: 'ADMIN', label: ' ADMIN' },
        { value: 'PLAYER', label: 'PLAYER' },
    ]
    return (
        <Modal show={show} onHide={onClose} size='xl' centered className='py-4'>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>

            <form onSubmit={handleSubmit}>
                <Modal.Body className='row gy-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2'>
                    {/* Email Field */}
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
                            label="Team Name"
                            onChange={handleChange}
                            value={values.name}
                            className="form-control"
                            touched={touched.name}
                            error={errors.name}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <SelectTag
                            options={roleOptions}
                            className="d-flex flex-grow-1 bg-white   "
                            name="role"
                            onChange={handleRole}
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
                        <InputField
                            type="number"
                            name="numberOfFields"
                            label="Number of Fields"
                            onChange={handleChange}
                            value={values.numberOfFields}
                            className="form-control"
                            touched={touched.numberOfFields}
                            error={errors.numberOfFields}
                        />
                    </div>
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
                    <div className="d-flex ">
                        <button type="submit" className="mt-3 gradient-btn-orange">
                            Submit
                        </button>
                    </div>

                </Modal.Body>
            </form>
        </Modal>
    );
};

export default AllPersonModel;
