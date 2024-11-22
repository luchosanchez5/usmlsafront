import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableSkeleton = ({ rows = 5, columns = 5, baseColor = "#afafaf", highlightColor = "#afafaf" }) => {
    return (
        <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <td key={colIndex}>
                            <Skeleton
                                height={20}
                                width="100%"
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableSkeleton;
