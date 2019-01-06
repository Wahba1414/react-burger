import React , {Component} from 'react';
import {Switch,Route} from "react-router-dom";

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../Side-Drawer/Side_Drawer';
import Backdrop from '../../UI/Backdrop/Backdrop';
import BurgerBuilder from '../../Containers/Burger Builder/Buerger_Builder';
import Checkout from '../../Containers/Checkout/Checkout';

import Classes from './Layout.css';

class Layout extends Component  {
    //Initializing the state object.
    state = {
        showSideDrawer: false,
    };

    toggleSideDrawer =  () => {
        console.log("Inside toggleSideDrawer function");
        var stateSnapshot = this.state;
        stateSnapshot.showSideDrawer = !stateSnapshot.showSideDrawer;
        this.setState(stateSnapshot);
    }
     

    render () {
        //Displaying the sidebar or not.
        var sideDrawer = (this.state.showSideDrawer) ? (
            <React.Fragment>
                <SideDrawer  />
                <Backdrop show={true} clicked={this.toggleSideDrawer}/>
            </React.Fragment>
        ) : null;

        return(
            <div className={Classes.Layout}>
                <Toolbar  toggleSideDrawer={this.toggleSideDrawer}/>  
                {sideDrawer}

                {/* app routes */}
                <Switch>
                    <Route 
                        path='/Checkout'
                        component={Checkout}
                    />
                    <Route 
                        path='/'
                        component={BurgerBuilder}
                    />
                </Switch>
               
            </div>
        );
    }
};


export default Layout;