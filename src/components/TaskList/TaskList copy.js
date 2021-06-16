/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import tasks from '../../reducers/tasks'
import { API_URL } from '../../reusables/urls'

import './TaskList.scss'

const TaskList = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const taskItemList = useSelector((store) => store.tasks.taskItem)
  const errors = useSelector((store) => store.tasks.errors)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/signin')
    }
  }, [accessToken, history]);

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL('tasks'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(tasks.actions.setTasks(data.allTasks));
              dispatch(tasks.actions.setErrors(null));
            });
          } else {
            dispatch(tasks.actions.setErrors(data)); // glöm inte lägga till error som useselctor
          }
        })
    }
  }, [accessToken, dispatch])

  return (
    <div className="task-list">
      {taskItemList.map((item) => (
        <div className="task" key={item._id}>
          <p>{item.taskItem}</p>
        </div>
      ))}
      {errors && <p>{errors.message}</p>}
    </div>
  )
};

export default TaskList;