import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import tasks from '../reducers/tasks'
import { API_URL } from '../reusables/urls'

const TaskList = () => {
  return <div>taks list</div>;
};
export default TaskList;
