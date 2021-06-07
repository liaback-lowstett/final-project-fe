import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import tasks from 'reducers/tasks';
import user from 'reducers/user';

import Start from './pages/Start';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Tasks from './pages/Tasks';

const reducer = combineReducers({
  tasks: tasks.reducer,
  user: user.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/start" component={Start} />
          <Route path="/register" component={Register} />
          <Route path="/signin" component={SignIn} />
          <Route path="/tasks" component={Tasks} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};
