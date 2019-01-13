import React , {Component} from 'react';

import Classes from './Orders.css';

import Order from '../../Components/Order/Order';

import axiosInstance from '../../Utilis/Axios/firebase_instance';

import WithErrorHandling from '../../HOC/Error_Handling/withErrorHandling';

import Spinner from '../../Utilis/Spinner/Spinner';


class Orders extends Component{
    state={
        orders: null
    };

    componentDidMount =  () => {
        //getting the orders.
        axiosInstance.get('/orders.json').then((res) => {
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

export default WithErrorHandling(Orders,axiosInstance);