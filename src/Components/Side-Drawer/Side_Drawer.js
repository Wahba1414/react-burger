import React from 'react';

import Classes from './Side_Drawer.css';

import { NavLink } from "react-router-dom";


function sideDrawer (props) {
    return(
        <div className={Classes.Side_Drawer}>
            <div className={Classes.Nav_Items}>
                <ul>
                    <li>
                        <NavLink activeClassName={Classes['Is-Active']} to='/Burger_APP/'>
                            Burger Builder
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={Classes['Is-Active']} to='/Orders'>
                            Orders
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
};


export default sideDrawer;