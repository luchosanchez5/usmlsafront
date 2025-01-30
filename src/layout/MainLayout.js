import React from 'react';

import TopBar from '../shared/TopBar';
import SidebarNav from '../shared/SidebarNav';

const MainLayout = ({ children }) => {
    return (
      <React.Fragment>
        <TopBar />
        <div className="page-container">
          <SidebarNav />
          <main className="main-container">{children}</main>
        </div>
      </React.Fragment>
    );
}

export default MainLayout;
