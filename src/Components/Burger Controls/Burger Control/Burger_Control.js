import React from 'react';

import Button from '../../../UI/Button/Button';

import Classes from './Burger_Control.css';


function burgerControl (props){
    return(
        <div className={Classes['Burger-Control']}>
            <label>{props.type}</label>
            <Button type='Danger' clicked={() => props.removeIngredient(props.type)}>Less</Button>
            <Button type='Success' clicked={() => props.addIngredient(props.type)}>More</Button>
        </div>
    );
}


export default burgerControl;