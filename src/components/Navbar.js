import React, { Component } from 'react'
import hotdogrocket from '../HotdogRocketWhite.png'
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
           <img src={hotdogrocket} width="150" height="80"  alt="" />
      &nbsp; 
        
        <div class="topnav">
          <div className="navLinks">
        <Link to="/TokenCreator">Generate a Token</Link>
              <Link to="/AboutUs">About Us</Link>
              </div>
    
              
         
       

        </div>
        <small className="navAccountInfo" >
          <small id="account" >{this.props.account}</small>    <br></br>
          <small id="ChainName" > Connected Network : {this.props.ChainName}</small>    
        </small>
  </nav>
      
    );
  }
}

export default Navbar;
