import React from 'react'
import { Link } from 'react-router-dom';

import back from '../../assets/right_arrow.png';

import './Nav.scss'

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/home">
        <img src={back} alt="go back" />
      </Link>
    </div>
  )
}
export default Nav