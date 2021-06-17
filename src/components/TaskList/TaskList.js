/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import './TaskList.scss';

const TaskList = () => {
  const { id } = useParams();

  const accessToken = useSelector((store) => store.user.accessToken);
  const allLists = useSelector((store) => store.lists.list);
  const errors = useSelector((store) => store.tasks.errors);

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
          // console.log('data tasks', data)
          if (data.success) {
            batch(() => {
              dispatch(lists.actions.setTasks(data.tasks));
              dispatch(lists.actions.setErrors(null));
            });
          } else {
            dispatch(lists.actions.setErrors(data)); // glöm inte lägga till error som useselctor
          }
        });
    }
  }, [accessToken, dispatch, id]);

  return (
    <div className="task-list">
      {allLists.map((task) => (
        <div className="task" key={task._id}>
          <div className="checkbox-container">
            <input
              className="checkbox"
              type="checkbox" />
            <p className="checkbox-text">{task.taskItem}</p>
          </div>
        </div>
      ))}
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default TaskList;
