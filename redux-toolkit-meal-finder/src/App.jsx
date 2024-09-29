import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeals, clearMeals } from './features/mealslice';
import { route,routes } from 'react-router-dom'

function App() {

  <routes>
    <h1>google</h1>
    <route path= "/" element route= {<home />}/>
    <route path= "/about" element/>
  </routes>
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals.items);
  const mealStatus = useSelector((state) => state.meals.status);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a meal name to search');
      return;
    }
    dispatch(fetchMeals(searchTerm));  // Dispatchar thunk-action för att söka efter måltider
  };
  
  const handleClear = () => {
    setSearchTerm('');  // Rensar sökfältet
    dispatch(clearMeals());  // Rensar måltidslistan från state
  };
  

  return (
    <div>
      <h1>Meal Finder</h1>

      {/* Search Field */}
      <div>
        <input
          type="text"
          placeholder="Search for a meal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {/* Meal List */}
      <div>
        {mealStatus === 'loading' && <div>Loading...</div>}
        {mealStatus === 'succeeded' && meals && meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.idMeal}>
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} width="200px" />
              <p>{meal.strInstructions.slice(0, 100)}...</p>
            </div>
          ))
        ) : (
          mealStatus === 'succeeded' && <div>No meals found!</div>
        )}
        {mealStatus === 'failed' && <div>Error loading meals!</div>}
      </div>
    </div>
  );
}

export default App;
