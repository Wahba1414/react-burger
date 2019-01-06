import * as ActionTypes from './Action_Constants';
import axiosInstance from '../../Utilis/Axios/firebase_instance';


//Action creators.

export const addIngredient = function(ingredient){
    return ({
        type: ActionTypes.ADD_INGREDIENT,
        ingredient: ingredient
    });
}


export const removeIngredient = function(ingredient){
    return ({
        type: ActionTypes.REMOVE_INGREDIENT,
        ingredient: ingredient
    });
}


//Async. handling inside redux by thunk.
export function initIngredientsStart (){
    return({
        type: ActionTypes.INIT_INGREDIENTS_START
    })
}

function initIngredientsSucceeded (ingredients, totalPrice){
    return ({
        type: ActionTypes.INIT_INGREDIENTS,
        ingredients,
        totalPrice
    })
}

export const initIngredients = function(){
    const priceList = {
        'Cheese'        : 1,
        'Salat'         : 1,
        'Meat'          : 6,
        'Top-Bread'     : 1,
        'Bottom-Bread'  : 1,
    };
    
    return function(dispatch){
        //starting.
        dispatch(initIngredientsStart());
        
        axiosInstance.get('/ingredients/-LVXhWhIqLVJ8UG3RSxG.json').then((res) => {
            var ingredients = res.data;
            var totalPrice  = 0;
            for ( let type in ingredients){
                totalPrice += priceList[type] || 0;
            };

            dispatch(initIngredientsSucceeded(ingredients,totalPrice));

        }, (error) => {
            console.log('errorr >> ' , error);
        })
    }
}