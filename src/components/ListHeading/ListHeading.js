/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';

import './ListHeading.scss';
import edit from '../../assets/edit.png';
import save from '../../assets/save.png';

const ListHeading = ({ heading, onListNameChange, id }) => {
  const [enabled, setEnabled] = useState(false);
  const toggleEnabled = () => {
    setEnabled(!enabled)
  }
  return (
    <div className="list-heading">
      <input
        disabled={!enabled}
        type="input"
        defaultValue={heading}
        onBlur={(e) => {
          toggleEnabled()
          onListNameChange(id, e.target.value)
        }} />
      <button type="button" onClick={toggleEnabled}>
        {!enabled
          ? <img src={edit} alt="edit" />
          : <img src={save} alt="save" />
        }
      </button>
    </div>
  );
};

export default ListHeading;
