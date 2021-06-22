/* eslint-disable no-underscore-dangle */
import React from 'react';

import './ListHeading.scss';

const ListHeading = ({ heading }) => {
  return (
    <div className="task-heading">
      <h1>{heading}</h1>
    </div>
  );
};

export default ListHeading;
