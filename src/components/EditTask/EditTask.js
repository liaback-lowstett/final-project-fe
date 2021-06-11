/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useParams } from 'react-router-dom'

import tasks from '../reducers/tasks'

const EditTask = () => {
  const accessToken = useSelector((store) => store.user.accessToken)

  const { _id } = useParams()
  const [newTask, setNewTask] = useState('')
  const [updatedTask, setUpdatedTask] = useState(false)

  const dispatch = useDispatch()

  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: newTask
      })
    }

    fetch(`http://localhost:80784/tasks/${_id}`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(tasks.actions.editTask(data._id))
            dispatch(tasks.actions.setErrors(null))
            setUpdatedTask(true)
          })
        } else {
          dispatch(tasks.actions.setErrors(data))
        }
      })
  }

  return (
    <>
      {!updatedTask && (
        <form className="input-container" onSubmit={onFormSubmit}>
          <input
            className="input-field"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)} />
          <button className="input-button" type="submit">
          Update task
          </button>
        </form>
      )}
    </>
  )
}
export default EditTask