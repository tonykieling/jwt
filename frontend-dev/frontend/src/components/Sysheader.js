import React, { Component } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import { Link } from "react-router-dom";

class Navega extends Component {

  logout = () => {
    if (window.confirm("Are you sure you wanna leave?"))
      this.props.noUser()
  }


  loggedHeader = () => {
      return (
        <Navbar bg="primary" >
          <Navbar.Brand href="/">KcodingT</Navbar.Brand>
          <Nav>
            <Link to="/" className="nav-link">{this.props.storeEmail} is logged</Link>
            <Button onClick={this.logout} className="logoutBtn">Logout</Button>
          </Nav>
        </Navbar>
      )
  }


  notLoggedHeader = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">KCodingT</Navbar.Brand>
        <Nav>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </Nav>
      </Navbar>
    )
  }


  render() {
    return(this.props.storeEmail ?
            this.loggedHeader() :
            this.notLoggedHeader()
          );
  }
}

const mapStateToProps = store => {
  return {
    storeEmail        : store.email,
    storeUserAdmin    : store.userAdmin,
    storePictureName  : store.pictureName
  }
};

const mapDispatchToProps = dispatch => {
  return {
    noUser: () => dispatch({type:"LOGOUT"})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navega);
