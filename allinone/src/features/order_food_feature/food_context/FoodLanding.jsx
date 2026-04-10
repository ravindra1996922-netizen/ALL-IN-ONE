import React, { useEffect, useState } from 'react'
import { fetchFoods } from '../api/api';

const FoodLanding = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPageNo, setCurrentpageNo] = useState(1);

const [recipes, setRecipes] = useState([]);
    const [loadingRecipes, setLoadingRecipes] = useState(true);
    const [currentRecipesPageNo, setCurrentRecipespageNo] = useState(1);

  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);

        const data = await fetchFoods(2);

        setFoods(data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);
  


  return (
   <>
   <h1>Food</h1>

      {/* 🔥 Loading UI */}
      {loading ? (
        <p>Loading foods...</p>
      ) : (
        foods.map((item) => (
          <div key={item.id}>
            {item.name || item.category}
          </div>
        ))
      )}
       <h1>RECIPES</h1>

      {/* 🔥 Loading UI */}
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        foods.map((item) => (
          <div key={item.id}>
            {item.title || item.ingredients}
          </div>
        ))
      )}
   </>
  )
}

export default FoodLanding
