import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items)); // Persist to localStorage
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.items)); // Persist to localStorage
    },
    loadCart: (state) => {
      state.items = JSON.parse(localStorage.getItem("cart")) || [];
    },
  },
});

export const { addToCart, removeFromCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
