import React , {Component} from 'react';

import axiosInstance from '../../Utilis/Axios/firebase_instance';



import BurgerIngredients from '../../Components/Burger Ingredients/Burger_Ingredients';
import BurgerControls from '../../Components/Burger Controls/Burger_Controls';
import Summary from '../../Components/Summary/Summary';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../Utilis/Spinner/Spinner';
import Error from '../../Utilis/Error/Error';
import WithErrorHandling from '../../HOC/Error_Handling/withErrorHandling';

import Classes from './Buerger_Builder.css';


class BurgerBuilder extends Component{
    state = {
        ingredients : null,

        totalPrice : 0,

        //show summary modal.
        showSummaryModal: false,

        loading : true, 

        error: ''
    };

    priceList = {
        'Cheese'        : 1,
        'Salat'         : 1,
        'Meat'          : 6,
        'Top-Bread'     : 1,
        'Bottom-Bread'  : 1,
    }

    componentDidMount =  () => {
        axiosInstance.get('/ingredients/-LVXhWhIqLVJ8UG3RSxG.json').then((res) => {
            var stateSnapshot = this.state;
            
            //update ingredients.
            stateSnapshot.ingredients = res.data;
            
            console.log('stateSnapshot.ingredients: ' , stateSnapshot.ingredients)

            //update loading state.
            stateSnapshot.loading = false;

            //Updating Price.
            for ( let type in stateSnapshot.ingredients){
                stateSnapshot.totalPrice += this.priceList[type] || 0;
            };

            this.setState(stateSnapshot);
        }, (error) => {
            //update loading state.
            var stateSnapshot = this.state;
            stateSnapshot.loading = false;
            stateSnapshot.error = 'Error happened during retrieving the initial ingredients';
            this.setState(stateSnapshot);
            // console.log('error => ' , error);
        })

    };

    //Enable checkout button.
    disableCheckOut = true;


    //Function to show/hide summary modal.
    toggleSummaryModal = () =>{
        // console.log("[inside toggleSummaryModal function]");

        var stateSnapshot = this.state;

        stateSnapshot.showSummaryModal = !stateSnapshot.showSummaryModal;

        this.setState(stateSnapshot);

    }

    //Function to add some incredient.
    addIngredient = (type) => {
        // console.log("Inside addIngredient function");
        var stateSnapshot = this.state;

        stateSnapshot.ingredients[type] ++;

        if(type === 'Meat'){
            stateSnapshot.totalPrice += 5;
        }else{
            stateSnapshot.totalPrice ++;
        }

        //for simplicity
        if(stateSnapshot.totalPrice > 1){
            this.disableCheckOut = false;
        }

        this.setState(stateSnapshot);

        // console.log('this.state: ' , this.state);
    }


    //Function to remove some incredient.
    removeIngredient = (type) => {
        // console.log("Inside removeIngredient function");
        var stateSnapshot = this.state;

        if(stateSnapshot.ingredients[type]){
            // console.log('removing..')
            stateSnapshot.ingredients[type]--;

            if(type === 'Meat'){
                stateSnapshot.totalPrice -= 5;
            }else{
                stateSnapshot.totalPrice--;
            }

            //for simplicity
            if(stateSnapshot.totalPrice === 1){
                this.disableCheckOut = true;
            }

            this.setState(stateSnapshot);
        }

        // console.log('this.state: ' , this.state);
    }

    //Function to go to 'Checkout' page.
    toCheckout = () => {
        console.log("[Inside toCheckout function]");
        // Build the query params.
        var queryParams = '';
        var keys = Object.keys(this.state.ingredients);
        keys.forEach((key,index) => {
            queryParams += key + '=' + this.state.ingredients[key] + '&';
        });

        //Add the totalPrice.
        queryParams += 'Price=' + this.state.totalPrice;

        console.log('queryParams: ' , queryParams)
        queryParams = encodeURIComponent(queryParams);
        
        //Go to the 'Checkout' page.

        this.props.history.push({
            pathname: '/Checkout',
            search: queryParams
        })

    }

   
    render () {
        //Handling the request delay of ingredients by Spinner.
        var ingredients = null;
        if(this.state.error){
            ingredients = (
            <Error> 
                {this.state.error}
            </Error>);
        }else{
            ingredients = (!this.state.loading) ? (<BurgerIngredients ingredients={this.state.ingredients}/>) : (<Spinner />);
        }

        return(
            <React.Fragment>
                <h1 className={Classes['Builder-Title']}>Build Your Burger :)</h1>
                {ingredients}
                <BurgerControls 
                totalPrice = {this.state.totalPrice}
                addIngredient={this.addIngredient} 
                removeIngredient={this.removeIngredient}
                disableCheckOut = {this.disableCheckOut}
                checkoutClicked = {this.toggleSummaryModal} 
                />

                <Modal show={this.state.showSummaryModal ? 1: 0} hide={this.toggleSummaryModal}>
                    <Summary 
                    ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
                    cancelSummary={this.toggleSummaryModal}
                    toCheckout = {this.toCheckout}
                    />
                </Modal>
            </React.Fragment>
            
        );
    }

}

export default WithErrorHandling(BurgerBuilder, axiosInstance);