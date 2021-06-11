import React from 'react';

import TaskHeading from '../components/TaskHeading/TaskHeading'
import TaskInput from '../components/TaskInput/TaskInput'
import TaskList from '../components/TaskList/TaskList'
import Logout from '../components/Logout/Logout'

const Tasks = () => {

  return (
    <>
      <TaskHeading />
      <TaskInput />
      <TaskList />
      <Logout />
    </>
  )
}
export default Tasks
