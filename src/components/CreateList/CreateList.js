import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import lists from '../../reducers/lists';
import { API_URL } from '../../reusables/urls';

import './CreateList.scss'

import add from '../../assets/add.png';

const CreateList = () => {
  const [newList, setNewList] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listTitle: newList,
        collaborators: [username] // username
      })
    };

    fetch(API_URL('lists'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('create list', data)
          batch(() => {
            dispatch(lists.actions.addNewList(data.newList))
            dispatch(lists.actions.setErrors(null))
          })
        } else {
          dispatch(lists.actions.setErrors(data.message))
        }
      });
    setNewList('')
  };

  return (
    <div className="createList">
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="Add new list"
          value={newList}
          onChange={(e) => setNewList(e.target.value)} />
        <button type="submit">
          <img src={add} alt="add" />
        </button>
      </form>
    </div>
  );
};

export default CreateList;
