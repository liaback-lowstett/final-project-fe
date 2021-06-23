import React from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

import user from '../../reducers/user';
import './Logout.scss'

import signout from '../../assets/signout.png';
import share from '../../assets/share.png';

const Logout = () => {
  const username = useSelector((store) => store.user.username)
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
      <p>{username}</p>
      <img src={share} alt="share icon" />
      <button type="button" onClick={onButtonClick}>
        <img src={signout} alt="sign out" />
      </button>
    </div>
  );
};

export default Logout;
