import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const productId = action.payload;
      const prodIdx = state.products.findIndex(
        (product) => product._id === productId
      );
      if (prodIdx === -1) state.products.push({ _id: productId, quantity: 1 });
      else state.products[prodIdx].quantity += 1;
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      const prodIdx = state.products.findIndex(
        (product) => product._id === productId
      );
      if (prodIdx !== -1) {
        state.products[prodIdx].quantity -= 1;
        if (state.products[prodIdx].quantity === 0)
          state.products.splice(prodIdx, 1);
      }
    },
  },
});
export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
