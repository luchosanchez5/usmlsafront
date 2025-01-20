import React from 'react';
import { Col, Row, Table, Form } from 'react-bootstrap';
import { AiFillPrinter, AiFillFilePdf, AiOutlineDelete } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { dateFormat } from '../../utlils/dateFormat';

const SalesTable = () => {

    const data = [
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
        { date: '12-11-22', customer: 'Aethon', reference: 'Bakery', status: 'Paid', payment: 'Due', total: 120, paid: 'Pc', due: 100, biller: 'Admin' },
    ];

    return (
        <div className='section-main m-3 px-3 py-4'>
            <Row className='mb-3'>
                <Col>
                    <Form.Control type="email" placeholder="Search" className='w-50' />
                </Col>
                <Col>
                    <div className='text-end'>
                        <AiFillFilePdf className='pdf-icon' />
                        <AiFillPrinter className='print-icon' />
                    </div>
                </Col>
            </Row>
            <Table responsive hover size="sm" className='page-main-table mt-2'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Reference</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Due</th>
                        <th>Biller</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className='main-row'>
                            <td>{dateFormat(item.date)}</td>
                            <td>{item.customer}</td>
                            <td>{item.reference}</td>
                            <td>{item.status}</td>
                            <td>{item.payment}</td>
                            <td>{item.total}</td>
                            <td>{item.paid}</td>
                            <td>{item.due}</td>
                            <td>{item.biller}</td>
                            <td>
                                <div>
                                    <BsEye className='action-icon eye-icon' />
                                    <CiEdit className='action-icon edit-icon' />
                                    <AiOutlineDelete className='action-icon delete-icon' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default SalesTable;
