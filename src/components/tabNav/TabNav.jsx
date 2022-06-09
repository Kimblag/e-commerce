import { Tabs, Tab, AppBar } from '@material-ui/core';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Profile from '../../pages/Profile';
import UserOrders from '../../pages/UserOrders';
import BreadCrumbs from '../breadcrumb/BreadCrumbs';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import NewsLetter from '../newsletter/Newsletter';

const TabNav = () => {
    const [selectedTab, setSelectedTab] = useState(0)

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }
    const location = useLocation()
    const {pathname } = location

  return (
      <>
      <Navbar />
      <BreadCrumbs pathname={pathname}  />

    <AppBar style={{background: "#c4a4f9"}} position='static'>
        <Tabs value={selectedTab} onChange={handleChange} >
            <Tab label="Profile" />
            <Tab label="My Orders" />
        </Tabs>
    </AppBar>
    {selectedTab === 0 && <Profile />}
    {selectedTab === 1 && <UserOrders />}
    <NewsLetter />
      <Footer />
      </>
  )
}

export default TabNav