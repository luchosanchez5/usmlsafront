import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { GrNotification } from 'react-icons/gr';
import Dropdown from 'react-bootstrap/Dropdown';
import '../assets/css/topbar.css';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopBar = () => {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const userName = user?.name?.trim() !== '' ? user?.name : 'No User Name';
    const handleLogout = () => {
        localStorage.removeItem('persist:grow-share');
        navigate('/auth/login');
    }

    const toggleDropdown = () => {
        setShowOptions(prev => !prev);
    }

    return (
        <Row className='bg-black'>
            <Col className='px-0'>
                <div className='d-flex justify-content-end py-4 align-items-center'>
                    {userName && (
                        <div className="text-white me-3">Hello {userName}</div>
                    )}

                    <div className="custom-select-wrapper">
                        <Dropdown className={`user-dropdown`} show={showOptions} onToggle={toggleDropdown}>
                            <Dropdown.Toggle className='bar-icon' cursor='pointer' id="user-dropdown" />
                            <Dropdown.Menu className='p-2'>
                                <Dropdown.Item className="py-0" onClick={handleLogout}>
                                    <div className="text-decoration-none text-dark d-flex align-items-center gap-2">
                                        <IoIosLogOut color='red' fontSize={25} />
                                        <span className='text-danger'>Logout</span>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default TopBar;
