/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';

import './ListHeading.scss';

const ListHeading = ({ heading, onListNameChange, id }) => {
  const [enabled, setEnabled] = useState(false);
  const toggleEnabled = () => {
    setEnabled(!enabled)
  }
  return (
    <div className="task-heading">
      <input
        disabled={!enabled}
        type="input"
        defaultValue={heading}
        onBlur={(e) => {
          toggleEnabled()
          onListNameChange(id, e.target.value)
        }} />
      <button type="button" onClick={toggleEnabled}>
        {!enabled ? 'Edit' : 'Save'}
      </button>
    </div>
  );
};

export default ListHeading;
