import React from 'react';

import Classes from './Burger_Ingredient.css';

function burgerIngredient (props) {
    var ingredient = [];

    switch(props.type){
        case 'Top-Bread':
        ingredient = (
            <div className={Classes['Top-Bread']}>
                <div className={Classes['Seeds1']}></div>
                <div className={Classes['Seeds2']}></div>
            </div>
        );
        break;


        case 'Bottom-Bread':
        ingredient = (
            <div className={Classes['Bottom-Bread']}></div>
        );
        break;

        case 'Salat':
        ingredient = (
            <div className={Classes['Salat']}></div>
        );
        break;

        case 'Meat':
        ingredient = (
            <div className={Classes['Meat']}></div>
        );
        break;

        case 'Cheese':
        ingredient = (
            <div className={Classes['Cheese']}></div>
        );
        break;
        
        default:
        ingredient = null;
        break;
    };


    return(
       ingredient
    );
}


export default burgerIngredient;