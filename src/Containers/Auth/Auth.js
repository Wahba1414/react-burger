import React , {Component} from 'react';
import SignIn from '../../Components/Sign-In/Sign-In';
import SingUp from '../../Components/Sign-Up/Sign-Up';

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


    render (){
        var elementsToRender = (this.state.SingInOrSignUp === 'SignIn') ? (
            <SignIn
                switchToSignUp={this.switchToSignUp}
                history = {this.props.history}
            > 
            </SignIn>
        ) :(
            <SingUp
                switchToSignIn={this.switchToSignIn}
                history = {this.props.history}
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

export default Auth;