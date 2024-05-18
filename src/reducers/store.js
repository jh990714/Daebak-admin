import { configureStore } from "@reduxjs/toolkit";
import productReducer, { fetchProducts } from "./slices/productSlice";
import memberReducer, { fetchMembers } from "./slices/memberSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    members: memberReducer,
  },
});

export default store;
