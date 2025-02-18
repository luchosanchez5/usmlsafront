import React, { useContext } from 'react'
import InputField from '../product/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
import SelectTag from '../product/SelectTag';
import { Add_Persons, Update_Persons } from '../../store/person/actions/actionsCreators';
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
    const { isLoading } = useSelector((state) => state.person)
    const Token = user?.access_token
    const Navigate = useNavigate()
    const initialValues = {
        email: '',
        role: '',
        firstName: '',
        lastName: '',
        mobilePhone: "",
        tournamentsPlayed: null,
        playerStatus: '',
        gamesPlayed: null,
        driverLicenseId: '',
        dateOfBirth: '',
        middleName: ''
    };

    const { values, handleChange, errors, handleSubmit, touched, setValues } = useFormik({
        initialValues: initialValues,
        validationSchema: AddPersonSchema,
        onSubmit: (values, action) => {
            let formattedDate = "";
            if (values.dateOfBirth) {
                const date = new Date(values.dateOfBirth);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                formattedDate = `${day}/${month}/${year}`;
            }
            const data = {
                email: values.email,
                role: values.role,
                firstName: values.firstName,
                lastName: values.lastName,
                mobilePhone: values.mobilePhone,
                playerStatus: "INACTIVE",
                personAPlayer: values?.role === 'PLAYER' ? true : false,
                driverLicenseId: values.driverLicenseId,
                dateOfBirth: formattedDate,
                middleName: values.middleName
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

    //     console.log("User edit and person details use effect ...................")
    //     if (UserEdit && PersonDetails) {
    //         setValues({
    //             email: PersonDetails.email || '',
    //             name: PersonDetails.name || '',
    //             role: PersonDetails.role || '',
    //             firstName: PersonDetails.firstName || '',
    //             lastName: PersonDetails.lastName || '',
    //             address1: PersonDetails.address1 || '',
    //             address2: PersonDetails.address2 || '',
    //             points: PersonDetails.points || '',
    //             ranking: PersonDetails.ranking || '',
    //             division: PersonDetails.division || '',
    //             city: PersonDetails.city || '',
    //             state: PersonDetails.state || '',
    //             zipCode: PersonDetails.zipCode || '',
    //             mobilePhone: PersonDetails.mobilePhone || '',
    //             playerStatus: PersonDetails || '',
    //             tournamentsPlayed: values.tournamentsPlayed || '',
    //             gamesPlayed: PersonDetails.gamesPlayed || '',
    //         });
    //     }
    // }, [PersonDetails, UserEdit, setValues]);
    return (
        <div className='mt-3'>
            <h2 className='mb-3 fw-bold'>{UserEdit ? 'Update User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <Row className='row gy-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2'>
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
                            name="middleName"
                            label="Middle Name (Optional)"
                            onChange={handleChange}
                            value={values.middleName}
                            className="form-control"
                            touched={touched.middleName}
                            error={errors.middleName}
                        />
                    </div>
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
                    <div className="d-flex  flex-column flex-grow-1">
                        <SelectTag
                            options={roleOptions}
                            className="d-flex flex-grow-1  bg-white form-control  "
                            name="role"
                            label='User Type'
                            value={values.role}
                            deFaultValue="Select User Type"
                            onChange={handleChange}
                            touched={touched.role}
                            error={errors.role}
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
                            type="date"
                            name="dateOfBirth"
                            label="Date of Birth"
                            onChange={handleChange}
                            value={values.dateOfBirth}
                            className="form-control"
                            touched={touched.mobilePhone}
                            error={errors.dateOfBirth}
                        />
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="driverLicenseId"
                            label="Driver License Id"
                            onChange={handleChange}
                            value={values.driverLicenseId}
                            className="form-control"
                            touched={touched.driverLicenseId}
                            error={errors.driverLicenseId}
                        />
                    </div>
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
