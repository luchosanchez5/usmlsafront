import React from "react";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { FaUsers, FaLocationDot } from "react-icons/fa6";
import { MdOutlinePayment, MdTour } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { IoTrophy } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";

const AdminMenu = ({ isCollapsed }) => {
  return (
    <>
      <NavLink to="/dashboard" className="menu-item-link text-white">
        <MenuItem icon={<AiOutlineDashboard className="menu-icon" />}>
          {" "}
          Dashboard
        </MenuItem>
      </NavLink>

      <SubMenu
        label={!isCollapsed && "Venue "}
        icon={<FaLocationDot className="menu-icon" />}
      >
        <NavLink to="/dashboard/allvenue" className="menu-item-link text-white">
          <MenuItem>
            {" "}
            {isCollapsed ? (
              <FaThList className="menu-icon" />
            ) : (
              "All Venues"
            )}{" "}
          </MenuItem>
        </NavLink>
        <NavLink
          to="/dashboard/addvenue"
          className="menu-item-link text-white"
          activeClassName="active-link"
        >
          <MenuItem>
            {isCollapsed ? <MdAddBox className="menu-icon" /> : " Add Venue"}{" "}
          </MenuItem>
        </NavLink>
      </SubMenu>
      <SubMenu
        label={!isCollapsed && "Payment "}
        icon={<MdOutlinePayment className="menu-icon" />}
      >
        <NavLink
          to="/dashboard/allpaymenthistory"
          className="menu-item-link text-white"
        >
          <MenuItem>
            {" "}
            {isCollapsed ? (
              <FaThList className="menu-icon" />
            ) : (
              "Payments History"
            )}{" "}
          </MenuItem>
        </NavLink>
      </SubMenu>

      <SubMenu
        label={!isCollapsed && "Tournament "}
        icon={<MdTour className="menu-icon" />}
      >
        <NavLink
          to="/dashboard/alltournaments"
          className="menu-item-link text-white"
        >
          <MenuItem>
            {" "}
            {isCollapsed ? (
              <FaThList className="menu-icon" />
            ) : (
              "All Tournament"
            )}
          </MenuItem>
        </NavLink>
        <NavLink
          to="/dashboard/addtournaments"
          className="menu-item-link text-white"
        >
          <MenuItem>
            {" "}
            {isCollapsed ? (
              <MdAddBox className="menu-icon" />
            ) : (
              "Add Tournament"
            )}
          </MenuItem>
        </NavLink>
      </SubMenu>
      <SubMenu
        label={!isCollapsed && "Division "}
        icon={<IoTrophy className="menu-icon" />}
      >
        <NavLink
          to="/dashboard/alldivisions"
          className="menu-item-link text-white"
        >
          <MenuItem>
            {isCollapsed ? <FaThList className="menu-icon" /> : "All Division"}{" "}
          </MenuItem>
        </NavLink>
        <NavLink
          to="/dashboard/addivision"
          className="menu-item-link text-white"
        >
          <MenuItem>
            {isCollapsed ? <MdAddBox className="menu-icon" /> : "Add Division"}
          </MenuItem>
        </NavLink>
      </SubMenu>
      <SubMenu
        label="Team "
        icon={<RiTeamFill className="menu-icon" />}
        className="submenu-item"
      >
        <NavLink to="/dashboard/allteams" className="menu-item-link text-white">
          <MenuItem>
            {isCollapsed ? <FaThList className="menu-icon" /> : "All Teams"}
          </MenuItem>
        </NavLink>
        <NavLink to="/dashboard/addteams" className="menu-item-link text-white">
          <MenuItem>
            {isCollapsed ? <MdAddBox className="menu-icon" /> : "Add Team"}
          </MenuItem>
        </NavLink>
      </SubMenu>
      <SubMenu
        label="User "
        icon={<FaUsers className="menu-icon" />}
        className="submenu-item"
      >
        <NavLink
          to="/dashboard/allpersons"
          className="menu-item-link text-white"
        >
          <MenuItem>
            {isCollapsed ? <FaThList className="menu-icon" /> : "All Users"}
          </MenuItem>
        </NavLink>
        <NavLink
          to="/dashboard/addperson"
          className="menu-item-link text-white"
        >
          <MenuItem>
            {isCollapsed ? <MdAddBox className="menu-icon" /> : "Add Users"}
          </MenuItem>
        </NavLink>
      </SubMenu>
    </>
  );
};

export default AdminMenu;
