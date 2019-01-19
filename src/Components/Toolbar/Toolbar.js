import React from 'react';
import { connect } from 'react-redux';

import Classes from './Toolbar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link , NavLink} from "react-router-dom";


function toolbar (props) {
    return(
        <div className={Classes.Toolbar}>
            <button className={Classes.ToggleSideDrawer} onClick={props.toggleSideDrawer}>
                <FontAwesomeIcon className={Classes['Toggle-Icon']} icon={faBars} />
            </button>
            
            <div className={Classes.Logo}>
                <Link to='/'>
                    <img src={require('../../Assets/Images/Logo.png')} alt='Logo'/>
                </Link>
            </div>

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
                            Authentication
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

export default connect(mapStateToProps)(toolbar);