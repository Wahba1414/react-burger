import React , {Component} from 'react';

import * as queryString from 'query-string';

import BurgerIngredients from '../../Components/Burger Ingredients/Burger_Ingredients';
import UserDetails from '../../Components/User Details/User_Details';

import Classes from './Checkout.css';

class Checkout extends Component  {
    //Initializing the state object.
    constructor (props){
        super(props);
        /*
        Important hint: for sure in real apps we must not send data like price in the query because it can easily
        be amended (should be calculated in the server).
        */
        var decodedSearch =  decodeURIComponent(this.props.location.search);
        //parsing the search paramters and set the ingredients.
        var searchData = queryString.parse(decodedSearch);
        //state init.
        var state = {
            ingredients: {
                'Top-Bread' : 1,
                'Salat' : 0,
                'Meat' : 0,
                'Cheese' : 0,
                'Bottom-Bread' : 1,
            },
            totalPrice: 0
        };
        for (let key in searchData){
            if(key !== 'Price'){
                state.ingredients[key] = +searchData[key] ; 
            }else{
                state.totalPrice =  +searchData[key];
            }
        }        

        this.state = state;
    }
    

    render () {
        
        return(
            <div className={Classes.Checkout}>
                <h1 className={Classes['Checkout-Title']}>Enjoy Your Meal :)</h1>
                <BurgerIngredients ingredients={this.state.ingredients}/>
                <UserDetails price={this.state.totalPrice}/>
            </div>
        )
    }

}

export default Checkout;