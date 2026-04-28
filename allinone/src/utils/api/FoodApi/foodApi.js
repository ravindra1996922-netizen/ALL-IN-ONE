import { END_POINTS } from "../../constant/constant";
import { buildURL } from "../apibuilder/api_builder";

export async function fetchFoods() {
  const foods = END_POINTS.foods;
  const url = buildURL(foods);
  try {
    const foodsResponse = await fetch(url);
    const foodsData = await foodsResponse.json();

    return foodsData;
  } catch (error) {}
}

export async function fetchRecipes() {
  const recipes = END_POINTS.recipes;

  const url = buildURL(recipes);

  try {
    const recipesResponse = await fetch(url);
    const recipesData = await recipesResponse.json();

    return recipesData;
  } catch (error) {}
}