/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import remove from '../../assets/remove.png';

import './TaskList.scss';

const TaskList = ({ tasks }) => {
  const { id } = useParams();
  const accessToken = useSelector((store) => store.user.accessToken);
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

  // REMOVE TASK

  // const onClickDelete = () => {

  //   const options = {
  //     method: 'PATCH',
  //     headers: {
  //       Authorization: accessToken,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       data: {
  //         taskItem: removeTask,
  //         complete: false
  //       },
  //       listId: id
  //     })
  //   };

  //   fetch(API_URL('tasks'), options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         console.log('data succes', data)
  //         batch(() => {
  //           // console.log('data.list', data.list)
  //           // console.log('DATA;ADD', data);
  //           dispatch(lists.actions.updateListWithCurrent(data.removeTask)) // something here
  //           dispatch(lists.actions.setErrors(null))
  //         })
  //       } else {
  //         dispatch(lists.actions.setErrors(data)) // errors i return
  //       }
  //     });
  //   setRemoveTask('')
  // };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <div className="checkbox-container">
            <input
              className="checkbox"
              type="checkbox"
              /* checked={toggle}
              onChange={() => setToggle(true)} */ />
            <p className="checkbox-text">{task.taskItem}</p>
          </div>
          <button
            type="button">
            {/* onClick={() => onClickDelete(item._id)} */}
            <img src={remove} alt="remove" />
          </button>
        </div>
      ))}
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default TaskList;
