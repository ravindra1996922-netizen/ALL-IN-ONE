import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { fetchFoods, fetchRecipes } from '../../utils/api/FoodApi/foodApi';
import { buildFoodModel, buildLandingData, buildRecipeModel } from '../../features/food_feature/food-model/foodModel';



export const FoodContext = createContext();



const initialValue = {
        foodCache: [],
        recipesCache: [],
        loading: true,
        error: null,
        currentPage: 1
}

function reducer(foodState, action) {


    switch (action.type) {
        case "FETCH_START":
            return {
                ...foodState, loading: true, error: null
            }
        case "FETCH_SUCESS":
            return {
                ...foodState, loading: false, foodCache : [...foodState.foodCache,...action.payload.foodData],
                recipesCache : [ ...foodState.recipesCache,...action .payload.recipiedata]
            }
        case "FETCH_ERROR":
            return {
                ...foodState, loading:false, error: action.payload
            }
       
            default:
    return foodState;
           
    }
}

export const ITEMS_PER_PAGE = 10;
export const SERVER_LIMIT = 30;
export const PAGES_PER_FETCH = SERVER_LIMIT / ITEMS_PER_PAGE;


const FoodProvider = ({ children }) => {

    const [foodState, foodDispatcher] = useReducer(reducer, initialValue);

    const { foodCache, recipesCache, currentPage } = foodState;


    useEffect(() => {

        // if(foodCache[fectPageNo]) return;
             
        foodDispatcher({ type: "FETCH_START" });
         const loadingFoodData = async () => {

        try {
                const foodResponse = await fetchFoods ();
                const recipieResponse = await fetchRecipes();
             const foodData= buildFoodModel(foodResponse,recipieResponse)
             const recipiedata=buildRecipeModel(foodResponse,recipieResponse)
          const land=   buildLandingData(foodResponse,recipieResponse)
          console.log(land,"ln")
                foodDispatcher({type: "FETCH_SUCESS", payload: {foodData, recipiedata}});

            }
         catch (error) {
                foodDispatcher({type: "FETCH_ERROR", payload: error.message})

        }
    }


loadingFoodData();

    }, [])


    return (
        <FoodContext.Provider value={{ ...foodState,foodCache,foodDispatcher }} >

            {children}


        </FoodContext.Provider>
    )
}

export default FoodProvider
