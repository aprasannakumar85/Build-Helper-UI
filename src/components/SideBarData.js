import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        index: 1,
        title: 'About',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        index: 2,
        title: 'WebAPIs',
        path: '/webAPI',
        icon: <IoIcons.IoIosAirplane/>,
        cName: 'nav-text'
    },
    {
        index: 3,
        title: 'PowerShell',
        path: '/powerShell',
        icon: <FaIcons.FaShieldAlt/>,
        cName: 'nav-text'
    }
]