import React from 'react';

import Classes from './Error.css';

function error (props){
    return(
        <div className={Classes['Error']}>
            {props.children}
        </div>
    );
}

export default error;