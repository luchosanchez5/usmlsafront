import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Form } from 'react-bootstrap';
import { AiFillPrinter, AiFillFilePdf, AiOutlineDelete } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { IoAddCircle } from "react-icons/io5";
import '../../assets/css/products-table.css';
import { useDispatch, useSelector } from 'react-redux';
import { DelVenue } from '../../store/Venue/actions/actionCreators';
import DeleteModel from '../Models/DeleteModel';
import { GetVenue } from '../../store/Venue/actions/actionCreators';
import { useNavigate, useParams } from 'react-router-dom';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { GetPaymentRecords } from '../../store/team/actions/actionsCreators';
const PaymentHistoryTable = ({ state, setState }) => {
    const { PaymentRecords, isLoading } = useSelector((state) => state.team);
    console.log("🚀 : ~ file: PaymentHistoryTAble.jsx:17 ~ PaymentHistoryTable ~ PaymentRecords", PaymentRecords);
    const { id } = useParams()
    const { token } = useSelector((state) => state.user)
    const [DelVenueModel, SetDelVenueModel] = useState(false);
    const [VenueId, Setvenueid] = useState(null);
    const Dispatch = useDispatch();
    const Navigate = useNavigate()
    const handleDeletebtn = (id) => {
        Setvenueid(id);
        SetDelVenueModel(true);
    };

    useEffect(() => {

        Dispatch(GetPaymentRecords(id, 0, token));

    }, [Dispatch, state]);

    const handleCloseModel = () => {
        SetDelVenueModel(false);
    };
    const handleEyebtn = (id) => {
        // Navigate(`/dashboard/allvenue/${id}`)

    }

    const handleDeleteVenue = () => {
        Dispatch(DelVenue(VenueId));
        setState(prev => !prev)
        SetDelVenueModel(false);
    };


    return (
        <div className='section-main m-3 px-3 py-4 bg-white  shadow-lg mb-5'>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table responsive hover size="sm" className='mt-2'>
                    <thead>
                        <tr>
                            <th>
                                Team Name
                            </th>
                            <th>
                                Payment Purpose
                            </th>
                            <th>Pending Amount</th>
                            <th>Paid Amount</th>
                            <th>Total Amount</th>
                            <th>
                                Payment Method
                            </th>
                            <th>
                                Payment Currency
                            </th>
                            <th>
                                Payment Date
                            </th>
                            <th>Payment Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <div className="mb-4">
                                <h4>Loading...</h4>
                            </div>
                        )}
                        {/* {PaymentRecords?._embedded.paymentRecordResponseList?.length > 0 ? PaymentRecords?._embedded?.paymentRecordResponseList?.map((item, index) => (
                            <tr key={index} className='main-row'>
                                <td>{item.
                                    teamName
                                }</td>
                                <td>{item.paymentPurpose
                                }</td>
                                <td>{item.
                                    pendingAmount}</td>
                                <td>{item.
                                    paidAmount
                                }</td>
                                <td>{item.
                                    totalAmount
                                }</td>
                                <td>{item.
                                    paymentChannel
                                }</td>
                                <td>{item.
                                    paymentCurrency
                                }</td>
                                <td>{item.
                                    paymentDate
                                }</td>
                                <td style={
                                    {
                                        color: item.
                                            paymentStatus==='succeeded' ? 'green':'red'
                                    }
                                }>{item.
                                    paymentStatus
                                    }</td>
                               
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className='text-center'>No Team Members Available</td>
                            </tr>
                        )} */}
                    </tbody>
                </Table>
            </div>

            {DelVenueModel && <DeleteModel show={DelVenueModel} onClose={handleCloseModel} OnDelete={handleDeleteVenue} title='Member' />}
        </div>
    );
};

export default PaymentHistoryTable;
