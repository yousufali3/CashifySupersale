import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart"))?.items || [], // Ensure items are fetched correctly
  totalQuantity: JSON.parse(localStorage.getItem("cart"))?.totalQuantity || 0, // Initialize totalQuantity
  totalPrice: JSON.parse(localStorage.getItem("cart"))?.totalPrice || 0, // Initialize totalPrice
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.totalQuantity++; // Increment totalQuantity only when a new item is added
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalPrice += newItem.price; // Update totalPrice for both new and existing items

      // Save cart and totals to localStorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: state.items,
          totalQuantity: state.totalQuantity,
          totalPrice: state.totalPrice,
        })
      );
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      const itemToRemove = state.items.find((item) => item.id === idToRemove);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity; // Decrement totalQuantity by the quantity of the removed item
        state.totalPrice -= itemToRemove.totalPrice; // Decrement totalPrice by the totalPrice of the removed item
        state.items = state.items.filter((item) => item.id !== idToRemove);
      }
      // Reset to zero if no items left
      if (state.items.length === 0) {
        state.totalQuantity = 0;
        state.totalPrice = 0;
      }
      // Save updated cart and totals to localStorage
      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: state.items,
          totalQuantity: state.totalQuantity,
          totalPrice: state.totalPrice,
        })
      );
    },
    // ... other reducers ...
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
