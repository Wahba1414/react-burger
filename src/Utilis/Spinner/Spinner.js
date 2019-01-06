import React from 'react';
import { ClipLoader} from 'react-spinners';


import Classes from './Spinner.css';

function spinner (props) {
    return(
        <div className={Classes['Spinner-Container']}>
            <ClipLoader
                css={Classes['Spinner']}
                sizeUnit={"px"}
                size={100}
                // color={'#123abc'}
            />
        </div>
    );
}


export default spinner;