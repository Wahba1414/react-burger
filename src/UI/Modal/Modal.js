import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import Classes from './Modal.css';

function modal (props){
    var modalElements = (props.show) ? (
        <React.Fragment>
            <div className={Classes['Modal']}>
                {props.children}
            </div>
            <Backdrop show={props.show} clicked={props.hide}/>
        </React.Fragment>
    ) : null;

    return(
        modalElements
    );
}

export default modal;