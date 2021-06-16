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
  const currentList = allLists.find((list) => list._id === id);
  // console.log('currentList', currentList);
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
      fetch(API_URL('tasks'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(lists.actions.setTasks(data.allTasks));
              dispatch(lists.actions.setErrors(null));
            });
          } else {
            dispatch(lists.actions.setErrors(data)); // glöm inte lägga till error som useselctor
          }
        });
    }
  }, [accessToken, dispatch]);

  return (
    <div className="task-list">
      {currentList?.tasks.map((task) => {
        return task ? (
          <div className="task" key={task._id}>
            <p>{task.taskItem}</p>
          </div>
        ) : null;
      })}
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default TaskList;
