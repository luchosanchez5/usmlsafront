import { useContext, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import InputField from '../product/InputField';
import { useFormik } from 'formik';
import { AllDivisionSchemas } from '../../Schemas/Schemas';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GlobalInfo } from '../../App';
import SelectTag from '../product/SelectTag';
import { useNavigate } from 'react-router-dom';
import { AddDivisions, GetDivisionsDetailsByDivisionId, GetTournamentsBySearch, UpdateDivisions } from '../../store/tournament/actions/actionsCreators';
import SpinNer from '../LoadingSpinner/SpinNer';

function AddDivisionFields() {
    const { user, token } = useSelector((state) => state.user)
    const { TournamentBySearch, AllDivisionsData, DivisionDetails, isLoading } = useSelector((state) => state.tournament)
    const { DivisionEdit, DivisionId } = useContext(GlobalInfo)
    const Token = user?.access_token
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    const TournmentOptions = TournamentBySearch && TournamentBySearch?.data?.length > 0
        ? TournamentBySearch?.data?.map(item => ({
            value: item?.tournamentId,
            label: item?.name

        }))
        : [];

    const initialValues = {
        divisionName: "",
        entryFee: null,
        initialDepositFee: null,
        maxTeams: null,
        divisionStatus: "",
        startTime: '',
        prize1: null,
        prize2: null,
        prize3: null,
        prize4: null,
        tournamentId: null
    }

    const convertToISOString = (selectedTime) => {
        const currentDate = new Date(); // Get current date
        const [hours, minutes] = selectedTime.split(':').map(Number);

        currentDate.setHours(hours);
        currentDate.setMinutes(minutes);
        currentDate.setSeconds(0); // Default seconds to 0
        currentDate.setMilliseconds(0); // Default milliseconds to 0

        // Return ISO string
        return currentDate.toISOString();
    }
    const { values, handleChange, errors, handleSubmit, setValues, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: AllDivisionSchemas,
        onSubmit: (values, action) => {
            const data = {
                divisionName: values.divisionName,
                entryFee: values.entryFee,
                initialDepositFee: values.initialDepositFee,
                maxTeams: values.maxTeams,
                divisionStatus: values.divisionStatus,
                startTime: convertToISOString(values.startTime),
                prize1: values.prize1,
                prize2: values.prize2,
                prize3: values.prize3,
                prize4: values.prize4,
                tournamentId: Number(values.tournamentId)
            }
            if (DivisionEdit) {
                Dispatch(UpdateDivisions(DivisionId, data, Token, Navigate))

            } else {
                Dispatch(AddDivisions(data, Token, Navigate))
            }
            action.resetForm();


        }
    });


    useEffect(() => {
        if (DivisionEdit && DivisionDetails) {
            Dispatch(GetDivisionsDetailsByDivisionId(DivisionId, Token))

        }
    }, [Dispatch, DivisionEdit, DivisionId])
    const DivisionStatusOptions = [
        { value: "OPEN", label: "OPEN" },
        { value: "CLOSED", label: "CLOSED" },
        { value: "FULL", label: "FULL" }
    ]
    useEffect(() => {
        Dispatch(GetTournamentsBySearch(token));
    }, [Dispatch, token]);
    useEffect(() => {
        if (DivisionEdit && DivisionDetails) {
            const formattedTime = new Date(DivisionDetails?.data?.startTime).toISOString().slice(11, 16);


            setValues({
                divisionName: DivisionDetails.data.divisionName || '',
                entryFee: DivisionDetails.data.entryFee || '',
                initialDepositFee: DivisionDetails.data.initialDepositFee || '',
                maxTeams: DivisionDetails.data.maxTeams || '',
                divisionStatus: DivisionDetails.data.divisionStatus || '',
                startTime: formattedTime || '',
                prize1: DivisionDetails.data.prize1 || '',
                prize2: DivisionDetails.data.prize2 || '',
                prize3: DivisionDetails.data.prize3 || '',
                prize4: DivisionDetails.data.prize4 || '',
                tournamentId: DivisionDetails.data.tournamentId || ''
            });
        }
    }, [AllDivisionsData, DivisionEdit, setValues]);

    return (
        <>

            <div className='mt-3'>
                <h4 className='mb-3 fw-bold'>{DivisionEdit ? 'Update Division' : 'Add Division'}</h4>
                <form onSubmit={handleSubmit}>

                    <Row className='row gy-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2'>


                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="text"
                                name="divisionName"
                                label="Division Name"
                                onChange={handleChange}
                                value={values.divisionName}
                                className="form-control"
                                touched={touched.divisionName}
                                error={errors.divisionName}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="entryFee"
                                label="Entry Fee"
                                onChange={handleChange}
                                value={values.entryFee}
                                className="form-control"
                                touched={touched.entryFee}
                                error={errors.entryFee}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="time"
                                name="startTime"
                                label="Start Time"
                                onChange={handleChange}
                                value={values.startTime}
                                className="form-control"
                                touched={touched.startTime}
                                error={errors.startTime}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="initialDepositFee"
                                label="Initial Depsote Fee"
                                onChange={handleChange}
                                value={values.initialDepositFee}
                                className="form-control"
                                touched={touched.initialDepositFee}
                                error={errors.initialDepositFee}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="maxTeams"
                                label="Max Teams"
                                onChange={handleChange}
                                value={values.maxTeams}
                                className="form-control"
                                touched={touched.maxTeams}
                                error={errors.maxTeams}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <SelectTag
                                name='divisionStatus'
                                options={DivisionStatusOptions}
                                deFaultValue='Select Division Status'
                                onChange={handleChange}
                                value={values.divisionStatus}
                                label='Division Status'
                                className="form-control"
                                touched={touched.divisionStatus}
                                error={errors.divisionStatus}
                            />

                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="prize1"
                                label="Prize 1"
                                onChange={handleChange}
                                value={values.prize1}
                                className="form-control"
                                touched={touched.prize1}
                                error={errors.prize1}
                            />

                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="prize2"
                                label="Prize 2"
                                onChange={handleChange}
                                value={values.prize2}
                                className="form-control"
                                touched={touched.prize2}
                                error={errors.prize2}
                            />

                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="prize3"
                                label="Prize 3"
                                onChange={handleChange}
                                value={values.prize3}
                                className="form-control"
                                touched={touched.prize3}
                                error={errors.prize3}
                            />

                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="prize4"
                                label="Prize 4"
                                onChange={handleChange}
                                value={values.prize4}
                                className="form-control"
                                touched={touched.prize4}
                                error={errors.prize4}
                            />

                        </div>

                        <div className="d-flex flex-column flex-grow-1">
                            <SelectTag
                                name='tournamentId'
                                deFaultValue='Select Tournament'
                                label='Select Tournament'
                                options={TournmentOptions}
                                onChange={handleChange}
                                value={values.tournamentId}
                                className='form-control'
                                touched={touched.tournamentId}
                                error={errors.tournamentId}

                            />

                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                        </div>
                        <div className="d-flex justify-content-center flex-grow-1 ">
                            <button type="submit" className="mt-3 gradient-btn-orange">
                                {isLoading ? <SpinNer /> : "Add Division"}
                            </button>
                        </div>

                    </Row>

                </form>
            </div>
        </>
    );
}

export default AddDivisionFields;
