var authentication = {};


/*
Hint: the component which use this function, should dispatch Redux action to update 'Auth' store flags.
*/
authentication.isLoggedIn = () =>{
    var expirationTime = localStorage.getItem('expirationTime');
    var currentTime  = new Date();

    // console.log('expirationTime: '  , expirationTime);
    // console.log('currentTime: '  , currentTime);

    if(expirationTime < currentTime){
        //clear the localStorage.
        localStorage.clear();
        return false;
    }

    return true;
};


export default authentication;