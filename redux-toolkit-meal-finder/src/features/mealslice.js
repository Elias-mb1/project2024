import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asynchronous thunk to fetch meals from TheMealDB API based on a search term
export const fetchMeals = createAsyncThunk('meals/fetchMeals', async (title) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`);
  const data = await response.json();
  return data.meals;  //Returnerar en array med måltider
});

const mealSlice = createSlice({
  name: 'meals',  // Slice namnet, vilket också används för att namnge actions
  initialState: { // Den initiala staten
    items: [],    // En tom lista som kommer fyllas med måltider
    status: 'idle',  // Status för att spåra om data laddas, har laddats eller misslyckats
    error: null   // Felhantering om något går fel
  },
  reducers: {
    clearMeals: (state) => {  // Reducer för att rensa måltidslistan
      state.items = [];
    }
  },
  extraReducers: (builder) => {  // Används för att hantera async-thunks
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = 'loading';  // Status när API-anropet pågår
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Status när API-anropet lyckas
        state.items = action.payload || [];  // Uppdaterar listan med måltider
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = 'failed';  // Status när API-anropet misslyckas
        state.error = action.error.message;  // Spara felmeddelandet
      });
  }
});


export const { clearMeals } = mealSlice.actions;

export default mealSlice.reducer;
