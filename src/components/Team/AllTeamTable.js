import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Table, Form } from 'react-bootstrap';
import { AiFillPrinter, AiFillFilePdf, AiOutlineDelete } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import '../../assets/css/products-table.css';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTeams, GetTeams } from '../../store/team/actions/actionsCreators';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import DeleteModel from '../Models/DeleteModel';
import { useNavigate } from 'react-router-dom';
import { GlobalInfo } from '../../App';
import SkeletonTable from '../SkeletonTable/SkeletonTable';
const AllTeamTable = () => {
    const { TeamData, isLoading } = useSelector((state) => state.team);
    console.log(isLoading)
    const [DelTeamModel, SetDelTeamModel] = useState(false)
    const { user, token } = useSelector((state) => state.user);
    const { SetTeamEdit, SetTeamId } = useContext(GlobalInfo)
    const [teamId, setTeamId] = useState(null);
    const [state, setState] = useState(false)
    const role = user
    const userId = user?.userId
    const Dispatch = useDispatch()
    const [page, setPage] = useState(0);


    const Navigate = useNavigate()
    useEffect(() => {
        Dispatch(GetTeams(page, token, role, userId))
    }, [Dispatch, state, page])
    const handleDeleteBtn = (id) => {
        setTeamId(id)
        SetDelTeamModel(true)

    }
    const handleDeleteTeam = () => {
        Dispatch(DeleteTeams(teamId, token, () => {
            Dispatch(GetTeams(page, token, role, userId))
            SetDelTeamModel(false)
        }
        ))
    }
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const handleEditBtn = (id) => {
        SetTeamId(id)
        SetTeamEdit(true)
        Navigate(`/dashboard/addteams`)
    }
    const handleEyeBtn = (id) => {
        Navigate(`/dashboard/allteams/${id}`)
    }

    return (
        <>
            <div className='section-main m-3 px-3 py-4 rounded-lg shadow-lg max-w-4xl '>
                <Row className='mb-3'>
                    <Col>
                        <Form.Control type="email" placeholder="Search" className='w-50' />
                    </Col>
                </Row>
                <Table responsive hover className=' mt-2'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>State</th>
                            <th>RunScored</th>
                            <th>RunAllowed</th>
                            <th>Team Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            TeamData?.data?.length > 0 ? TeamData?.data?.map((item, index) => (
                                <tr key={index} className='main-row'>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.state}</td>
                                    <td>{item?.avgRunsDiff}</td>
                                    <td>{item?.runAllowed}</td>
                                    <td style={{
                                        color: item?.teamStatus === 'ACTIVE' ? 'green' : 'red',
                                    }}>{item?.teamStatus}</td>

                                    <td>
                                        <div>
                                            <BsEye className='action-icon eye-icon' onClick={() => handleEyeBtn(item?.teamId)} />
                                            <CiEdit className='action-icon edit-icon' onClick={() => handleEditBtn(item?.teamId)} />
                                            <AiOutlineDelete className='action-icon delete-icon' onClick={() => handleDeleteBtn(item?.teamId)} />
                                        </div>
                                    </td>


                                </tr>
                            )) : <tr>
                                <td colSpan="10" className='text-center'>No Teams Available</td>
                            </tr>}
                    </tbody>
                </Table>


            </div>
            {DelTeamModel && <DeleteModel show={DelTeamModel} onClose={() => SetDelTeamModel(false)} OnDelete={handleDeleteTeam} title='Team' />}
            {TeamData?.data?.length > 10 && <PaginationControl
                page={page}
                between={3}
                limit={10}
                total={TeamData?.totalRecords}
                changePage={(page) => handlePageChange(page)}
                ellipsis={1}
            />}

        </>
    )
}

export default AllTeamTable;
