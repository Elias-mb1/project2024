import { configureStore } from '@reduxjs/toolkit';
import mealReducer from '../features/mealSlice';

const store = configureStore({
  reducer: {
    meals: mealReducer
  },
});

export default store;
