import React from 'react'

import './TaskHeading.scss'

const TaskHeading = () => {
  return (
    <div className="task-heading">
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

export default TaskHeading