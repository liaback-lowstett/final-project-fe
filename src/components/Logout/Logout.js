import React from 'react';
import { useDispatch, batch } from 'react-redux';

import user from '../../reducers/user';
import './Logout.scss'

const Logout = () => {
  const dispatch = useDispatch();

  const onButtonClick = () => {
    batch(() => {
      // remove user from localStorage
      localStorage.removeItem('user');
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
    });
  };
  return (
    <div className="logout">
      <button type="button" onClick={onButtonClick}>
        Sign out
      </button>
    </div>
  );
};

export default Logout;
