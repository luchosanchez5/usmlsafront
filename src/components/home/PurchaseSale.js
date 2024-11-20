import React from 'react';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Col, Row } from 'react-bootstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PurchaseSale = () => {

    const options = {
        responsive: true
    };

    const chartData = {
        /* The labels for the x-axis. */
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: 'Purchase & Sale',
                /* The data for the chart. */
                data: [33, 25, 35, 51, 54, 76],
                borderColor: "#ff9f43",
                backgroundColor: "#fff",
            }
        ]
    };

    return (
        <div className='section-main'>
            <h4 className='section-title'>Purchase and Sale</h4>
            <Row>
                <Col xs='12' lg='6'>
                    <Line data={chartData} options={options} />
                </Col>
                <Col xs='12' lg='6'>
                    <Line data={chartData} options={options} />
                </Col>
            </Row>
        </div>
    )
}

export default PurchaseSale;
