import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdOutlineAdd } from 'react-icons/md';
import '../assets/css/page-header.css';

const PageHeader = ({ title, subtitle, btnText, onClick, className }) => {
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
            <Row className='m-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2  '>
                <Col>
                    <div>
                        <h3 className='header-title'>{title}</h3>
                        <h4 className='header-subtitle'>{subtitle}</h4>
                    </div>
                </Col>
                <Col className='text-start text-md-end text-lg-end'>
                    <button className={`${btnText.trim() === 'Team Register' ? 'Team-register-btn' : 'gradient-btn-orange'} p-2`}
                        onClick={onClick}><MdOutlineAdd fontSize={20} />{btnText}</button>
                </Col>
            </Row>
        )
    }
}

export default PageHeader;
