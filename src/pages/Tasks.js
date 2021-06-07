import React from 'react';

import TaskHeading from '../components/TaskHeading/TaskHeading'
import TaskInput from '../components/TaskInput/TaskInput'
import TaskList from '../components/TaskList/TaskList'

const Tasks = () => {
  return (
    <>
      <TaskHeading />
      <TaskInput />
      <TaskList />
    </>
  )
}
export default Tasks
