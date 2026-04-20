export function buildFoodModel(foods, recipes) {



  const recipeMap = new Map();
  recipes.forEach(recipe => {
    recipeMap.set(recipe.id, recipe);
  });

  

  return foods.map(food => {
    const recipe = recipeMap.get(food.recipeId);
    // console.log(recipe)

    if (!recipe) return null;

    return {
      id: food.id,
      name: food.name,
      category: food.category,
      image: food.image,
      price: food.price,

      recipe: {
        cookTimeMinutes: recipe.cookTimeMinutes,
        cookTimeCategory: recipe.cookTimeCategory,
        videoUrl: recipe.videoUrl,

        steps: recipe.steps.map(step => ({
          stepNumber: step.stepNumber,
          title: step.title,

          ingredients: step.ingredients.map(ing => ({
            name: ing.name,
            quantity: `${ing.qty} ${ing.unit}`
          })),

          description: step.description
        }))
      }
    };
  }).filter(Boolean);
}

export function buildRecipeModel(foods, recipes) {

  const foodMap = new Map();
  foods.forEach(food => {
    foodMap.set(food.recipeId, food);
  });

  return recipes.map(recipe => {
    const food = foodMap.get(recipe.id);

    if (!food) return null;

    return {
      id: recipe.id,

      name: food.name,
      category: food.category,
      image: food.image,

      cookTimeMinutes: recipe.cookTimeMinutes,
      cookTimeCategory: recipe.cookTimeCategory,
      videoUrl: recipe.videoUrl,
      steps: recipe.steps
    };
  }).filter(Boolean);
}

export function buildLandingData(foods, recipes) {

  const result = {
    veg: [],
    nonveg: [],
    recipe: recipes.slice(0, 4)
  };

  console.log(result.recipe);
 
  foods.forEach(food => {
    if (food.category === "veg" && result.veg.length < 4) {
      result.veg.push(food);
    }
    else if (food.category === "nonveg" && result.nonveg.length < 4) {
      result.nonveg.push(food);
    }
  });


  return result;
}