import React from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaLocationDot } from "react-icons/fa6";
import { MdTour } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { IoTrophy } from "react-icons/io5";

const AdminMenu = ({ isCollapsed }) => {
    return (
        <>


            <SubMenu label='Venue ' icon={<FaLocationDot className='menu-icon' />}>
                <NavLink to='/dashboard/addvenue' className='menu-item-link text-white'>
                    <MenuItem > {!isCollapsed && 'Add Venue'}</MenuItem>
                </NavLink>
                <NavLink to='/dashboard/allvenue' className='menu-item-link text-white'>
                    <MenuItem > {!isCollapsed && 'All Venues '}</MenuItem>
                </NavLink>

            </SubMenu>
            <SubMenu label='Division ' icon={<IoTrophy className='menu-icon' />}>
                <NavLink to='/dashboard/addivision' className='menu-item-link text-white'>
                    <MenuItem > {!isCollapsed && 'Add Division'}</MenuItem>
                </NavLink>
                <NavLink to='/dashboard/alldivisions' className='menu-item-link text-white'>
                    <MenuItem > {!isCollapsed && 'All Division '}</MenuItem>
                </NavLink>

            </SubMenu>

            <SubMenu label='Tournament ' icon={<MdTour className='menu-icon' />}>
                <NavLink to='/dashboard/addtournaments' className='menu-item-link text-white'>
                    <MenuItem > {!isCollapsed && 'Add Tournament'}</MenuItem>
                </NavLink>
                <NavLink to='/dashboard/tournaments' className='menu-item-link text-white'>
                    <MenuItem > {!isCollapsed && 'All Tournament'}</MenuItem>
                </NavLink>

            </SubMenu>
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
                    <NavLink to='/dashboard/allpersons' className='menu-item-link text-white'>
                        <MenuItem>{!isCollapsed && 'All Users'}</MenuItem>
                    </NavLink>
                </>
            </SubMenu>
            {/* <SubMenu label="Payment " icon={<MdOutlinePayment className='menu-icon' />} className='submenu-item'>

                <>
                    <NavLink to="/dashboard/payment/history" className='menu-item-link text-white'>
                        <MenuItem>{!isCollapsed && 'Payment History'}</MenuItem>
                    </NavLink>

                </>
            </SubMenu> */}
        </>
    )
}

export default AdminMenu