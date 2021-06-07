import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import tasks from '../reducers/tasks';
import { BASE_URL } from '../reusables/urls'

const TaskInput = () => {
  const [newTask, setNewTask] = useState('')

  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ taskItem: newTask })
    }

    fetch(BASE_URL, options)
      .then((res) => res.json())
      .then((data) => dispatch(tasks.actions.addNewTask(data)))
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit">Add task</button>
      </form>
    </div>
  )
};

export default TaskInput;
