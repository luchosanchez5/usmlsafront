import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import SidebarNav from '../shared/SidebarNav';
import TopBar from '../shared/TopBar';
import Dashboard from '../components/home/Dashboard';
import PurchaseSale from '../components/home/PurchaseSale';
import RecentProducts from '../components/home/RecentProducts';
import ExpiredProducts from '../components/home/ExpiredProducts';

const Home = () => {
    return (
        <div className='page-container'>
            <SidebarNav />
            <main className='main-container'>
                <Container fluid className='ps-1'  >
                    <TopBar />
                    <Dashboard />
                
                </Container>
            </main>
        </div>
    )
}

export default Home;
