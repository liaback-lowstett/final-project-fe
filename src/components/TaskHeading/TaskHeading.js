import React from 'react'

import './TaskHeading.scss'

const TaskHeading = () => {
  return (
    <>
      <h1 className="heading">I’m gonna move to</h1>
      <form>
        <input
          className="input-filed"
          type="text"
          placeholder="adress/ place" />
      </form>
    </>
  )
}

export default TaskHeading