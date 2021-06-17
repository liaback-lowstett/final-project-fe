import React from 'react'

import './Placeholder.scss'

import managing from '../../assets/managing.png';

const Placeholder = () => {
  return (
    <div className="placeholder">
      <img src={managing} alt="illustraton" />
    </div>
  )
}

export default Placeholder