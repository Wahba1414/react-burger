import React , {Component} from 'react';

import axiosInstance from '../../Utilis/Axios/firebase_instance';

import WithErrorHandling from '../../HOC/Error_Handling/withErrorHandling';

import Spinner from '../../Utilis/Spinner/Spinner';

import Classes from './User_Details.css';

import Button from '../../UI/Button/Button';

class UserDetails extends Component{
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();
    };
    
    
    //creating form data.
    state = {
        form : {
            'Name' : {
                value: '',
                configs:{
                    'type': 'text',
                    'placeholder'  : 'Your Name ..'
                },
                valid: true,
                touched: false,
            },

            'Address' : {
                value: '',
                configs:{
                    'type': 'text',
                    'placeholder'  : 'Your Address ..'
                },
                valid: true,
                touched: false,
            },

            'Number' : {
                value: '',
                configs:{
                    'type': 'text',
                    'placeholder'  : 'Your Phone Number ..'
                },
                valid: true,
                touched: false,
            }
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
            case 'Name':
                if(trimedValue.length >= 6){
                    isvalid = true;
                }else{
                    isvalid = false;
                }
                break;

            case 'Address': 
                if(trimedValue.length >= 15){
                    isvalid = true;
                }else{
                    isvalid = false;
                }
                break;

            case 'Number': 
                var phoneRegex = new  RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);
                isvalid = phoneRegex.test(trimedValue)
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

    submitOrder = (event) => { 
        event.preventDefault();
        console.log("[inside submitOrder function]");
 
        //Sending order inprogress...
        var stateSnapshot = this.state;
        stateSnapshot.purchasing = true;
        this.setState({stateSnapshot});

        //preparing order data.
        var Order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            userDetails: {
                'Name' : this.state.form['Name'].value,
                'Address' : this.state.form['Address'].value,
                'Number' : this.state.form['Number'].value,
            }
        };

        axiosInstance.post('/orders/.json', Order).then((res) => {
            console.log('Order sent');

            //Back to the main page.
            this.props.history.push('/');
        }, (error) => {
            //reset back.
            var stateSnapshot = this.state;
            stateSnapshot.purchasing = false;
            this.setState({stateSnapshot});
        });
    }

    componentDidMount (){
        console.log("[Inside componentDidMount function]");
        this.textInput.current.focus();
    }

    render =  () => {
        console.log(this.props);
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

        var elementsToRender = this.state.purchasing ? (<Spinner />) : (
            <div className={Classes['User-Details']}>
                <div className={Classes['Price']}>
                    <label>Total Price: {this.props.price.toFixed(2)}</label>
                </div>
                {/* form details */}
                <form className={Classes['User-Details-Form']}>
                    {formDom}
                    <Button 
                        disable = {!this.state.enableOrdering}
                        extraClass={Classes['Checkout']} 
                        type='Action' 
                        clicked={this.submitOrder}
                    >
                    Order
                    </Button>
                </form>
            </div>
        )

        return (
            elementsToRender
        );
    }
}

export default WithErrorHandling(UserDetails,axiosInstance);