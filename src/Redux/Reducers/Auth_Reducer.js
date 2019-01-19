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

function logOut (store,action){
    
    var updatedStore = {
        ...store,
        loggedIn : false
    };

    return updatedStore;
}


export function auth (store = initalStore , action){
    switch(action.type){
        case Actions.LOG_IN: return logIn (store,action);
        case Actions.LOG_OUT: return logOut (store,action);
        
        default: return store;
    }
}