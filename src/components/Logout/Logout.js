import React from 'react';
import { useDispatch, batch } from 'react-redux';

import user from '../../reducers/user';
import './Logout.scss'

import signout from '../../assets/signout.png';

const Logout = () => {
  const dispatch = useDispatch();

  const onButtonClick = () => {
    batch(() => {
      localStorage.removeItem('user');
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
    });
  };
  return (
    <div className="logout">
      <button type="button" onClick={onButtonClick}>
        <img src={signout} alt="sign out" />
      </button>
    </div>
  );
};

export default Logout;
