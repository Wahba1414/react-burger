import React from 'react';

import Button from '../../../UI/Button/Button';

import Classes from './Burger_Control.css';


function burgerControl (props){
    return(
        <div className={Classes['Burger-Control']}>
            <label>{props.type}</label>
            <Button type='Success' clicked={() => props.addIngredient(props.type)}>Add</Button>
            <Button type='Danger' clicked={() => props.removeIngredient(props.type)}>Remove</Button>
        </div>
    );
}


export default burgerControl;