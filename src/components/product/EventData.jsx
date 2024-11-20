import React from 'react';
import { Col, Image, Row, Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

const EventData = ({ title, subtitle, ranking, points, img }) => {
    const getitem = localStorage.getItem('Login')
    const IsLoggedIn = JSON.parse(getitem)
    const Navigate=useNavigate()
    const handleRegister = () => {
        if (!IsLoggedIn) {
            Navigate('/auth/login')
        } else {
            Navigate('/myaccount')
        }
    }
    return (
        <Row className='event-data-container mx-5 my-3 py-5'>


            <Col md={8} className='d-flex align-items-center'>
                <Image
                    width={300}
                    // style={{''}}  
                    src={img}
                    alt="Event Logo"
                    className="event-logo"
                />
                <div className="d-flex flex-column ms-3 text-center text-md-start">
                    <span className='event-location'> {title}</span>
                    <h4 className='event-title fw-bold'>{subtitle}</h4>
                    <h3 className='event-date'>{ranking}</h3>
                    <Button variant='outline-light' className='registered-teams-btn'>
                        Registered Teams 6
                    </Button>
                    <span className='event-division'>{points}</span>
                </div>
            </Col>
            <Col md={4} className='d-flex justify-content-end'>
                <div className="d-flex flex-column gap-3">
                    <div className="text-uppercase border-1 border-primary qualifier-text">
                        Qualifier
                    </div>
                    <span>$500</span>
                    <button className='text-capitalize Login-btn text-white px-3 py-2 '>Who Coming</button>
                    <Button variant='outline-light'>Divisions</Button>
                    <button className='Login-btn text-white px-3 py-2' onClick={handleRegister}>{IsLoggedIn ?'Buy Now':'Register'}</button>
                </div>
            </Col>
        </Row>
    );
}

export default EventData;
