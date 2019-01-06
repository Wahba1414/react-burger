import React from 'react';

import Classes from './Side_Drawer.css';

import { Link } from "react-router-dom";


function sideDrawer (props) {
    return(
        <div className={Classes.Side_Drawer}>
            <div className={Classes.Nav_Items}>
                <ul>
                    <li>
                        <Link to='/'>
                            Burger Builder
                        </Link>
                    </li>
                    <li>
                        <Link to='/Checkout'>
                            Checkout
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};


export default sideDrawer;