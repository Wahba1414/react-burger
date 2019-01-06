import React , {Component} from 'react';

import { connect } from 'react-redux'

// import * as queryString from 'query-string';

import BurgerIngredients from '../../Components/Burger Ingredients/Burger_Ingredients';
import UserDetails from '../../Components/User Details/User_Details';

import Classes from './Checkout.css';

class Checkout extends Component  {
    render () {
        
        return(
            <div className={Classes.Checkout}>
                <h1 className={Classes['Checkout-Title']}>Enjoy Your Meal :)</h1>
                <BurgerIngredients ingredients={this.props.ingredients}/>
                <UserDetails price={this.props.totalPrice}/>
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
      ingredients: state.ingredients.items,
      totalPrice: state.ingredients.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);