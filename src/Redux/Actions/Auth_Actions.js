import * as ActionTypes from './Action_Constants';


//Action creators.

export const logIn = function(){
    return ({
        type: ActionTypes.LOG_IN
    });
}


export const logOut = function(){
    return ({
        type: ActionTypes.LOG_OUT
    });
}