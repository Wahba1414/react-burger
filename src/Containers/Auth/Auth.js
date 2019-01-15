import React , {Component} from 'react';
import SingIn from '../../Components/Sign-In/Sign-In';
import SingUp from '../../Components/Sign-Up/Sign-Up';

import Classes from './Auth.css';

class Auth extends Component{
    state = {

    };


    render (){
        return (
            <div className={Classes['Auth']}>
                <SingUp></SingUp>
            </div>
        );
    }

}

export default Auth;