import React from 'react';

import Logout from '../../components/Logout/Logout'
import HomeHeading from '../../components/HomeHeading/HomeHeading'
import List from '../../components/List/List'
import CreateList from '../../components/CreateList/CreateList'

import './Home.scss'

const Home = () => {
  return (
    <div className="home">
      <Logout />
      <HomeHeading />
      <CreateList />
      <List />
    </div>
  )
}

export default Home;
