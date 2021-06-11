import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import tasks from '../../reducers/tasks';
import { API_URL } from '../../reusables/urls';

import './TaskInput.css'

const TaskInput = () => {
  const [newTask, setNewTask] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const errors = useSelector((store) => store.tasks.errors)

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskItem: newTask,
        username
      })
    };

    fetch(API_URL('tasks'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(tasks.actions.addNewTask(data.newTask))
            dispatch(tasks.actions.setErrors(null))
          })
        } else {
          dispatch(tasks.actions.setErrors(data)) // errors i return skiten
        }
      });
    setNewTask('')
  };

  return (
    <div>
      <form className="input-container" onSubmit={onFormSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />
        <button className="input-button" type="submit">
          Add task
        </button>
      </form>
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default TaskInput;
