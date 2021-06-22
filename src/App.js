import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import lists from 'reducers/lists';
import user from 'reducers/user';

import Start from './pages/Start/Start';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';
import Home from './pages/Home/Home';
import Tasks from './pages/Tasks/Tasks';

const reducer = combineReducers({
  lists: lists.reducer,
  user: user.reducer
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/register" component={Register} />
          <Route path="/signin" component={SignIn} />
          <Route path="/home" component={Home} />
          <Route path="/list/:id" component={Tasks} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};
