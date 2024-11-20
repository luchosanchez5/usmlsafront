import React from 'react';
import { Table } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

function SkeletonTable({ rows = 5, columns = 6 }) {
    return (
        <Table responsive hover className='mt-2'>
            <thead>
                <tr>
                    {[...Array(columns)].map((_, colIndex) => (
                        <th key={colIndex}>
                            <Skeleton width={100} />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {[...Array(rows)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {[...Array(columns)].map((_, colIndex) => (
                            <td key={colIndex}>
                                <Skeleton width="100%" />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default SkeletonTable;
