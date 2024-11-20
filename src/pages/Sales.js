import React from 'react';
import { Container, Row } from 'react-bootstrap';

import SidebarNav from '../shared/SidebarNav';
import TopBar from '../shared/TopBar';
import PageHeader from '../shared/PageHeader';
import SalesTable from '../components/sales/SalesTable';

const Sales = () => {
    return (
        <Row className='w-100'>
            <div className='page-container'>
                <SidebarNav />
                <main className='main-container'>
                    <Container fluid>
                        <TopBar />
                        <Row>
                            <PageHeader title="Sales List" subtitle="Manage Your Sales" btnText="Add Sale" />
                        </Row>
                        <Row>
                            <SalesTable />
                        </Row>
                    </Container>
                </main>
            </div>
        </Row>
    )
}

export default Sales;
