import React from 'react';

import Logout from '../../components/Logout/Logout'
import HomeHeading from '../../components/HomeHeading/HomeHeading'
import ListDashboard from '../../components/ListDashboard/ListDashboard'
import CreateList from '../../components/CreateList/CreateList'
// import Footer from '../../components/Footer/Footer'

import './Home.scss'

const Home = () => {
  return (
    <div className="home">
      <Logout />
      <HomeHeading />
      <CreateList />
      <ListDashboard />
      {/* <Footer /> */}
    </div>
  )
}

export default Home;
