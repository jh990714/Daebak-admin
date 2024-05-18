import { configureStore } from "@reduxjs/toolkit";
import productReducer, { fetchProducts } from "./slices/productSlice";
import memberReducer, { fetchMembers } from "./slices/memberSlice";
import couponReducer, { fetchCoupons } from "./slices/couponSlice";
import reviewReducer, { fetchReviews } from "./slices/reviewSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    members: memberReducer,
    coupons: couponReducer,
    reviews: reviewReducer,
  },
});

export default store;
