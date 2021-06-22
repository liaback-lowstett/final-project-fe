/* eslint-disable no-underscore-dangle */

import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import ListHeading from '../../components/ListHeading/ListHeading'
import CreateTask from '../../components/CreateTask/CreateTask'
import TaskList from '../../components/TaskList/TaskList'
import Logout from '../../components/Logout/Logout'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'

import './Tasks.scss'

const Tasks = () => {
  const { id } = useParams();

  const accessToken = useSelector((store) => store.user.accessToken);
  const listArray = useSelector((store) => store.lists.listTitle);
  const listById = listArray.find((list) => list._id === id)

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
      fetch(API_URL('lists'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(lists.actions.setLists(data.allLists));
              dispatch(lists.actions.setErrors(null));
            });
          } else {
            dispatch(lists.actions.setErrors(data)); // glöm inte lägga till error som useselctor
          }
        });
    }
  }, [accessToken, dispatch]);

  return (
    <div className="tasks">
      <div className="top-nav">
        <Nav />
        <Logout />
      </div>
      {listById && (
        <div className="content">
          <ListHeading heading={listById.listTitle} />
          <CreateTask />
          <TaskList tasks={listById.tasks} />
        </div>)}
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}
export default Tasks
