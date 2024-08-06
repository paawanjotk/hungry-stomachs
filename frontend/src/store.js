import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./components/CartSlice";
export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
