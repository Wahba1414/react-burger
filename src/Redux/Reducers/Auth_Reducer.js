import * as Actions from '../Actions/Action_Constants';

var initalStore = {
    loggedIn : false
};


//Helper functions.
function logIn (store,action){
    
    var updatedStore = {
        ...store,
        loggedIn : true
    };

    return updatedStore;
}


export function auth (store = initalStore , action){
    switch(action.type){
        case Actions.LOG_IN: return logIn (store,action);
        
        default: return store;
    }
}