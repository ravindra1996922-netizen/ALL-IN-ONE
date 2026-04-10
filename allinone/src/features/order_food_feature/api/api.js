import { FOODS_ENDPOINTS } from "./foods_endpoint"

import { buildURL } from "../../../api/api_builder";
// Food
export async function fetchFoods(page) {
    const foods = FOODS_ENDPOINTS.foods;
   const url =  buildURL(foods);
   url.searchParams.set("_page", page);
   url.searchParams.set("_limit", 30);
   try {
const foodsResponse = await fetch(url);
   const foodsData = await foodsResponse.json();
   return foodsData;
//    console.log(foodsData.length);
   }
   catch(error) {}
   
}
 
// Recipe
export async function fetchRecipes(page) {
        const recipes = FOODS_ENDPOINTS.recipes;

     const url = buildURL(recipes);
     url.searchParams.set("_page", page);
     url.searchParams.set("_limit", 30);
     try{
     const recipesResponse = await fetch(url);
     const recipesData = await recipesResponse.json();
     return recipesData;
     console.log(recipesData.length);
     }
     catch(error) {}
}
