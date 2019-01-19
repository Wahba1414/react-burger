import React , {Component} from 'react';

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

        enableOrdering: false,
        purchasing: false,
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
                var emailRegex = new  RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);
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
        var enableOrdering = true;
        for(let item in stateSnapshot.form){
            if ( !(stateSnapshot.form[item].touched && stateSnapshot.form[item].valid) ){
                enableOrdering = false;
            }
        };

        
        stateSnapshot.enableOrdering = enableOrdering;
       
        this.setState({stateSnapshot});
    }

    componentDidMount (){
        console.log("[Inside componentDidMount function]");
        this.textInput.current.focus();
    }

    render =  () => {
        // console.log(this.props);
        var formDom = [];

        //preparing the form dom elements.
        var keys = Object.keys(this.state.form);
        keys.forEach((key) => {
            formDom.push(
                <div key={key}  className={Classes['Form-Item']}> 
                    <label>{key}</label>
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

        var elementsToRender = (
            <div className={Classes['Sign-In']}>
                {/* form details */}
                <form className={Classes['Sign-In-Form']}>
                    {formDom}
                    <div>
                        <Button 
                            disable = {!this.state.enableOrdering}
                            extraClass={Classes['Checkout']} 
                            type='Success-Transparent' 
                            clicked={this.submitOrder}
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