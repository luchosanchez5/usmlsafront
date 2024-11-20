import React from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import {  FaUsers } from "react-icons/fa6";
import {  MdOutlinePayment } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
const ManagerMenu = ({ isCollapsed }) => {
    return (
        <>



            <SubMenu label="Team " icon={<RiTeamFill className='menu-icon' />} className='submenu-item'>
                <NavLink to="/dashboard/allteams" className='menu-item-link text-white'>
                    <MenuItem>{!isCollapsed && 'All Teams'}</MenuItem>
                </NavLink>


                <NavLink to="/dashboard/addteams" className='menu-item-link text-white'>
                    <MenuItem>{!isCollapsed && 'Add Team'}</MenuItem>
                </NavLink>
            </SubMenu>
            <SubMenu label="User " icon={<FaUsers className='menu-icon' />} className='submenu-item'>

                <>
                    <NavLink to="/dashboard/addperson" className='menu-item-link text-white'>
                        <MenuItem>{!isCollapsed && 'Add Users'}</MenuItem>
                    </NavLink>

                </>
            </SubMenu>
            <SubMenu label="Payment " icon={<MdOutlinePayment className='menu-icon' />} className='submenu-item'>

                <>
                    <NavLink to="/dashboard/payment/history" className='menu-item-link text-white'>
                        <MenuItem>{!isCollapsed && 'Payment'}</MenuItem>
                    </NavLink>

                </>
            </SubMenu>

        </>
    )
}

export default ManagerMenu