import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import './TaskInput.scss'

const TaskInput = () => {
  const [newTask, setNewTask] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const errors = useSelector((store) => store.lists.errors)

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tasks: newTask, // taskItem?
        username
      })
    };

    fetch(API_URL('tasks'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('data succes', data.succes)
          batch(() => {
            dispatch(lists.actions.addNewTask(data.newTask)) // something here
            dispatch(lists.actions.setErrors(null))
          })
        } else {
          dispatch(lists.actions.setErrors(data)) // errors i return
        }
      });
    setNewTask('')
  };

  return (
    <div>
      <form className="task-form" onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit">
          +
        </button>
      </form>
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default TaskInput;
