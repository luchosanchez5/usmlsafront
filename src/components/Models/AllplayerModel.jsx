import React from 'react'
import { useFormik } from 'formik';
import InputField from '../product/InputField';
import Modal from 'react-bootstrap/Modal';
import { AllPlayersSchemas } from '../../Schemas/Schemas';
const AllplayerModel = ({ show, onClose, SetTeamBoxModel }) => {
    const initialValues = {
        firstName:'',
        lastName:'',
        email: '',
        address1: '',
        address2: '',
        points: '',
        ranking: '',
        division: "",
        city: "",
        state: "",
        zipCode:'',
        mobilePhone:'',

    };

    const { values, handleChange, errors, handleSubmit, touched, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: AllPlayersSchemas,
        onSubmit: (values, action) => {
            action.resetForm();
            SetTeamBoxModel(false)
        }
    });
    return (
        <Modal show={show} onHide={onClose} size='xl' centered className='py-4 ' >
            <Modal.Header closeButton>
                <Modal.Title>All Player lists</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>

                <Modal.Body className='row gy-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2'>
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
                            name="points"
                            label="Player Point"
                            onChange={handleChange}
                            value={values.points}
                            className="form-control"
                            touched={touched.points}
                            error={errors.points}
                        />
                    </div>


                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="ranking"
                            label="Player Ranking"
                            onChange={handleChange}
                            value={values.ranking}
                            className="form-control"
                            touched={touched.ranking}
                            error={errors.ranking}
                        />
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="division"
                            label="Player Division"
                            onChange={handleChange}
                            value={values.division}
                            className="form-control"
                            touched={touched.division}
                            error={errors.division}
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
                            label="Play State"
                            onChange={handleChange}
                            value={values.state}
                            className="form-control"
                            touched={touched.state}
                            error={errors.state}
                        />
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="number"
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
                            type="number"
                            name="mobilePhone"
                            label="Mobile Phone"
                            onChange={handleChange}
                            value={values.mobilePhone}
                            className="form-control"
                            touched={touched.mobilePhone}
                            error={errors.mobilePhone}
                        />
                    </div>
                    {/* <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="playerStatus"
                            label="Player Status"
                            onChange={handleChange}
                            value={values.playerStatus}
                            className="form-control"
                            touched={touched.playerStatus}
                            error={errors.playerStatus}
                        />
                    </div> */}
<div className="d-flex">
<button type="submit" className="mt-3 gradient-btn-orange">
                            Submit
                        </button>

</div>
                      
                </Modal.Body>
            </form>

        </Modal>

    )
}

export default AllplayerModel