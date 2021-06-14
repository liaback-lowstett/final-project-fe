/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './Register.scss'

import user from '../../reducers/user';
import { API_URL } from '../../reusables/urls';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken)
  const error = useSelector((store) => store.user.errors)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/tasks')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log(user.actions)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.username)
        if (data.success) {
          console.log(data)
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            // add username
            dispatch(user.actions.setErrors(null))

            localStorage.setItem('user', JSON.stringify({
              username: data.username,
              accessToken: data.accessToken
            }))
          })
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }

  return (
    <div className="register">
      <h1>Register here</h1>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        {error && <p>{error.message}</p>}
        <button
          type="submit"
          onClick={() => setMode('register')}>
          Register
        </button>
      </form>
      <Link to="/signin">
        <button>sign in</button>
      </Link>
    </div>
  );
};

export default Register;
