import React , {Component} from 'react';

import { connect } from 'react-redux';

import * as Actions from '../../Redux/Actions/index';

import Classes from './Orders.css';

import Order from '../../Components/Order/Order';

import axiosInstance from '../../Utilis/Axios/firebase_instance';

import WithErrorHandling from '../../HOC/Error_Handling/withErrorHandling';

import Spinner from '../../Utilis/Spinner/Spinner';

import Auth_Utilis from '../../Utilis/Auth/Auth';


class Orders extends Component{
    state={
        orders: null
    };

    componentWillMount = () =>{
        var isLogged = Auth_Utilis.isLoggedIn();
        if(!isLogged){
            //Dispatch Logout redux action.
            this.props.loggedOut();
            //Go to 'Sign in' view.
            this.props.history.push('/Auth');
        }
    }

    componentDidMount =  () => {
        //getting the orders.
        var token = localStorage.getItem('token');
        var userID = localStorage.getItem('userId');

        var queryParams = '?auth=' + token + '&orderBy="userID"&equalTo="' + userID + '"';

        axiosInstance.get('/orders.json' + queryParams).then((res) => {
            var orders = res.data;
            this.setState({orders: orders});
        });
    }

    renderOrders = (data) =>{
        var orders = [];

        for(let id in data){
            orders.push(
                <Order
                    key= {id}
                    order = {data[id]}>
                </Order>)
        }
        console.log('order: ' , orders);
        return orders;
    }

    render(){

        var elementsToRender = this.state.orders ? (
            <div className={Classes['Orders']}> 
                {this.renderOrders(this.state.orders)}
            </div>
        ) : (<Spinner />);

        return(
            <div>
                {elementsToRender}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
    }
}


const mapDispatchToProps = dispatch => {
    return {
      loggedOut: () => dispatch(Actions.logOut()), 
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandling(Orders,axiosInstance));