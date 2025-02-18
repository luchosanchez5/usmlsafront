import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Table, Form } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import '../../assets/css/products-table.css';
import { useDispatch, useSelector } from 'react-redux';
import { DelTournaments, GetTournaments, getTournamentsbySearch } from '../../store/tournament/actions/actionsCreators';
import DeleteModel from '../Models/DeleteModel';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useNavigate } from 'react-router-dom';
import { GlobalInfo } from '../../App';
import TableSkeleton from '../SkeletonTable/SkeletonTable';
import { dateFormat } from '../../utlils/dateFormat';
const AllTournamentTable = () => {
    const { TournamentData, isLoading } = useSelector((state) => state.tournament)
    const { token } = useSelector((state) => state.user)
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    const [page, setPage] = useState(0);
    const [tournamentId, setTournamentId] = useState(null)
    const { SetTournamentEdit, SetTournamentId } = useContext(GlobalInfo)

    const [DelTournamentModel, SetDelTournamentModel] = useState(false);


    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };
    useEffect(() => {
        Dispatch(GetTournaments(page))
    }, [Dispatch, page])

    const handleDelTournamentbtn = (id) => {
        setTournamentId(id);
        SetDelTournamentModel(true)
    }
    const handleCloseModel = () => {
        SetDelTournamentModel(false);
    };
    const handleDeleteTournament = () => {
        Dispatch(DelTournaments(tournamentId, token, () => {
            Dispatch(GetTournaments(page))
            SetDelTournamentModel(false)
        }))

    };
    const handleEditbtn = (id) => {
        SetTournamentId(id)
        SetTournamentEdit(true)
        Navigate('/dashboard/addtournaments')
    }
    const handleEyebtn = (id) => {
        Navigate(`/dashboard/tournamentsdetails/${id}`)
    }
    const handleSearchTournaments = (value) => {
        Dispatch(getTournamentsbySearch(value.target.value))
    }
    return (
        <>
            <div className='section-main m-3 px-3 py-4 rounded-lg shadow-lg max-w-4xl '>
                <Row className='mb-3'>
                    <Col sm={12} md={4} lg={4}>
                        <Form.Control type="text" placeholder="Tournament Name" onChange={handleSearchTournaments} />
                    </Col>


                </Row>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {
                        isLoading ? (
                            <Table>
                                <TableSkeleton
                                    rows={10}
                                    columns={7}
                                    baseColor="#afafaf"
                                    highlightColor="#afafaf"
                                />
                            </Table>) :
                            <Table border={true} responsive hover className='page-main-table mt-2'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tournament Name</th>
                                        <th>Venue Name</th>
                                        <th> Start Date </th>
                                        <th> End Date</th>
                                        <th>Tournament Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TournamentData?.data?.length > 0 ? TournamentData?.data?.map((item, index) => (
                                        <tr key={index} className='main-row'>
                                            <td>{index + 1}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.venueName ? item?.venueName : 'No Venue Selected Yet'}</td>
                                            <td>{dateFormat(item?.startDate)}</td>
                                            <td>{dateFormat(item?.endDate)}</td>
                                            <td>
                                                <span className="text-white fw-bold p-2 rounded"
                                                    style={{
                                                        background:
                                                            item?.status === "ACTIVE" ? "green" : "red",
                                                        fontSize: "12px"
                                                    }}> {item?.tournamentStatus || item?.status}
                                                </span>
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
                    }
                    {DelTournamentModel && <DeleteModel title='Tournament' show={DelTournamentModel} onClose={handleCloseModel} OnDelete={handleDeleteTournament} />
                    }
                </div>

            </div>
            {TournamentData?.totalRecords > 10 && <PaginationControl
                page={page + 1}
                between={3}
                limit={10}
                total={TournamentData?.totalRecords}
                changePage={(page) => setPage(page - 1)}
                ellipsis={1}
            />}
        </>
    )
}

export default AllTournamentTable;
