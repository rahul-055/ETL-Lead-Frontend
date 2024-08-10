import React, { useState } from 'react';
import { MdDashboard, MdLeaderboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    
    return (
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <h2>ETL Hive</h2>
            </div>
            <ul class="sidebar-nav">
                <li  className={location.pathname === '/' ? "active" : null}>
                    <Link to="/"><span className='lef_nav_i'><MdDashboard /></span>Dashboard</Link>
                </li>
                <li className={location.pathname !== '/' ? "active" : null}>
                    <Link to="/listlead"><span className='lef_nav_i'><MdLeaderboard /></span>Lead</Link>
                </li>

            </ul>
        </aside >
    );
};

export default Sidebar;