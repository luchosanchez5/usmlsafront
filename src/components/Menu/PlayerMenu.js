import React from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { RiTeamFill } from "react-icons/ri";
// import { MdTour, MdOutlinePayment } from "react-icons/md";
const PlayerMenu = ({ isCollapsed }) => {
    return (
        <>
            <SubMenu label="Team Management " icon={<RiTeamFill className='menu-icon' />} className='submenu-item'>
                <a href="/dashboard/yourteam" className='menu-item-link text-white'>
                    <MenuItem>{!isCollapsed && 'Your Team'}</MenuItem>
                </a>
            </SubMenu>
        
                
            {/* <SubMenu label="Payment " icon={<MdOutlinePayment className='menu-icon' />} className='submenu-item'>

                <NavLink to="/dashboard/payment" className='menu-item-link text-white'>
                    <MenuItem>{!isCollapsed && 'Payment History'}</MenuItem>
                </NavLink>


            </SubMenu> */}
        </>
    )
}

export default PlayerMenu