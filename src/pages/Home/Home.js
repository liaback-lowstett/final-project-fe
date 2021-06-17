import React from 'react';

// import { useSelector } from 'react-redux';

import Logout from '../../components/Logout/Logout'
import HomeHeading from '../../components/HomeHeading/HomeHeading'
import List from '../../components/List/List'
import CreateList from '../../components/CreateList/CreateList'
import Footer from '../../components/Footer/Footer'
// import Placeholder from '../../components/Placeholder/Placeholder'

import './Home.scss'

const Home = () => {
  // const listLength = useSelector((store) => store.lists.list.length)

  return (
    <div className="home">
      <Logout />
      <HomeHeading />
      <CreateList />
      <List />
      <Footer />
    </div>
  )
}

export default Home;

// {listLength === 0 ? <Placeholder /> : <List />}
