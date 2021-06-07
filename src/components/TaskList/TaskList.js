import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import tasks from '../../reducers/tasks'
import { BASE_URL } from '../../reusables/urls'

import './TaskList.css'

const TaskList = () => {
  const taskItemList = useSelector((store) => store.tasks.taskItem)

  const dispatch = useDispatch()

  const fetchTasksList = useCallback(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        dispatch(tasks.actions.setTasks(data.allTasks))
      })
  }, [dispatch])

  useEffect(() => {
    fetchTasksList()
  }, [fetchTasksList])

  return (
    <>
      {taskItemList.map((item) => (
        // eslint-disable-next-line no-underscore-dangle
        <div className="list-container">
          <div className="task-container" key={item._id}>
            <p className="task-text">{item.taskItem}</p>
          </div>
        </div>
      ))}
    </>
  )
};

export default TaskList;