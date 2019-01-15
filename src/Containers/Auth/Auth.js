import React , {Component} from 'react';
import SingIn from '../../Components/Sign-In/Sign-In';

import Classes from './Auth.css';

class Auth extends Component{
    state = {

    };


    render (){
        return (
            <div className={Classes['Auth']}>
                <SingIn></SingIn>
            </div>
        );
    }

}

export default Auth;