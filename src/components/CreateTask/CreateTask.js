import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import './CreateTask.scss'

const CreateTask = () => {
  const { id } = useParams();
  const [newTask, setNewTask] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
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
        data: {
          taskTitle: newTask,
          complete: false
        },
        listId: id
      })
    };

    fetch(API_URL('tasks'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            console.log('newtask', data.newTask);
            dispatch(lists.actions.updateListWithCurrent(data.newTask))
            dispatch(lists.actions.setErrors(null))
          })
        } else {
          dispatch(lists.actions.setErrors(data))
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

export default CreateTask;
