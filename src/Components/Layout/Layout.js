import React , {Component , Suspense} from 'react';
import { connect } from 'react-redux';

import {Switch,Route,Redirect,withRouter} from "react-router-dom";

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../Side-Drawer/Side_Drawer';

import Auth from '../../Containers/Auth/Auth';

import Backdrop from '../../UI/Backdrop/Backdrop';
import BurgerBuilder from '../../Containers/Burger Builder/Buerger_Builder';
import Spinner from '../../Utilis/Spinner/Spinner';

import Classes from './Layout.css';

// import Orders from '../../Containers/Orders/Orders';

//Lazy loading
const LazyOrders    = React.lazy(() => import('../../Containers/Orders/Orders'));
const LazyCheckout  = React.lazy(() => import('../../Containers/Checkout/Checkout'));


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


        var AvailableRoutes = this.props.loggedIn ? (
            <Switch>
                <Route 
                    path='/Burger_APP/Checkout'
                    component={LazyCheckout}
                />
                
                <Route 
                    path='/Orders'
                    component={LazyOrders}
                />

                <Route 
                    path='/Auth'
                    component={Auth}
                />

                <Route 
                    exact
                    path='/Burger_APP/'
                    component={BurgerBuilder}
                />

                <Redirect to="/Burger_APP/"/>
            </Switch>) : (
            <Switch>
                <Route 
                    path='/Burger_APP/Checkout'
                    component={LazyCheckout}
                />
                
                <Route 
                    path='/Auth'
                    component={Auth}
                />

                <Route 
                    exact
                    path='/Burger_APP/'
                    component={BurgerBuilder}
                />

                <Redirect to="/Burger_APP/"/>
            </Switch>);

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
                <Suspense fallback={<Spinner />}>  
                    {AvailableRoutes}
                </Suspense>
                

                
               
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
    }
}


export default withRouter(connect(mapStateToProps)(Layout));