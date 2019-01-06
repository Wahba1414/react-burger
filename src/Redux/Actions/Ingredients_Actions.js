import * as ActionTypes from './Action_Constants';

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

