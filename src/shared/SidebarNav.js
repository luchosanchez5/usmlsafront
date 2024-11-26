import React, {  useEffect, useContext } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import '../assets/css/sidebar-nav.css';
import AdminMenu from '../components/Menu/AdminMenu';
import ManagerMenu from '../components/Menu/ManagerMenu';
import PlayerMenu from '../components/Menu/PlayerMenu';
import CoManager from '../components/Menu/CoManager';
import { GlobalInfo } from '../App';
import { CgProfile } from "react-icons/cg";

const SidebarNav = () => {

    const { user } = useSelector((state) => state.user);
    const { isCollapsed, setIsCollapsed } = useContext(GlobalInfo)
    const handleResize = () => {
        if (window.innerWidth <= 1000) {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        const elements = document.getElementsByClassName('sc-kDvujY hUHiae expand-icon');
        for (const element of elements) {
            if (isCollapsed) {
                element.classList.add('d-none');
            } else {
                element.classList.remove('d-none');
            }
        }
    }, [isCollapsed]);

    return (
        <Sidebar collapsed={isCollapsed} collapsedWidth='70px' backgroundColor="#151515" className='main-navigation'>
            {/* Sidebar Logo */}
            <Image
                src='https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png'
                className='py-3 ps-2'
                width={isCollapsed ? 50 : 200}
            />
            <Menu className='mt-3'>
    
                {(user?.role === 'ADMIN' || user?.roles?.includes('ADMIN')) && <AdminMenu isCollapsed={isCollapsed} />}
                {(user?.role === 'MANAGER' || user?.roles?.includes('MANAGER')) && <ManagerMenu isCollapsed={isCollapsed} />}
                {(user?.role === 'PLAYER' || user?.roles?.includes('PLAYER')) && <PlayerMenu isCollapsed={isCollapsed} />}

                {(user?.role === 'CO_MANAGER' || user?.roles?.includes('CO_MANAGER')) && <CoManager isCollapsed={isCollapsed} />}


                <SubMenu label={!isCollapsed && 'Setting'} icon={<IoSettingsOutline className='menu-icon' />} className='submenu-item'>
                    <NavLink to="/dashboard/user/setting" className='menu-item-link text-white'>
                        <MenuItem className='text-white' >{isCollapsed ? <CgProfile className='menu-icon' /> : 'Profile'}</MenuItem>
                    </NavLink>
                    <NavLink to="/dashboard/user/change-password" className='menu-item-link text-white'>
                        <MenuItem  >{!isCollapsed && 'Change Password'}</MenuItem>
                    </NavLink>

                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default SidebarNav;
