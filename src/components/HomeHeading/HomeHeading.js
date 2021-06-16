import React from 'react'

import './HomeHeading.scss'

const HomeHeading = () => {
  return (
    <div className="home-heading">
      <h1>I’m gonna move to</h1>
      <form>
        <input
          className="input-filed"
          type="text"
          placeholder="adress/ place" />
      </form>
    </div>
  )
}

export default HomeHeading