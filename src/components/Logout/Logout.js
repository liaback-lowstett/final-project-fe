import React from 'react'
import { useDispatch, batch } from 'react-redux'

import user from '../../reducers/user'

const Logout = () => {
  const dispatch = useDispatch()

  const onButtonClick = () => {
    batch(() => {
      // remove user from localStorage
      localStorage.removeItem('user')
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null))
    })
  }
  return (
    <button type="button" onClick={onButtonClick}>Logout</button>
  )
}

export default Logout