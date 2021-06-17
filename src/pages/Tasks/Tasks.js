import React from 'react';
// import { useParams } from 'react-router-dom'

import TaskHeading from '../../components/TaskHeading/TaskHeading'
import TaskInput from '../../components/TaskInput/TaskInput'
import TaskList from '../../components/TaskList/TaskList'
import Logout from '../../components/Logout/Logout'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'

import './Tasks.scss'

const Tasks = () => {
  // const { id } = useParams()
  return (
    <div className="tasks">
      <div className="top-nav">
        <Nav />
        <Logout />
      </div>
      <div className="content">
        <TaskHeading />
        <TaskInput />
        <TaskList />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}
export default Tasks
