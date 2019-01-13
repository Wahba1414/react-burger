import React from 'react';
import Classes from './Order.css';

function order (props){
    // console.log(props)
    //preparing ingredients.
    var ingredientsList = [];
    for(let item in props.order.ingredients){
        ingredientsList.push(
            <div 
                key={item}
                className={Classes['Ingredient']}
            >
            {item} ({props.order.ingredients[item]})
            </div>
        );
    }

    return(
        <div className={Classes['Order']}>
            <div  className={Classes['Ingredients-Title']}>Ingredients</div>
            <div className={Classes['Ingredients']}>
                {ingredientsList}
            </div>
            <div  className={Classes['Price']}>
                Total Price : {props.order.price}
            </div>
            <div className={Classes['User-Data']}>
                User Name:  {props.order.userDetails.Name}
            </div>
        </div>
    );
}


export default order;