import React from 'react';
import { Table } from 'react-bootstrap';

const ExpiredProducts = () => {

    const data = [
        { code: 'IT003', name: 'Cake', brand: 'N/D', category: 'Bakery', expiry: '12 - 10 - 2022' },
        { code: 'IT003', name: 'Cake', brand: 'N/D', category: 'Bakery', expiry: '12 - 10 - 2022' },
        { code: 'IT003', name: 'Cake', brand: 'N/D', category: 'Bakery', expiry: '12 - 10 - 2022' },
        { code: 'IT003', name: 'Cake', brand: 'N/D', category: 'Bakery', expiry: '12 - 10 - 2022' },
    ];

    return (
        <div className='section-main'>
            <h4 className='section-title'>Expired Products</h4>
            <Table responsive hover size="sm" className='recent-products-table mt-2'>
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Brand Name</th>
                        <th>Category Name</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.category}</td>
                            <td>{item.expiry}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ExpiredProducts;
