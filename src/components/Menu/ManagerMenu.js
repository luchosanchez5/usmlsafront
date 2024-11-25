import React from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { NavLink } from 'react-router-dom';
import { FaUsers } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { FaThList } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
const ManagerMenu = ({ isCollapsed }) => {
    return (
        <>



            <SubMenu label={!isCollapsed && "Team "} icon={<RiTeamFill className='menu-icon' />} className='submenu-item'>
                <NavLink to="/dashboard/allteams" className='menu-item-link text-white'>
                    <MenuItem>{isCollapsed ? <FaThList className='menu-icon' />:"All Teams"}</MenuItem>
                </NavLink>


                <NavLink to={!isCollapsed && "/dashboard/addteams"} className='menu-item-link text-white'>
                    <MenuItem>{isCollapsed ? <MdAddBox className='menu-icon' />:'Add Team'}</MenuItem>
                </NavLink>
            </SubMenu>
            <SubMenu label={!isCollapsed && "User "} icon={<FaUsers className='menu-icon' />} className='submenu-item'>

                <>
                    <NavLink to="/dashboard/addperson" className='menu-item-link text-white'>
                        <MenuItem>{isCollapsed ? <MdAddBox className='menu-icon' /> :'Add Users'}  </MenuItem>
                    </NavLink>

                </>
            </SubMenu>
            <SubMenu label={!isCollapsed && "Payment"}icon={<MdOutlinePayment className='menu-icon' />} className='submenu-item'>

                <>
                    <NavLink to="/dashboard/payment/history" className='menu-item-link text-white'>
                        <MenuItem>{isCollapsed ? <MdOutlinePayment className='menu-icon' /> :"Payment History"}  </MenuItem>
                    </NavLink>

                </>
            </SubMenu>

        </>
    )
}

export default ManagerMenu