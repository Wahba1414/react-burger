import React , {Component} from 'react';
import { connect } from 'react-redux'

import axiosInstance from '../../Utilis/Axios/firebase_instance';
import * as Actions from '../../Redux/Actions/index';


import BurgerIngredients from '../../Components/Burger Ingredients/Burger_Ingredients';
import BurgerControls from '../../Components/Burger Controls/Burger_Controls';
import Summary from '../../Components/Summary/Summary';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../Utilis/Spinner/Spinner';
// import Error from '../../Utilis/Error/Error';
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

    componentDidMount =  () => {
        this.props.initIngredient();
        // console.log('props: ' , this.props);
        // axiosInstance.get('/ingredients/-LVXhWhIqLVJ8UG3RSxG.json').then((res) => {
        //     var stateSnapshot = this.state;
            
        //     //update ingredients.
        //     stateSnapshot.ingredients = res.data;
            
        //     console.log('stateSnapshot.ingredients: ' , stateSnapshot.ingredients)

        //     //update loading state.
        //     stateSnapshot.loading = false;

        //     //Updating Price.
        //     for ( let type in stateSnapshot.ingredients){
        //         stateSnapshot.totalPrice += this.priceList[type] || 0;
        //     };

        //     this.setState(stateSnapshot);
        // }, (error) => {
        //     //update loading state.
        //     var stateSnapshot = this.state;
        //     stateSnapshot.loading = false;
        //     stateSnapshot.error = 'Error happened during retrieving the initial ingredients';
        //     this.setState(stateSnapshot);
        //     // console.log('error => ' , error);
        // })

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
    addIngredient = (ingredient) => {
        console.log("Inside addIngredient function");

        this.props.addIngredient(ingredient);
        
         //checking on price.
         this.disableCheckOut = false;
    }


    //Function to remove some incredient.
    removeIngredient = (ingredient) => {
        console.log("Inside removeIngredient function");
        
        if(this.props.ingredients[ingredient] > 0){
            this.props.removeIngredient(ingredient);
            
            //checking on price.
            //for simplicity for now.
            this.disableCheckOut = ( (this.props.totalPrice - 2) > .1) ? true : false;
        }

    }

    //Function to go to 'Checkout' page.
    toCheckout = () => {
        console.log("[Inside toCheckout function]");
    
        this.props.history.push({
            pathname: '/Burger_APP/Checkout',
        })

    }

   
    render () {
        //Handling the request delay of ingredients by Spinner.
        var ingredients = (this.props.ingredients) ? (<BurgerIngredients ingredients={this.props.ingredients}/>) : (<Spinner />);
        
        return(
            <React.Fragment>
                <h1 className={Classes['Builder-Title']}>Build Your Burger :)</h1>
                {ingredients}
                <BurgerControls 
                totalPrice = {this.props.totalPrice}
                addIngredient={this.addIngredient} 
                removeIngredient={this.removeIngredient}
                disableCheckOut = {this.disableCheckOut}
                checkoutClicked = {this.toggleSummaryModal} 
                />

                <Modal show={this.state.showSummaryModal ? 1: 0} hide={this.toggleSummaryModal}>
                    <Summary 
                    ingredients={this.props.ingredients} 
                    price={this.props.totalPrice}
                    cancelSummary={this.toggleSummaryModal}
                    toCheckout = {this.toCheckout}
                    />
                </Modal>
            </React.Fragment>
            
        );
    }

}


const mapStateToProps = state => {
    return {
      ingredients: state.ingredients.items,
      totalPrice: state.ingredients.totalPrice,
      loading: state.initalLoading
    }
}


const mapDispatchToProps = dispatch => {
    return {
      addIngredient: (ingredient) => dispatch(Actions.addIngredient(ingredient)), 
      removeIngredient: (ingredient) => dispatch(Actions.removeIngredient(ingredient)), 
      initIngredient: () => dispatch(Actions.initIngredients()), 
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandling(BurgerBuilder, axiosInstance));