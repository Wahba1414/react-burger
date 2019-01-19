import React , {Component} from 'react';
import { connect } from 'react-redux'


import SignIn from '../../Components/Sign-In/Sign-In';
import SingUp from '../../Components/Sign-Up/Sign-Up';

import * as Actions from '../../Redux/Actions/index';

import Classes from './Auth.css';

class Auth extends Component{
    state = {
        SingInOrSignUp: 'SignIn'
    };

    switchToSignIn = (event) => {
        event.preventDefault();
        this.setState({
            SingInOrSignUp: 'SignIn'
        });
    }

    switchToSignUp = (event) => {
        event.preventDefault();
        this.setState({
            SingInOrSignUp: 'SignUp'
        });
    }

    authenticate = (userData) =>{
        //User data contains: token, user ID.

        //Update the localStorage with this info.
        localStorage.setItem('userId', userData.localId);
        localStorage.setItem('token' , userData.idToken);

        var currentTime = new Date();

        var expirationTime = new Date(((currentTime.getTime() / 1000) + (+userData.expiresIn) ) * 1000)

        localStorage.setItem('expirationTime', expirationTime);

        //Dispatching action to set the Redux 'Authenticated' flag.
        this.props.loggedIn();
    }


    render (){
        var elementsToRender = (this.state.SingInOrSignUp === 'SignIn') ? (
            <SignIn
                switchToSignUp={this.switchToSignUp}
                history = {this.props.history}
                authenticate = {this.authenticate}
            > 
            </SignIn>
        ) :(
            <SingUp
                switchToSignIn={this.switchToSignIn}
                history = {this.props.history}
                authenticate = {this.authenticate}
            >
            </SingUp>
        );


        return (
            <div className={Classes['Auth']}>
                {elementsToRender}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
    }
}


const mapDispatchToProps = dispatch => {
    return {
      loggedIn: () => dispatch(Actions.logIn()), 
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(Auth);