/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import remove from '../../assets/remove.png';

import './TaskDashboard.scss';

const TaskDashboard = ({ tasks }) => {
  const { id } = useParams();
  const accessToken = useSelector((store) => store.user.accessToken);
  const errors = useSelector((store) => store.lists.errors);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push('/signin');
    }
  }, [accessToken, history]);

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken
        }
      };
      fetch(API_URL(`tasks/${id}`), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(lists.actions.setTasks(data.tasks));
              dispatch(lists.actions.setErrors(null));
            });
          } else {
            dispatch(lists.actions.setErrors(data));
          }
        });
    }
  }, [accessToken, dispatch, id]);

  const onTaskUpdate = (listId, taskId, complete) => {
    if (accessToken) {
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          listId,
          taskId,
          complete
        })
      };
      fetch(API_URL('tasks/update'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(lists.actions.setErrors(null));
            });
          } else {
            dispatch(lists.actions.setErrors(data));
          }
        });
    }
  }

  const onTaskDelete = (listId, taskId) => {
    if (accessToken) {
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          listId,
          taskId
        })
      };
      fetch(API_URL('tasks/delete'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(lists.actions.updateListWithCurrent(data.removeTask))
              dispatch(lists.actions.setErrors(null));
            });
          } else {
            dispatch(lists.actions.setErrors(data));
          }
        });
    }
  }

  return (
    <div className="task-dashboard">
      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <div className="checkbox-container">
            <input
              className="checkbox"
              type="checkbox"
              defaultChecked={task.complete}
              onChange={() => {
                onTaskUpdate(id, task._id, !task.complete)
              }} />
            <p className="checkbox-text">{task.taskTitle}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              console.log('COMPLETE');
              onTaskDelete(id, task._id)
            }}>
            <img src={remove} alt="remove" />
          </button>
        </div>
      ))}
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default TaskDashboard;
