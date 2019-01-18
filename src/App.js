import React, { Component } from 'react';
import './App.scss';
import { Route, Switch } from "react-router-dom";
import Login from './components/Login';
import DashboardAdmin from './components/admin/DashboardAdmin';
import DashboardUser from './components/user/DashboardUser';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/dashboard-user' component={DashboardUser} />
        <Route path='/dashboard-admin' component={DashboardAdmin} />
        <Route path='/' exact component={Login} />
      </Switch>
    );
  }
}

export default App;
