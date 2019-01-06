import * as Actions from '../Actions/Action_Constants';

var initalStore = {
    items:{
        'Top-Bread' : 1,
        'Cheese' : 0,
        'Salat' : 0,
        'Meat' : 0,
        'Bottom-Bread' : 1
    },


    totalPrice: 2 
};


const priceList = {
    'Cheese'        : 1,
    'Salat'         : 1,
    'Meat'          : 6,
    'Top-Bread'     : 1,
    'Bottom-Bread'  : 1,
}


//Helper functions.
function addIngredient (store,action){
    var updatedStore = {
        ...store,
        items:{
            ...store.items,
            [action.ingredient] : store.items[action.ingredient] + 1
        },

        totalPrice : store.totalPrice + priceList[action.ingredient]
    }

    return updatedStore;
}


function removeIngredient (store,action){
    var updatedStore = {
        ...store,
        items:{
            ...store.items,
            [action.ingredient] : store.items[action.ingredient] - 1
        },

        totalPrice : store.totalPrice - priceList[action.ingredient]
    }

    return updatedStore;
}

export function ingredients (store = initalStore , action){
    switch(action.type){
        case Actions.ADD_INGREDIENT: return addIngredient (store,action);
        
        case Actions.REMOVE_INGREDIENT: return removeIngredient (store,action);
            
        default: return store;
    }
}