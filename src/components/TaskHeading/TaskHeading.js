/* eslint-disable no-underscore-dangle */
import React from 'react';

import './TaskHeading.scss';

const TaskHeading = ({ heading }) => {

  return (
    <div className="task-heading">
      <h1>{heading}</h1>
    </div>
  );
};

export default TaskHeading;
