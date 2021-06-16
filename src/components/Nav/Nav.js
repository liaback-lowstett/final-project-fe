import React from 'react'
import { Link } from 'react-router-dom';

import './Nav.scss'

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/home">
        <p>Back</p>
      </Link>
    </div>
  )
}
export default Nav