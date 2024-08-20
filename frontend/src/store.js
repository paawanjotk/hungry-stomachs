import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./components/CartSlice";
import { authSlice } from "./components/AuthSlice";
export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});
