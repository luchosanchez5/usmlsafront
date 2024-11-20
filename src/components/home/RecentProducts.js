import React from 'react';
import { Table } from 'react-bootstrap';

import '../../assets/css/recent-products.css';

const RecentProducts = () => {

    /* Creating an array of objects. */
    const data = [
        { name: 'Cake', price: 12 },
        { name: 'Cake', price: 12 },
        { name: 'Cake', price: 12 },
        { name: 'Cake', price: 12 },
        { name: 'Cake', price: 12 },
        { name: 'Cake', price: 12 },
        { name: 'Cake', price: 12 },
    ];

    return (
        <div className='section-main'>
            <h4 className='section-title'>Recently Added Products</h4>
            <Table responsive hover size="sm" className='recent-products-table mt-2'>
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default RecentProducts;
