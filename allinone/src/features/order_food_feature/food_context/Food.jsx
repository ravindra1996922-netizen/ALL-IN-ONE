import React from 'react'
import { createContext } from 'react'
import { useFood } from '../../../context/foodContext/FoodCentext'

const Food = () => {
  const { 
    foodCache,
    recipesCache,
    loading,
    error,
    currentPage,foodDispatcher} = useFood()

  return (
    <div>
      {/* {foodCache["1"].map(ele => <h1>{ele}</h1>)} */}
      <h1>{loading}</h1>
    </div>
  )
}

export default Food
