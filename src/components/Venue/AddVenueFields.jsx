import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import InputField from '../product/InputField';
import { AllVenueSchemas } from '../../Schemas/Schemas';
import { useDispatch, useSelector } from 'react-redux';
import { AddVenue, GetVenue, GetVenueByVenueId, UpdateVenue } from '../../store/Venue/actions/actionCreators';
import DeleteModel from '../Models/DeleteModel';
import SelectTag from '../product/SelectTag';
import { Row } from 'react-bootstrap';
import { GlobalInfo } from '../../App';
import { useNavigate } from 'react-router-dom';
const AddVenueFields = ({ show, onClose, SetTeamBoxModel, setState }) => {
    const Dispatch = useDispatch()
    // const[DelVenueModel,SetDelVenueModel]=useState(false)
    const { user } = useSelector((state) => state.user)
    const { VenuDetails, isLoading } = useSelector((state) => state.venue);
    const { VenueEdit, VenueId } = useContext(GlobalInfo)

    const Navigate = useNavigate()
    const Token = user?.access_token

    const initialValues = {
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        numberOfFields: null,
        venueStatus: ''
    };
    const VenueStatusOptions = [
        { value: 'CLOSED', label: 'CLOSED' },
        { value: 'OPEN', label: 'OPEN' },
        { value: 'UNDER_MAINTENANCE', label: 'UNDER_MAINTENANCE' }
    ]
    const { values, handleChange, errors, handleSubmit, setValues, touched, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: AllVenueSchemas,
        onSubmit: (values, action) => {
            action.resetForm();

            const data = {
                name: values.name,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                state: values.state,
                numberOfFields: values.numberOfFields,
                venueStatus: values.venueStatus

            }

            if (VenueEdit) {
                Dispatch(UpdateVenue(data, Token, VenueId, Navigate))


            } else {
                Dispatch(AddVenue(data, Token, Navigate))

            }
            // setState(prev => !prev)
            // SetTeamBoxModel(false)
        }
    });
    useEffect(() => {
        if (VenueEdit && VenueId) {
            Dispatch(GetVenueByVenueId(VenueId, Token))

        }
    }, [VenueEdit])
    useEffect(() => {
        if (VenueEdit && VenuDetails) {
            setValues({
                name: VenuDetails.name || '',
                address1: VenuDetails.address1 || '',
                address2: VenuDetails.address2 || '',
                city: VenuDetails.city || '',
                state: VenuDetails.state || '',
                numberOfFields: VenuDetails.numberOfFields || '',
                venueStatus: VenuDetails.statusVenue || ''
            });
        }
    }, [VenuDetails, VenueEdit, setValues]);
    return (
        <>
            <h4 className='my-3 fw-bold'>{VenueEdit ? 'Update Venue':'Add Venue'}</h4>
            <form onSubmit={handleSubmit}>
                <Row className='row gy-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2'>
                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="name"
                            label="Venue Name"
                            onChange={handleChange}
                            value={values.name}
                            className="form-control"
                            touched={touched.name}
                            error={errors.name}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="text"
                            name="address1"
                            label="Adress 1"
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
                            type="number"
                            name="numberOfFields"
                            label="Number Of Fields"
                            onChange={handleChange}
                            value={values.numberOfFields}
                            className="form-control"
                            touched={touched.numberOfFields}
                            error={errors.numberOfFields}
                        />
                    </div>
                    <div className="d-flex flex-column  flex-grow-1">
                        <SelectTag
                            label="Venue Status"
                            name="venueStatus"
                            options={VenueStatusOptions}
                            value={values.venueStatus}
                            onChange={handleChange}
                            touched={touched.venueStatus}
                            error={errors.venueStatus}
                            className="form-control"
                        />

                    </div>
                    <div className="d-flex flex-column  flex-grow-1">
                    </div>

                    <div className="d-flex justify-content-center flex-grow-1 ">
                        <button type="submit" className="mt-3 gradient-btn-orange">
                            Submit
                        </button>
                    </div>

                </Row>
            </form>
        </>
    )
}

export default AddVenueFields;