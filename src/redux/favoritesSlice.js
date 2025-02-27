import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const existingIndex = state.favoriterecipes.findIndex(
        (recipe) => recipe.idFood === action.payload.idFood
      );

      if (existingIndex !== -1) {
        // Remove the recipe if it already exists
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Add the recipe if it's not already in the favorites
        state.favoriterecipes.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
