import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

import { connect } from 'react-redux';
import Sysheader  from './components/Sysheader';
import Home       from './components/Home';
import Lands      from './components/Lands';
import Login      from './components/Login';
import Register   from './components/Register';
import Error      from "./components/Error";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Sysheader />
          <Switch>
            <Route exact path="/"
              render = {() => {
                if(this.props.storeEmail)
                  return <Home />
                else
                  return <Lands />
              }} />

            <Route exact path="/lands"
              render = {() => {
                if(this.props.storeEmail)
                  return <Home />
                else
                  return <Lands />
              }} />
            
            <Route path="/login"
              render={() => {
                if (!this.props.storeEmail)
                  return <Login />
                else
                  return <Redirect to="/"/>
              }} />

            <Route path="/register" component={Register} />

            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = store => {
  return {
    storeEmail: store.email
  }
}

export default connect(mapStateToProps, null)(App)

