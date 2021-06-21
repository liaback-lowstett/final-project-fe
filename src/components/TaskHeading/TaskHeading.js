/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './TaskHeading.scss';

const TaskHeading = () => {
  const { id } = useParams();
  const taskHeading = useSelector(
    (store) => store.lists.list.find((item) => item._id === id).listName
  );

  return (
    <div className="task-heading">
      <h1>{taskHeading}</h1>
    </div>
  );
};

export default TaskHeading;
