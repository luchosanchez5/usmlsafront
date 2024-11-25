import React from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-bootstrap';
import { RiTeamFill } from "react-icons/ri";
import { FaThList } from "react-icons/fa";
const CoManager = ({ isCollapsed }) => {
    return (
        <>
            <SubMenu label={!isCollapsed && "Team Management " }icon={<RiTeamFill className='menu-icon' />} className='submenu-item'>
                <NavLink to="/dashboard/yourteam" className='menu-item-link text-white'>
                    <MenuItem>{isCollapsed ? <FaThList className='menu-icon' /> : 'Your Teams'}</MenuItem>
                </NavLink>



            </SubMenu>
            {/* <SubMenu label="Payment " icon={<MdOutlinePayment className='menu-icon' />} className='submenu-item'>

                <NavLink to="/dashboard/payment" className='menu-item-link text-white'>
                    <MenuItem>{!isCollapsed && 'Payment History'}</MenuItem>
                </NavLink>


            </SubMenu> */}
        </>

    )
}

export default CoManager;