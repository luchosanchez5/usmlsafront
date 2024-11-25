import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './AdminRoutes.js';
import GlobalRoutes from './GlobalRoutes.js';
import ManagerRoutes from './ManagerRoutes.js';
import PlayerRoutes from './PlayerRoutes.js';
import Co_ManagerRoutes from './Co_ManagerRoutes.js';
import { useSelector } from 'react-redux';

const NavigationRoutes = () => {
    const { user } = useSelector((state) => state.user)
    return (
        <Routes>

            {user?.roles?.includes('ADMIN')&& AdminRoutes}
            {user?.roles?.includes('MANAGER') && ManagerRoutes}
            {user?.roles?.includes('PLAYER') && PlayerRoutes}
            {user?.roles?.includes('CO_MANAGER') && Co_ManagerRoutes}
            {GlobalRoutes}
            <Route path='*' element='' />

        </Routes>
    );
}

export default NavigationRoutes;
