import React , {Component} from 'react';
import {Switch,Route,Redirect} from "react-router-dom";

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../Side-Drawer/Side_Drawer';
import Backdrop from '../../UI/Backdrop/Backdrop';
import BurgerBuilder from '../../Containers/Burger Builder/Buerger_Builder';
import Checkout from '../../Containers/Checkout/Checkout';
import Orders from '../../Containers/Orders/Orders';

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
                {/* <Switch>
                    <Route 
                        path='/Checkout'
                        component={Checkout}
                    />
                    <Route 
                        path='/'
                        component={BurgerBuilder}
                    />
                </Switch> */}
                <Switch>
                    <Route 
                        path='/Burger_APP/Checkout'
                        component={Checkout}
                    />
                    <Route 
                        path='/Orders'
                        component={Orders}
                    />

                    <Route 
                        exact
                        path='/Burger_APP/'
                        component={BurgerBuilder}
                    />

                    <Redirect to="/Burger_APP/"/>
                </Switch>
                

                
               
            </div>
        );
    }
};


export default Layout;