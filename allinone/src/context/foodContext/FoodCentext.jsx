import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { fetchFoods, fetchRecipes } from '../../utils/api/FoodApi/foodApi';


export const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

const initialValue = {
    foodCache: {},
    recipesCache: {},
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
                ...foodState, loading: false, foodCache : {...foodState.foodCache,[action.payload.page] : action.payload.foodResponse},
                recipesCache : { ...foodState.recipesCache, [action.payload.page] : action .payload.recipieResponse}
            }
        case "FETCH_ERROR":
            return {
                ...foodState, loading:false, error: action.payload
            }
        default:
            break;
    }
}

export const ITEMS_PER_PAGE = 10;
export const SERVER_LIMIT = 30;
export const PAGES_PER_FETCH = SERVER_LIMIT / ITEMS_PER_PAGE;


const FoodProvider = ({ children }) => {

    const [foodState, foodDispatcher] = useReducer(reducer, initialValue);

    const { foodCache, recipesCache, currentPage } = foodState;
    
    const fectPageNo = Math.ceil(currentPage/PAGES_PER_FETCH);

    useEffect(() => {

        if(foodCache[fectPageNo]) return;
             
        foodDispatcher({ type: "FETCH_START" });
         const loadingFoodData = async () => {

        try {
                const foodResponse = await fetchFoods(fectPageNo);
                const recipieResponse = await fetchRecipes(fectPageNo);
                foodDispatcher({type: "FETCH_SUCESS", payload: {page: fectPageNo ,foodResponse, recipieResponse}});

            }
         catch (error) {
                foodDispatcher({type: "FETCH_ERROR", payload: error.message})

        }
    }


loadingFoodData();

    }, [fectPageNo])


    return (
        <FoodContext.Provider value={{ ...foodState,foodDispatcher }} >

            {children}


        </FoodContext.Provider>
    )
}

export default FoodProvider
