import React from 'react';
import { connect } from 'react-redux';

import {withRouter} from "react-router-dom";


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

                    {props.loggedIn ? <li>
                        <NavLink  activeClassName={Classes['Is-Active']} to='/Orders'>
                            Orders
                        </NavLink>
                    </li> : null}

                    <li>
                        <NavLink  activeClassName={Classes['Is-Active']} to='/Auth'>
                            {props.loggedIn ? 'Log Out' : 'Authentication'  }
                        </NavLink>
                    </li>


                </ul>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
    }
}

export default withRouter(connect(mapStateToProps)(sideDrawer));