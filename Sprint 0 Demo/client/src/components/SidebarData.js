import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const SidebarData = [
    {
        title: "Home",
        icon: <DashboardIcon />,
        path: "/home",
    },

    {
        title: "Profile",
        icon: <AccountCircleIcon />,
        path: "/profile",
    },

    {
        title: "Chatbox",
        icon: <ChatIcon />,
        path: "/Chatbox",
    }
];