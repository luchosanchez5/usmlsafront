import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form } from 'react-bootstrap';
import InputField from '../product/InputField';
import { Formik, useFormik } from 'formik';
function ModelBox({ show, onClose, SetTeamBoxModel, title }) {
    console.log("🚀 : ~ file: ModelBox.jsx:9 ~ ModelBox ~ title", title);
    const TitleTournamentList = 'All Tournament lists'
  
    const initialValues = {
        name: '',
        points: '',
        ranking: '',
        division: '',
        gamesWin: '',
        gamesLost: '',
        runScored: '',
        runAllowed: '',
        helo: '',
    };

    const { values, handleChange, errors, handleSubmit, touched, resetForm } = useFormik({
        initialValues: initialValues,
        // validationSchema: errorSchema,
        onSubmit: (values, action) => {
            console.log("🚀 : ~ file: ModelBox.jsx:34 ~ ModelBox ~ values", values);
            action.resetForm();
            SetTeamBoxModel(false)
        }
    });

    return (
        <>
            <Modal show={show} onHide={onClose} size='xl' centered className='py-4 ' >
                <Modal.Header closeButton>
                    <Modal.Title> {title}</Modal.Title>
                </Modal.Header>
               
                    <form onSubmit={handleSubmit}>

                        <Modal.Body className='row gy-3'>

                            {title === 'All Teams' ? (
                                <>

                                    <div className="d-flex gap-4 flex-wrap">
                                        <div className="d-flex flex-column flex-grow-1">
                                            <InputField
                                                type="text"
                                                name="name"
                                                label="Team Name"
                                                onChange={handleChange}
                                                value={values.name}
                                                className="form-control"
                                                touched={touched.teamName}
                                                error={errors.teamName}
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
                                                touched={touched.teamLocation}
                                                error={errors.teamLocation}
                                            />
                                        </div>


                                        <div className="d-flex flex-column flex-grow-1">
                                            <InputField
                                                type="text"
                                                name="ranking"
                                                label="Team Ranking"
                                                onChange={handleChange}
                                                value={values.ranking}
                                                className="form-control"
                                                touched={touched.teamCouch}
                                                error={errors.teamCouch}
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
                                                touched={touched.teamFoundedYear}
                                                error={errors.teamFoundedYear}
                                            />
                                        </div>
                                        <div className="d-flex flex-column flex-grow-1">
                                            <InputField
                                                type="text"
                                                name="gamesWin"
                                                label="Games Win"
                                                onChange={handleChange}
                                                value={values.gamesWin}
                                                className="form-control"
                                                touched={touched.teamColor}
                                                error={errors.teamColor}
                                            />
                                        </div>
                                        <div className="d-flex flex-column flex-grow-1">
                                            <InputField
                                                type="text"
                                                name="gamesLost"
                                                label="Games Lost"
                                                onChange={handleChange}
                                                value={values.gamesLost}
                                                className="form-control"
                                                touched={touched.teamRanking}
                                                error={errors.teamRanking}
                                            />
                                        </div>
                                        <div className="d-flex flex-column flex-grow-1">
                                            <InputField
                                                type="text"
                                                name="runScored"
                                                label="Run Scored"
                                                onChange={handleChange}
                                                value={values.runScored}
                                                className="form-control"
                                                touched={touched.teamRanking}
                                                error={errors.teamRanking}
                                            />
                                        </div>
                                        <div className="d-flex flex-column flex-grow-1">
                                            <InputField
                                                type="text"
                                                name="runAllowed"
                                                label="Run Allowed"
                                                onChange={handleChange}
                                                value={values.runAllowed}
                                                className="form-control"
                                                touched={touched.teamRanking}
                                                error={errors.teamRanking}
                                            />
                                        </div>
                                    </div>

                                </>
                            ) : title === 'All Tournament' ? (
                                <>
                                    <p>All Tournament</p>
                                   
                                </>
                            ) : title === 'All Venue lists' ? (
                                <>
                                    <p>All Venue lists</p>
                                    
                                </>
                            ) : title === 'All Player lists' ? (
                                <>
                                    <p>All Player lists</p>
                                    

                                </>
                            ) : (
                                ''
                            )}

                            <div className="d-flex ">
                                <button type="submit" className="mt-3 gradient-btn-orange">
                                    Submit
                                </button>
                            </div>

                        </Modal.Body>

                    </form>
s            </Modal>
        </>
    );
}

export default ModelBox;
