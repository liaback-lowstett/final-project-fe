import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import tasks from 'reducers/tasks';

import Home from './pages/Home';
import Tasks from './pages/Tasks';

const reducer = combineReducers({
  tasks: tasks.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/tasks" component={Tasks} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};
