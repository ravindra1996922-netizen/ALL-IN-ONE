
export function buildFoodModel(foods, recipes) {
  const recipeMap = new Map();

  recipes.forEach((recipe) => {
    recipeMap.set(recipe.id, recipe);
  });

  return foods
    .map((food) => {
      const recipe = recipeMap.get(food.recipeId);
      if (!recipe) return null;

      return {
        id: food.id,
        name: food.name,
        category: food.category, // veg / nonveg
        image: food.image,
        price: food.price,
        type: "food", // ✅ ADD

        recipe: {
          cookTimeMinutes: recipe.cookTimeMinutes,
          cookTimeCategory: recipe.cookTimeCategory,
          videoUrl: recipe.videoUrl,

          steps: recipe.steps.map((step) => ({
            stepNumber: step.stepNumber,
            title: step.title,
            ingredients: step.ingredients.map((ing) => ({
              name: ing.name,
              quantity: `${ing.qty} ${ing.unit}`,
            })),
            description: step.description,
          })),
        },
      };
    })
    .filter(Boolean);
}

// ✅ RECIPE MODEL (separate item for filter)
export function buildRecipeModel(foods, recipes) {
  const foodMap = new Map();

  foods.forEach((food) => {
    foodMap.set(food.recipeId, food);
  });

  return recipes
    .map((recipe) => {
      const food = foodMap.get(recipe.id);
      if (!food) return null;

      return {
        id: "recipe-" + recipe.id, // ✅ unique id
        name: food.name + " Recipe", // ✅ proper name
        category: "recipe", // 🔥 IMPORTANT
        type: "recipe", // 🔥 IMPORTANT

        image: food.image,

        cookTimeMinutes: recipe.cookTimeMinutes,
        cookTimeCategory: recipe.cookTimeCategory,
        videoUrl: recipe.videoUrl,
        steps: recipe.steps,
      };
    })
    .filter(Boolean);
}

// ✅ MERGE BOTH (MOST IMPORTANT)
export function buildUnifiedFoodData(foods, recipes) {
  const foodData = buildFoodModel(foods, recipes);
  const recipeData = buildRecipeModel(foods, recipes);

  return [...foodData, ...recipeData];
}

// ✅ LANDING DATA
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
