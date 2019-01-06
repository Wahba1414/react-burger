import React from 'react';

import Button from '../../UI/Button/Button';

import Classes from './Summary.css';


function summary (props){
    var ingredients = [];

    var keys = Object.keys(props.ingredients);
    keys.forEach(function(key){
        ingredients.push(
            <li key={key}> 
                <lable>
                    {key}
                </lable> 
                <label>
                    ( {props.ingredients[key]} )
                </label> 
            </li>
        )
    })

    return(
        <div className={Classes['Summary']}>
            <div className={Classes['Summary-Title']}>
                <label>Order Summary</label>
            </div>

            <div className={Classes['Burger-Ingredients']}>
                <div className={Classes['Ingredient-Title']}>
                    <label>
                        Burger Ingredient
                        <hr />
                    </label>
                </div>
                <ul>
                    {ingredients}
                </ul>
            </div>

            <div className={Classes['Price']}>
                <label>Total Price: {props.price}</label>
            </div>

            <div className={Classes['Summary-Controls']}>
                {/* Buttons */}
                <Button type='Danger' clicked={props.cancelSummary}>Cancel</Button>
                <Button type='Success' clicked={props.toCheckout}>Proceed</Button>
            </div>

        </div>
    );
}

export default summary;