import React from 'react'
import { useFormik } from 'formik';
import InputField from '../product/InputField';
import Modal from 'react-bootstrap/Modal';
import { AllTournamentSchemas } from '../../Schemas/Schemas';
import { useDispatch } from 'react-redux';
import { Add_Tournaments } from '../../store/tournament/actions/actionsCreators';
import { useSelector } from 'react-redux';
import SelectTag from '../product/SelectTag';
const AllTournamentModel = ({ show, onClose, SetTeamBoxModel, venueId }) => {
    const Dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const Token = user?.access_token
    const initialValues = {
        name: '',
        startDate: '',
        endDate: '',
        tournamentStatus: '',
        numberOfDivisions: null,

    };
    const tournamentStatusOptions = [
        { value: "ACTIVE", label: "ACTIVE" },
        { value: "COMPLETED", label: "COMPLETED" },
        { value: "CANCELED", label: "CANCELED" }
    ]
    const { values, handleChange, errors, handleSubmit, touched, resetForm } = useFormik({
        initialValues: initialValues,
        // validationSchema: AllTournamentSchemas,
        onSubmit: (values, action) => {
            SetTeamBoxModel(false)
            const data = {
         
                    name: values.name,
                    startDate: values.startDate,
                    endDate: values.endDate,
                    tournamentStatus: values.tournamentStatus,
                    numberOfDivisions: values.numberOfDivisions,
                    venueId: venueId && Number(venueId)

            }
            Dispatch(Add_Tournaments(data, Token))
            action.resetForm()

        }
    });

    return (
        <Modal show={show} onHide={onClose} size='xl' centered className='py-4 ' >
            <Modal.Header closeButton>
                <Modal.Title>All Tournament</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body className='row gy-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2'>
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
                        <InputField
                            type="date"
                            name="startDate"
                            label="Start Date"
                            onChange={handleChange}
                            value={values.startDate}
                            className="form-control"
                            touched={touched.startDate}
                            error={errors.startDate}
                        />
                    </div>

                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                              type="date"
                            name="endDate"
                            label="End Date"
                            onChange={handleChange}
                            value={values.endDate}
                            className="form-control"
                            touched={touched.endDate}
                            error={errors.endDate}
                        />
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                        <SelectTag
                            options={tournamentStatusOptions}
                            onChange={handleChange}
                            name='tournamentStatus'
                                  className="form-control"
                        />
                        {/* <InputField
                            type="text"
                            name="tournamentStatus"
                            label="TournamentStatus"
                            onChange={handleChange}
                            value={values.tournamentStatus}
                            className="form-control"
                            touched={touched.tournamentStatus}
                            error={errors.tournamentStatus}
                        /> */}
                    </div>
                    <div className="d-flex flex-column flex-grow-1">
                        <InputField
                            type="number"
                            name="numberOfDivisions"
                            label="Number Of Divisions"
                            onChange={handleChange}
                            value={values.numberOfDivisions}
                            className="form-control"
                            touched={touched.numberOfDivisions}
                            error={errors.numberOfDivisions}
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
    )
}

export default AllTournamentModel