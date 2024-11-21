import React  from 'react'
import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import InputField from '../product/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { Row  } from 'react-bootstrap';
import { Update_Persons } from '../../store/person/actions/actionsCreators';
const ManagerInfoEditModel = ({ show, onClose, setEditModel, setState }) => {
    const Dispatch = useDispatch()
    const { Persondata } = useSelector((state) => state.person)
    const { user } = useSelector((state) => state.user)
    const userId = user.userId
    const Token = user?.access_token
    const initialValues = {
        email: Persondata.data.email,
        name: Persondata?.data.name || '',
        firstName: Persondata?.data.firstName || '',
        lastName: Persondata?.data.lastName || '',
        address1: Persondata?.data.address1 || '',
        address2: Persondata?.data.address2 || '',
        ranking: Persondata?.data?.ranking || null,
        city: Persondata?.data?.city || "",
        state: Persondata?.data?.state || "",
        mobilePhone:Persondata?.data?.mobilePhone || "",
        zipCode: Persondata?.data?.zipCode || "",
        country:Persondata?.data?.country || "",
    }
    const { values, handleChange, errors, handleSubmit, touched  } = useFormik({
        initialValues: initialValues,
        // validationSchema: AllVenueSchemas,
        onSubmit: (values, action) => {
            action.resetForm();

            const data = {
                name: values.name,
                email: Persondata.data.email,
                Password: null,
                role: 'MANAGER',
                firstName: values.firstName,
                lastName: values.lastName,
                address1: values.address1,
                address2: values.address2,
                points: null,
                ranking: values.ranking,
                division: null,
                city: values.city,
                state: values.state,
                zipCode: values.zipCode,
                mobilePhone: values.mobilePhone,
                playerStatus: 'ACTIVE',
                tournamentsPlayed: null,
                gamesPlayed: null,
                personAPlayer: false,
                country:values.country
            }
            Dispatch(Update_Persons(data, userId, Token))
            setEditModel(false)
            setState(prev => !prev)
          
        }
    });
    
    return (
        <Modal show={show} onHide={onClose} size='xl' centered className='py-4 ' >
            <Modal.Header closeButton>
                <Modal.Title>Edit Info</Modal.Title>
            </Modal.Header>

            <form onSubmit={handleSubmit}>
                <Modal.Body >
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
                                disabled
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

                      
                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="text"
                                name="mobilePhone"
                                label="mobilePhone"
                                onChange={handleChange}
                                value={values.mobilePhone}
                                className="form-control"
                                touched={touched.mobilePhone}
                                error={errors.mobilePhone}
                            />
                        </div>

                        <div className="d-flex flex-column flex-grow-1">
                            <InputField
                                type="text"
                                name="country"
                                label="Country"
                                onChange={handleChange}
                                value={values.country}
                                className="form-control"
                                touched={touched.country}
                                error={errors.country}
                            />
                        </div>


                     
                        
                    

                     
                    </Row>
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

export default ManagerInfoEditModel;