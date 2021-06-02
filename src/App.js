import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from './pages/Home'
import Tasks from './pages/Tasks'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/tasks" component={Tasks}/>
      </Switch>
    </BrowserRouter>
  )
}
