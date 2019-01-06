import React from 'react';
import Classes from './Button.css';

function button (props){
    // Adding extra style classes
    // console.log(props)
    var buttonClasses = [];
    buttonClasses.push(Classes[props.type]);
    if(props.extraClass){
        buttonClasses.push(props.extraClass);
    }
    buttonClasses = buttonClasses.join(' ');

    return(
        <button disabled={props.hide} className={buttonClasses} onClick={props.clicked}>
            {props.children}
        </button>
    );
}

export default button;