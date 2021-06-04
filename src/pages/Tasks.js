import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import tasks from '../reducers/tasks'
import { BASE_URL } from '../reusables/urls'

const Tasks = () => {
  const [newTask, setNewTask] = useState('')
  const taskItems = useSelector((store) => store.tasks.taskItem)

  const dispatch = useDispatch()

  const fetchTasks = () => {
    const options = {
      method: 'GET'
    }

    fetch(BASE_URL('tasks'), options)
      .then((res) => res.json())
      .then((data) => {
        dispatch(tasks.actions.addTask(data.tasks))
      })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskItem: newTask })
    }

    fetch(BASE_URL('tasks'), options)
      .then((res) => res.json())
      .then((data) => fetchTasks(data))
  }

  return (
    <div>
      <h1>List</h1>
      {taskItems.map((task) => (
        <div key={task._id}>
          <div>{task.taskItem}</div>
        </div>
      ))}
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
};

export default Tasks;
