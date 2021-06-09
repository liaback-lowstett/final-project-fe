/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch} from 'react-redux'
import { Link, useHistory } from 'react-router-dom';

import user from '../reducers/user'
import { API_URL } from '../reusables/urls'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(null);

  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (accessToken) {
      history.push('/tasks')
    }
  }, [accessToken, history])

  const onFormSubmit = e => {
    e.prevent.default()

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
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
          })
        }
      })
  }
  return (
    <>
      <h1>Registrer here</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button
          type="submit"
          onClick={() => setMode('register')}>
          Register
        </button>
      </form>
      <Link to="/signin">
        <button>Sign in</button>
      </Link>
    </>
  );
};

export default Register;
