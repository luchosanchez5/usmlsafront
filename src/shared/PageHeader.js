import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdOutlineAdd } from 'react-icons/md';

import CustomButton from './CustomButton';
import '../assets/css/page-header.css';

const PageHeader = ({ title, subtitle, btnText, onClick, TeamBoxModel }) => {
    if (!btnText) {
        return (
            <React.Fragment>
                <Col>
                    <div className='mt-3'>
                        <h3 className='header-title'>{title}</h3>
                        <h4 className='header-subtitle'>{subtitle}</h4>
                    </div>
                </Col>
            </React.Fragment>
        )
    }
    else {
        return (
            <Row className='my-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 '>
                <Col>
                    <div>
                        <h3 className='header-title'>{title}</h3>
                        <h4 className='header-subtitle'>{subtitle}</h4>
                    </div>
                </Col>
                <Col className='text-end'>
                    <button className={`${btnText.trim() === 'Team Register' ? 'Team-register-btn' : 'gradient-btn-orange'}`}
                        onClick={onClick}><MdOutlineAdd fontSize={20} />{btnText}</button>
                </Col>
            </Row>
        )
    }
}

export default PageHeader;
