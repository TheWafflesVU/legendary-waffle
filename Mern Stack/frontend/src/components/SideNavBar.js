import React, {useState} from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import './SideNavBar.css'

import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import MarkunreadTwoToneIcon from '@mui/icons-material/MarkunreadTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import {useLocation, useNavigate} from "react-router-dom";

const SideNavBar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    }

    const isActive = (path) => location.pathname.includes(path);

    return (
        <Sidebar collapsed={collapsed} className="pro-sidebar">
            <Menu>
                <MenuItem
                    icon={<MenuIcon />}
                    onClick={toggleSidebar}
                    style={{ textAlign: "center" }}
                />

                <div className="nav-icons">

                    <MenuItem
                        icon={<GroupsTwoToneIcon fontSize="large"/>}
                        onClick={() => navigate("/homepage")}
                        className={isActive('/homepage') ? 'active' : ''}
                    >
                        Home
                    </MenuItem>

                    <MenuItem
                        icon={<AddBoxTwoToneIcon fontSize="large"/>}
                        onClick={() => navigate("/create")}
                        className={isActive('/create') ? 'active' : ''}>
                        My Project
                    </MenuItem>

                    <MenuItem
                        icon={<MarkunreadTwoToneIcon fontSize="large"/>}
                        onClick={() => navigate("/chatroom")}
                        className={isActive('/chatroom') ? 'active' : ''}>
                        Inbox
                    </MenuItem>

                    <MenuItem
                        icon={<PermIdentityTwoToneIcon fontSize="large"/> }
                        onClick={() => navigate("/profile")}
                        className={isActive('/profile') ? 'active' : ''}>
                        Profile
                    </MenuItem>

                </div>

            </Menu>
        </Sidebar>
    );
};

export default SideNavBar;
