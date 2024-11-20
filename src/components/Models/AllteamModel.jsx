import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form } from 'react-bootstrap';
import InputField from '../product/InputField';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import { AllTeamSchemas } from '../../Schemas/Schemas';
import { useDispatch } from 'react-redux';
import { AddTeams } from '../../store/team/actions/actionsCreators';
import { useSelector } from 'react-redux';
function AllteamModel({ show, onClose, SetTeamBoxModel }) {
    const TitleTournamentList = 'All Tournament lists'
    const{user}=useSelector((state)=>state.user)
    const Token=user?.access_token
const Dispatch=useDispatch()
    const initialValues = {
        name: '',
        email: '',
        address: '',
        points: null,
        ranking: null,
        division: '',
        city: '',
        state: '',
        gamesWin: null,
        gamesLost: null,
        gamesTied: null,
        avgRunsScored: null,
        avgRunsAllowed: null,
        avgRunsDiff:null,
        runScored: null,
        runAllowed: null
    }
    const { values, handleChange, errors, handleSubmit, touched, resetForm } = useFormik({
        initialValues: initialValues,
        // validationSchema: AllTeamSchemas,
        onSubmit: (values, action) => {
            action.resetForm();
            const data={
                name:values.name ,
                email:values.email,
                address: values.address,
                points: values.points,
                ranking: values.ranking,
                division: values.division,
                city: values.city,
                state: values.state,
                gamesWin: values.gamesWin,
                gamesLost: values.gamesLost,
                gamesTied: values.gamesTied,
                avgRunsScored: values.avgRunsScored,
                avgRunsAllowed: values.avgRunsAllowed,
                avgRunsDiff: values.avgRunsDiff,
                runScored: values.runScored,
                runAllowed: values.runAllowed,
                teamStatus: 'ACTIVE'
            }
            Dispatch(AddTeams(data,Token))
            SetTeamBoxModel(false)
        }
    });

    return (
        <>
            <Modal show={show} onHide={onClose} size='xl' centered className='py-4 ' >
                <Modal.Header closeButton>
                    <Modal.Title> All Team Lists</Modal.Title>
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
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="text"
                                name="address"
                                label="Address"
                                onChange={handleChange}
                                value={values.address}
                                className="form-control"
                                touched={touched.address}
                                error={errors.address}
                            />
                        </div>

                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="points"
                                label="Team Points"
                                onChange={handleChange}
                                value={values.points}
                                className="form-control"
                                touched={touched.points}
                                error={errors.points}
                            />
                        </div>


                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="ranking"
                                label="Team Ranking"
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
                                label="Team Division"
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
                                name="gamesWin"
                                label="Games Win"
                                onChange={handleChange}
                                value={values.gamesWin}
                                className="form-control"
                                touched={touched.gamesWin}
                                error={errors.gamesWin}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="gamesLost"
                                label="Games Lost"
                                onChange={handleChange}
                                value={values.gamesLost}
                                className="form-control"
                                touched={touched.gamesLost}
                                error={errors.gamesLost}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="gamesTied"
                                label="Games Tied "
                                onChange={handleChange}
                                value={values.gamesTied}
                                className="form-control"
                                touched={touched.gamesTied}
                                error={errors.gamesTied}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="avgRunsScored"
                                label="Avg Runs Scored "
                                onChange={handleChange}
                                value={values.avgRunsScored}
                                className="form-control"
                                touched={touched.avgRunsScored}
                                error={errors.avgRunsScored}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="avgRunsAllowed"
                                label="Avg Runs Allowed "
                                onChange={handleChange}
                                value={values.avgRunsAllowed}
                                className="form-control"
                                touched={touched.avgRunsAllowed}
                                error={errors.avgRunsAllowed}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="avgRunsDiff"
                                label="Avg Runs Diff"
                                onChange={handleChange}
                                value={values.avgRunsDiff}
                                className="form-control"
                                touched={touched.avgRunsDiff}
                                error={errors.avgRunsDiff}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="runScored"
                                label="Run Scored"
                                onChange={handleChange}
                                value={values.runScored}
                                className="form-control"
                                touched={touched.runScored}
                                error={errors.runScored}
                            />
                        </div>
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="number"
                                name="runAllowed"
                                label="Run Allowed"
                                onChange={handleChange}
                                value={values.runAllowed}
                                className="form-control"
                                touched={touched.runAllowed}
                                error={errors.runAllowed}
                            />
                        </div>
                        {/* <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="text"
                                name="teamStatus"
                                label="Team Status"
                                onChange={handleChange}
                                value={values.teamStatus}
                                className="form-control"
                                touched={touched.teamStatus}
                                error={errors.teamStatus}
                            />
                        </div> */}


                        <div className="d-flex ">
                            <button type="submit" className="mt-3 gradient-btn-orange">
                                Submit
                            </button>
                        </div>

                    </Modal.Body>

                </form>
            </Modal>
        </>
    );
}

export default AllteamModel;
