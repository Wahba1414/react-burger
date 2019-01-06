import React , {Component} from 'react';

import axiosInstance from '../../Utilis/Axios/firebase_instance';

import WithErrorHandling from '../../HOC/Error_Handling/withErrorHandling';



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
            },

            'Address' : {
                value: '',
                configs:{
                    'type': 'text',
                    'placeholder'  : 'Your Address ..'
                },
                valid: true,
            },

            'Number' : {
                value: '',
                configs:{
                    'type': 'text',
                    'placeholder'  : 'Your Phone Number ..'
                },
                valid: true,
            }
        }
    };

    //Invalid styles.
    invalidStyle = {
        border: '2px solid red'
    };

    changeHandler = (event,key) =>{
        console.log("Inside changeHandler function");
        // here can add the needed validations.
        var formSnapshot = this.state.form;
        formSnapshot[key].value = event.target.value;
        this.setState({formSnapshot})
    }

    submitOrder = (event) => { 
        event.preventDefault();
        console.log("[inside submitOrder function]");
 
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
            console.log('Order sent')
        }, (error) => {
        })
    }

    componentDidMount (){
        console.log("[Inside componentDidMount function]");
        this.textInput.current.focus();
    }

    render =  () => {
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

        return (
            <div className={Classes['User-Details']}>
                <div className={Classes['Price']}>
                    <label>Total Price: {this.props.price.toFixed(2)}</label>
                </div>
                {/* form details */}
                <form className={Classes['User-Details-Form']}>
                    {formDom}
                    <Button extraClass={Classes['Checkout']} type='Action' clicked={this.submitOrder}>Order</Button>
                </form>
            </div>
        );
    }
}

export default WithErrorHandling(UserDetails,axiosInstance);