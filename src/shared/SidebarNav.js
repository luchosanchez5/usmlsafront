import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import '../assets/css/sidebar-nav.css';
import AdminMenu from '../components/Menu/AdminMenu';
import ManagerMenu from '../components/Menu/ManagerMenu';
import PlayerMenu from '../components/Menu/PlayerMenu';
import CoManager from '../components/Menu/CoManager';
import { getToken } from '../store/user/actions/actionCreators';

const SidebarNav = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);

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

    return (
        <Sidebar collapsed={isCollapsed} collapsedWidth='70px' backgroundColor="#151515" className='main-navigation'>
            {/* Sidebar Logo */}
            <Image
                src='https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png'
                className='py-3 ps-2'
                width={isCollapsed ? 50 : 200}
            />
            <Menu className='mt-3'>
                {(user?.role === 'ADMIN' || user?.roles?.includes('ADMIN')) && <NavLink to='/dashboard' className='menu-item-link text-white'>
                    <MenuItem icon={<AiOutlineDashboard className='menu-icon' />}>{!isCollapsed && 'Dashboard'}</MenuItem>
                </NavLink>
                }

               <AdminMenu isCollapsed={isCollapsed} />
                {(user?.role === 'MANAGER' || user?.roles?.includes('MANAGER')) && <ManagerMenu isCollapsed={isCollapsed} />}
                {(user?.role === 'PLAYER' || user?.roles?.includes('PLAYER')) && <PlayerMenu isCollapsed={isCollapsed} />}

                {(user?.role === 'CO_MANAGER' || user?.roles?.includes('CO_MANAGER')) && <CoManager isCollapsed={isCollapsed} />}


                <SubMenu label='Setting' icon={<IoSettingsOutline className='menu-icon' />} className='submenu-item'>
                    <NavLink to="/dashboard/user/setting" className='menu-item-link text-white'>
                        <MenuItem  >{!isCollapsed && 'Profile'}</MenuItem>
                    </NavLink>

                </SubMenu>
            </Menu>
        </Sidebar>
    );
};

export default SidebarNav;
