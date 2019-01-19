import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";

import Layout from './Components/Layout/Layout'
import Classes from './App.css';


import * as Actions from './Redux/Actions/index';
import Auth_Utilis from './Utilis/Auth/Auth';

class App extends Component {

  componentDidMount () {
    //To keep the logged in status after refresh.
    var isLoggedIn = Auth_Utilis.isLoggedIn();

    if(isLoggedIn){
      this.props.loggedIn();
    }

  }

  render() {
    return (
      <div className={Classes.App}>
        <Layout />
      </div>

      

    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: () => dispatch(Actions.logIn()), 
  };
}

export default withRouter(connect(null,mapDispatchToProps)(App));
