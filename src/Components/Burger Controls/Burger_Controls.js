import React from 'react';

import BurgerControl from './Burger Control/Burger_Control';
import Button from '../../UI/Button/Button';

import Classes from './Burger_Controls.css';

function burgerControls (props){
    return(
        <div className={Classes['Burger-Controls']}>
            <div className={Classes['Price']}>
                Total Price: {props.totalPrice.toFixed(2)}
            </div>
            <BurgerControl 
            addIngredient={props.addIngredient} 
            removeIngredient={props.removeIngredient} 
            type='Meat'/>
            <BurgerControl 
            addIngredient={props.addIngredient} 
            removeIngredient={props.removeIngredient} 
            type='Salat'/>
            <BurgerControl 
            addIngredient={props.addIngredient} 
            removeIngredient={props.removeIngredient} 
            type='Cheese'/>

            <Button hide={props.disableCheckOut} extraClass={Classes['Checkout']} type='Action' clicked={props.checkoutClicked}>Checkout</Button>

        </div>
    );
}


export default burgerControls;