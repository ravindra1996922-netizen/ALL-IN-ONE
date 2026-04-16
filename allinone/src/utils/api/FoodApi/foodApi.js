import { END_POINTS } from "../../constant/constant";
import { buildURL } from "../apibuilder/api_builder";


export async function fetchFoods(page) {
  const foods = END_POINTS.foods;
  const url = buildURL(foods);
  url.searchParams.set("_page", page);
  url.searchParams.set("_limit", 30);
  try {
    const foodsResponse = await fetch(url);
    const foodsData = await foodsResponse.json();
    return foodsData;
  } catch (error) {}
}

// Recipe
export async function fetchRecipes(page) {
  const recipes = END_POINTS.recipes;

  const url = buildURL(recipes);
  url.searchParams.set("_page", page);
  url.searchParams.set("_limit", 30);
  try {
    const recipesResponse = await fetch(url);
    const recipesData = await recipesResponse.json();
    return recipesData;
  } catch (error) {}
}
