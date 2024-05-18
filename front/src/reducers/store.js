import { configureStore } from "@reduxjs/toolkit";
import productReducer, { fetchProducts } from "./slices/productSlice";
import memberReducer, { fetchMembers } from "./slices/memberSlice";
import couponReducer, { fetchCoupons } from "./slices/couponSlice";
import reviewReducer, { fetchReviews } from "./slices/reviewSlice";
import qnaReducer, { fetchQnas } from "./slices/qnaSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    members: memberReducer,
    coupons: couponReducer,
    reviews: reviewReducer,
    qnas: qnaReducer,
  },
});

export default store;
