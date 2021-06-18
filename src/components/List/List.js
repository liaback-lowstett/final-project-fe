/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import remove from '../../assets/remove.png';
import edit from '../../assets/edit.png';

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

  const onClickDelete = (listId) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      }
    }

    const options2 = {
      method: 'GET',
      headers: {
        Authorization: accessToken
      }
    }

    fetch(`http://localhost:8086/lists/${listId}`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data)
          batch(() => {
            dispatch(lists.actions.removeList(data.deletedList))
            dispatch(lists.actions.setErrors(null))
          })
        } else {
          dispatch(lists.actions.setErrors(data))
        }
      })
    return fetch(API_URL('lists'), options2)
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

  return (
    <div className="list">
      {list.map((item) => (
        <div className="list-content" key={item._id}>
          <Link to={`/list/${item._id}`}>
            <p>{item.listName}</p>
          </Link>
          <div className="button-container">
            <button
              type="button"
              onClick={() => onClickDelete(item._id)}>
              <img src={remove} alt="remove" />
            </button>
            <button type="button">
              <img src={edit} alt="edit" />
            </button>
          </div>
        </div>
      ))}
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default List;
