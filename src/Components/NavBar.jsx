import React from 'react';
import Logo from '../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import Dashboard from '../assets/dashboard.svg';
import Traffic from '../assets/traffic.svg';
import Incident from '../assets/incident.svg';
import Report from '../assets/report.svg';
import Emergency from '../assets/emergency.svg';
import Feedback from '../assets/feedback.svg';
import Settings from '../assets/settings.svg';
import Profile from '../assets/profile.svg';

const NavBar = () => {
  return (
    <div className='Navbar p-4 flex flex-col justify-between bg-gray-200'>
        <div>
            <img src={Logo} alt="logo" />
        </div>
        <div className='flex flex-col text-lg gap-5'>
          
          <NavLink to="/home" className={({ isActive }) => (isActive ? "border border-gray-500 font-semibold" : "hover:underline hover:text-blue-500")}>
            <div className='flex gap-1 px-1'>
              <img src={Dashboard} alt="" />
              <span>Dashboard</span>
            </div>
          </NavLink>
          <NavLink to="/traffic" className={({ isActive }) => (isActive ? "border border-gray-500 font-semibold px-2" : "hover:underline hover:text-blue-500")}>
            <div className='flex gap-1 px-1'>
              <img src={Traffic} alt="" />
              <span>Traffic Prediction</span>
            </div>
          </NavLink>
          <NavLink to="/incident" className={({ isActive }) => (isActive ? "border border-gray-500 font-semibold px-2" : "hover:underline hover:text-blue-500")}>
            
            <div className='flex gap-1 px-1'>
              <img src={Incident} alt="" />
              <span>Incident Alerts</span>
            </div>
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => (isActive ? "border border-gray-500 font-semibold px-2" : "hover:underline hover:text-blue-500")}>
            <div className='flex gap-1 px-1'>
              <img src={Report} alt="" />
              <span>Reports & Analytics</span>
            </div>
          </NavLink>
          <NavLink to="/emergency" className={({ isActive }) => (isActive ? "border border-gray-500 font-semibold px-2" : "hover:underline hover:text-blue-500")}> 
            <div className='flex gap-1 px-1'>
              <img src={Emergency} alt="" />
              <span>Emergency services</span>
            </div>
          </NavLink>
          <NavLink to="/feedback" className={({ isActive }) => (isActive ? "border border-gray-500 font-semibold px-2" : "hover:underline hover:text-blue-500")}>
            <div className='flex gap-1 px-1'>
              <img src={Feedback} alt="" />
              <span>Feedback & Help</span>
            </div>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "border border-gray-500 font-semibold px-2" : "hover:underline hover:text-blue-500")}>
            <div className='flex gap-1 px-1'>
              <img src={Settings} alt="" />
              <span>Settings</span>
            </div>
          </NavLink>
        </div>
        <div className='mb-12 mt-12'></div>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "border border-gray-500 rounded-full font-semibold px-2" : "hover:underline hover:text-blue-500")}>
            <div className='flex gap-1 px-2 py-3'>
              <img src={Profile} alt="" className='w-8'/>
              <span className='text-xl font-semibold'>Profile</span>
            </div>
          </NavLink>
    </div>
  )
}

export default NavBar;