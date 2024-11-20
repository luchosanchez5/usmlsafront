import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Table, Form } from 'react-bootstrap';
import { AiFillPrinter, AiFillFilePdf, AiOutlineDelete } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { IoAddCircle } from "react-icons/io5";
import '../../assets/css/products-table.css';
import { useDispatch, useSelector } from 'react-redux';
import { DelTournaments, GetTournaments } from '../../store/tournament/actions/actionsCreators';
import DeleteModel from '../Models/DeleteModel';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useNavigate } from 'react-router-dom';
import { GlobalInfo } from '../../App';
const AllTournamentTable = () => {
    const { TournamentData } = useSelector((state) => state.tournament)
    const { token } = useSelector((state) => state.user)
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    const [state, setState] = useState(false)
    const [page, setPage] = useState(0);
    const [tournamentId, setTournamentId] = useState(null)
    const { SetTournamentEdit, SetTournamentId } = useContext(GlobalInfo)

    const [DelTournamentModel, SetDelTournamentModel] = useState(false);


    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };
    useEffect(() => {
        Dispatch(GetTournaments(page))
    }, [Dispatch, state, page])

    const handleDelTournamentbtn = (id) => {
        setTournamentId(id);
        SetDelTournamentModel(true)
    }
    const handleCloseModel = () => {
        SetDelTournamentModel(false);
    };
    const handleDeleteTournament = () => {
        Dispatch(DelTournaments(tournamentId, token))
        setState(prev => !prev)
        SetDelTournamentModel(false)
    };
    const handleEditbtn = (id) => {
        SetTournamentId(id)
        SetTournamentEdit(true)
        Navigate('/dashboard/addtournaments')
    }
    const handleEyebtn = (id) => {
        Navigate(`/dashboard/tournamentsdetails/${id}`)
    }
    return (
        <>
            <div className='section-main m-3 px-3 py-4 rounded-lg shadow-lg max-w-4xl'>
                <Row className='mb-3'>
                    <Col>
                        <Form.Control type="email" placeholder="Search" className='w-50' />
                    </Col>
                    {/* <Col>
                        <div className='text-end'>
                            <AiFillFilePdf className='pdf-icon' />
                            <AiFillPrinter className='print-icon' />
                        </div>
                    </Col> */}
                </Row>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Table responsive hover className='page-main-table mt-2'>
                        <thead>
                            <tr>
                                <th>Tournament Name</th>
                                <th>Venue Name</th>
                                <th> startDate </th>
                                <th> End Date</th>
                                <th>Tournament Status</th>
                                <th>Action</th>



                            </tr>
                        </thead>
                        <tbody>
                            {TournamentData?.data?.length > 0 ? TournamentData?.data?.map((item, index) => (
                                <tr key={index} className='main-row'>
                                    <td>{item?.name}</td>
                                    <td>{item?.venueName ? item?.venueName : 'No Venue Selected Yet'}</td>
                                    <td>{item?.startDate}</td>
                                    <td>{item?.endDate}</td>
                                    <td
                                        style={{
                                            color: item?.status === 'ACTIVE' ? 'green' : 'red',
                                        }}>
                                        {item?.tournamentStatus || item?.status}
                                    </td>

                                    <td>
                                        <div>
                                            <BsEye className='action-icon eye-icon' onClick={() => handleEyebtn(item?.tournamentId)} />
                                            <CiEdit className='action-icon edit-icon' onClick={() => handleEditbtn(item?.tournamentId)} />
                                            <AiOutlineDelete className='action-icon delete-icon' onClick={() => handleDelTournamentbtn(item?.tournamentId)} />
                                        </div>
                                    </td>


                                </tr>
                            )) : <tr>
                                <td colSpan="7" className='text-center'>No Tournament Available</td>
                            </tr>}
                        </tbody>

                    </Table>
                    {TournamentData?.totalRecords > 10 && <PaginationControl
                        page={page}
                        between={3}
                        limit={10}
                        total={TournamentData?.totalRecords}
                        changePage={(page) => handlePageChange(page)}
                        ellipsis={1}
                    />}
                    {DelTournamentModel && <DeleteModel title='Tournament' show={DelTournamentModel} onClose={handleCloseModel} OnDelete={handleDeleteTournament} />
                    }
                </div>
            </div>
        </>
    )
}

export default AllTournamentTable;
