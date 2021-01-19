import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import ClientApp from './client-app';
import AdminApp from './admin/admin-app';

class App extends Component{
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/admin/" component={AdminApp} />
          <Route path="/" component={ClientApp} />
        </Switch>
      </Router>
    );
  }
}
export default App;
