/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import remove from '../../assets/remove.png';
import edit from '../../assets/edit.png';

import './List.scss';

const List = () => {
  // const { _id } = useParams()
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

  // const onClickDelete = () => {
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: accessToken,
  //       'Content-Type': 'application/json'
  //     }
  //   }

  //   fetch(`http://localhost:8085/lists/${_id}`, options)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         console.log(data)
  //         batch(() => {
  //           dispatch(lists.actions.removeList(data.deletedList._id))
  //           dispatch(lists.actions.setErrors(null))
  //         })
  //       } else {
  //         dispatch(lists.actions.setErrors(data))
  //       }
  //     })
  // }

  return (
    <div className="list">
      {list.map((item) => (
        <div className="list-content" key={item._id}>
          <Link to={`/list/${item._id}`}>
            <p>{item.listName}</p>
          </Link>
          <button type="button">
            <img src={edit} alt="edit" />
            <img src={remove} alt="remove" />
          </button>
        </div>
      ))}
      {errors && <p>{errors.message}</p>}
    </div>
  );
};

export default List;
