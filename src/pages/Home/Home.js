import React from 'react';

import Logout from '../../components/Logout/Logout'
import List from '../../components/List/List'
import CreateList from '../../components/CreateList/CreateList'

import './Home.scss'

const Home = () => {
  return (
    <div className="home">
      <Logout />
      <h1>Your lists
      </h1>
      <CreateList />
      <List />
    </div>
  )
}

export default Home;
