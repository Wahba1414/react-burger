import React from 'react';
import BurgerIngredient from './Burger Ingredient/Burger_Ingredient';
import Classes from './Burger_Ingredients.css';

function burgerIngredients (props){
    //props contains all burger ingredients to render.
    var ingredients = [];

    if(props.ingredients){
        // Normal rendering.
        // var keys = Object.keys(props.ingredients);
        // keys.forEach(function(key){
        //     for(let counter = 0; counter < props.ingredients[key] ; counter++){
        //         ingredients.push(
        //             <BurgerIngredient key={key+counter} type={key}/>
        //         )  
        //     }
        // });

        //Advanced one.
        // Adding the top bread.
        var propsSnapshot = {...props.ingredients};
        
        ingredients.push(
            <BurgerIngredient key={'Top-Bread'} type={'Top-Bread'}/>
        );

        var nextIngredient = 'Salat';

        while( propsSnapshot['Salat'] || propsSnapshot['Cheese'] || propsSnapshot['Meat'] ){
            //for debugging.
            // console.log('Iteration started');
            // console.log('nextIngredient: ' , nextIngredient);
            // console.log('propsSnapshot: ' , propsSnapshot);
            
            if(propsSnapshot[nextIngredient] > 0){
                ingredients.push(
                    <BurgerIngredient key={nextIngredient + propsSnapshot[nextIngredient]} type={nextIngredient}/>
                );
                propsSnapshot[nextIngredient]--;
            }
            
            
            switch(nextIngredient){
                case 'Salat':
                nextIngredient = 'Meat';
                break;

                case 'Meat':
                nextIngredient = 'Cheese';
                break;

                case 'Cheese':
                nextIngredient = 'Salat';
                break;

                default:
                nextIngredient = 'Salat';
                break;
            }
            
        }

        // Adding the bottom bread.
        ingredients.push(
            <BurgerIngredient key={'Bottom-Bread'} type={'Bottom-Bread'}/>
        );

    }

    return(
        <div className={Classes['Burger-Ingredients']}>
            {ingredients}
        </div>
    );
}


export default burgerIngredients;