import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Calendar from './containers/calendar/Calendar';
import Index from './containers/index';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/calendar'>
          <Calendar></Calendar>
        </Route>
        <Route path='/'>
          <Index></Index>
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default App
