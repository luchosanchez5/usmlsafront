import React from 'react';

import '../../assets/css/dashboard-card.css';

const DashboardCard = ({ icon, title, count, cardColor }) => {
    if (cardColor) {
        return (
            <div className='card-body rounded' style={{ backgroundColor: `${cardColor}` }}>
                <div>
                    <h4 className='card-count text-light'>{count}</h4>
                    <h4 className='card-title text-light'>{title}</h4>
                </div>
                {icon}
            </div>
        )
    }
}

export default DashboardCard;
