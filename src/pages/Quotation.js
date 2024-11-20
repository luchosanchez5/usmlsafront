import React from 'react';
import {Container, Row } from 'react-bootstrap';

import SidebarNav from '../shared/SidebarNav';
import TopBar from '../shared/TopBar';

const Quotation = () => {
    return (
        <div className='page-container'>
            <SidebarNav />
            <main className='main-container'>
                <Container fluid>
                    <TopBar />
                    <Row>
                        <h1>Quotation</h1>
                    </Row>
                </Container>
            </main>
        </div>
    )
}

export default Quotation;
