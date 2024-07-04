import React, { useState } from 'react';
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import './SideNavBar.css';

import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import MarkunreadTwoToneIcon from '@mui/icons-material/MarkunreadTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import { Link, useLocation } from 'react-router-dom';

const SideNavBar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const isActive = (path) => location.pathname.includes(path);



    return (

        <div className="sidebar-container">

            <Sidebar collapsed={collapsed} style={{

                height: "100vh",
                backgroundColor: "#FEC500",

            }} >
                <Menu
                    menuItemStyles={{
                        root: {
                            [`&.ps-active`]: {
                                backgroundColor: 'white',
                                fontWeight: 'bold',
                            }
                        },
                    }}
                >
                    <MenuItem
                        icon={<MenuIcon fontSize="medium" />}
                        onClick={toggleSidebar}
                        style={{ textAlign: 'center' }}
                    />

                    <div className="nav-icons">
                        <MenuItem
                            icon={<GroupsTwoToneIcon fontSize="large" />}
                            component={<Link to="/homepage" />}
                            active={isActive("/homepage")}
                        >
                            Home
                        </MenuItem>

                        <MenuItem
                            icon={<AddBoxTwoToneIcon fontSize="large" />}
                            component={<Link to="/create" />}
                            active={isActive("/create")}
                        >
                            My Project
                        </MenuItem>

                        <MenuItem
                            icon={<MarkunreadTwoToneIcon fontSize="large" />}
                            component={<Link to="/chatroom" />}
                            active={isActive("/chatroom")}
                        >
                            Inbox
                        </MenuItem>

                        <MenuItem
                            icon={<PermIdentityTwoToneIcon fontSize="large" />}
                            component={<Link to="/profile" />}
                            active={isActive("/profile")}
                        >
                            Profile
                        </MenuItem>
                    </div>
                </Menu>
            </Sidebar>

        </div>

    );
};

export default SideNavBar;
