import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import Nav from './components/nav'
import Content from './components/content'
function AppAdmin(){
    return (
      <Router>
          <div className="App">
            <Nav />
            <Content />
          </div>
      </Router>
    );
}
export default AppAdmin;
