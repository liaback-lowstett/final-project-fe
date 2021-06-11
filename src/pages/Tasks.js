import React from 'react';
import { useDispatch, batch } from 'react-redux'

import user from '../reducers/user'
import TaskHeading from '../components/TaskHeading/TaskHeading'
import TaskInput from '../components/TaskInput/TaskInput'
import TaskList from '../components/TaskList/TaskList'

const Tasks = () => {
  const dispatch = useDispatch()

  const onButtonClick = () => {
    batch(() => {
      // remove user from localStorage
      localStorage.removeItem('user')
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null))
    })
  }
  return (
    <>
      <TaskHeading />
      <TaskInput />
      <TaskList />
      <button type="button" onClick={onButtonClick}>Logout</button>
    </>
  )
}
export default Tasks
