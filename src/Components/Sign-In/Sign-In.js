import React , {Component} from 'react';

import {SignIn_Axios} from '../../Utilis/Axios/Auth_instance';

import Spinner from '../../Utilis/Spinner/Spinner';

import Classes from './Sign-In.css';

import Button from '../../UI/Button/Button';

class SignIn extends Component{
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();
    };
    
    
    //creating form data.
    state = {
        form : {
            'E-mail' : {
                value: '',
                configs:{
                    'type': 'text',
                    'placeholder'  : 'Your Email ..'
                },
                valid: true,
                touched: false,
            },

            'Password' : {
                value: '',
                configs:{
                    'type': 'password',
                    'placeholder'  : 'Your Password (6 characters minimum)'
                },
                valid: true,
                touched: false,
            },
        },

        enableSigningIn: false,
        signingIn: false,
    };

    //Invalid styles.
    invalidStyle = {
        border: '2px solid red'
    };


    //function to validate form inputs.
    validateInputs = (key, value) => {
        // console.log('[Inside validateInputs function]');
        var trimedValue = value.trim();
        var isvalid = false;

        switch(key){
            case 'E-mail':
                var emailRegex = new  RegExp(/^\S+@\S+$/);
                isvalid = emailRegex.test(trimedValue)
                break;
            
            case 'Password':
                if(trimedValue.length >= 6){
                    isvalid = true;
                }else{
                    isvalid = false;
                }
                break;

            default: 
                break;    
        }

        return isvalid;

    }

    changeHandler = (event,key) =>{
        // console.log("Inside changeHandler function");
        var stateSnapshot = this.state;
        stateSnapshot.form[key].value = event.target.value;
        this.setState({stateSnapshot});

        // here can add the needed validations.
        var isValid = this.validateInputs(key,event.target.value);
        stateSnapshot = this.state;
        stateSnapshot.form[key].valid = isValid;
        stateSnapshot.form[key].touched = true;

        //Ready for enabling ordering.
        var enableSigningIn = true;
        for(let item in stateSnapshot.form){
            if ( !(stateSnapshot.form[item].touched && stateSnapshot.form[item].valid) ){
                enableSigningIn = false;
            }
        };

        
        stateSnapshot.enableSigningIn = enableSigningIn;
       
        this.setState({stateSnapshot});
    }

    componentDidMount (){
        // console.log("[Inside componentDidMount function]");
        this.textInput.current.focus();
    }


    signIn = (event) => {
        event.preventDefault();
 
        //Sending order inprogress...
        var stateSnapshot = this.state;
        stateSnapshot.signingIn = true;
        this.setState({stateSnapshot});

        var userData = {
            email : this.state.form["E-mail"].value,
            password : this.state.form['Password'].value,
            returnSecureToken: true
        };

        SignIn_Axios.post('',userData).then((response) => {
            // console.log('succeeded' , response);
            this.props.history.push('/Burger_APP/Checkout');

            //store the token and its timeout inside the localstorage.
            //update the global flag 'authenitcated' with true (redux).
            this.props.authenticate(response.data);

        }).catch((error) =>{
            //Nothing for now.
            var stateSnapshot = this.state;
            stateSnapshot.signingIn = false;
            this.setState({stateSnapshot});
        })


    }

    render =  () => {
        // console.log(this.props);
        var formDom = [];

        //preparing the form dom elements.
        var keys = Object.keys(this.state.form);
        keys.forEach((key) => {
            formDom.push(
                <div key={key}  className={Classes['Form-Item']}> 
                    <label>{key} *</label>
                    <input
                    ref={(key === keys[0]) ? this.textInput: null} 
                    {...this.state.form[key].configs} 
                    value = {this.state.form[key].value}
                    onChange={(event) => this.changeHandler(event, key)}
                    style={(this.state.form[key].valid)? null : this.invalidStyle}>
                    </input>
                </div>
            )
        });

        var elementsToRender = this.state.signingIn ? (<Spinner />) :(
            <div className={Classes['Sign-In']}>
                {/* form details */}
                <form className={Classes['Sign-In-Form']}>
                    {formDom}
                    <div>
                        <Button 
                            disable = {!this.state.enableSigningIn}
                            extraClass={Classes['Checkout']} 
                            type='Success-Transparent' 
                            clicked={this.signIn}
                        >
                        Sign in
                        </Button>
                    </div>
                    <div>
                        <Button 
                            extraClass={Classes['Checkout']} 
                            type='Danger-Transparent' 
                            clicked={this.props.switchToSignUp}
                        >
                        Create New Account
                        </Button>
                    </div>

                </form>
            </div>
        );

        return (
            elementsToRender
        );
    }
}

export default SignIn;