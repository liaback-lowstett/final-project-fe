/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import './List.scss';

const List = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const list = useSelector((store) => store.lists.list);
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
    <div className="list">
      {list.map((item) => (
        <Link to={`/list/${item._id}`} key={item._id}>
          <div className="list-content">
            <p>{item.listName}</p>
          </div>
        </Link>
      ))}
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default List;
