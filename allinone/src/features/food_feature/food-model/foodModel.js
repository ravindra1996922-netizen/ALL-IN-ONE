

export function buildFoodModel(foods, recipes) {
  const foodMap = new Map();

  foods.forEach((food) => {
    foodMap.set(food.id, food);
  });

  return recipes
    .map((recipe) => {
      const food = foodMap.get(recipe.foodId);
      if (!food) return null;

      return {
        id: food.id,
        name: food.name,
        category: food.category,
        image: food.image,
        price: food.price,
        type: "food",

        recipe: {
          id: recipe.id,
          cookTimeMinutes: recipe.cookTimeMinutes,
          cookTimeCategory: recipe.cookTimeCategory,
          videoUrl: recipe.videoUrl,

          steps: (recipe.steps || []).map((step) => ({
            stepNumber: step.stepNumber,
            title: step.title,

            ingredients: (step.ingredients || []).map((ing) => ({
              id: ing.id,
              name: ing.name,
              quantity: `${ing.qty} ${ing.unit}`,
              price: ing.price,
            })),

            description: step.description,
          })),
        },
      };
    })
    .filter(Boolean);
}

export function buildRecipeModel(foods, recipes) {
  const foodMap = new Map();

  foods.forEach((food) => {
    foodMap.set(food.id, food);
  });

  return recipes
    .map((recipe) => {
      const food = foodMap.get(recipe.foodId);
      if (!food) return null;

      return {
        id: `recipe-${recipe.id}`,
        name: food.name + " Recipe",
        category: "recipe",
        type: "recipe",
        image: food.image,

        cookTimeMinutes: recipe.cookTimeMinutes,
        cookTimeCategory: recipe.cookTimeCategory,
        videoUrl: recipe.videoUrl,
        steps: recipe.steps,
      };
    })
    .filter(Boolean);
}

export function buildUnifiedFoodData(foods, recipes) {
  const foodData = buildFoodModel(foods, recipes);
  const recipeData = buildRecipeModel(foods, recipes);

  return [...foodData, ...recipeData];
}

export function buildLandingData(data) {
  const result = {
    veg: [],
    nonveg: [],
    recipe: [],
  };

  data.forEach((item) => {
    if (item.category === "veg" && result.veg.length < 4) {
      result.veg.push(item);
    } else if (item.category === "nonveg" && result.nonveg.length < 4) {
      result.nonveg.push(item);
    } else if (item.category === "recipe" && result.recipe.length < 4) {
      result.recipe.push(item);
    }
  });

  return result;
}
