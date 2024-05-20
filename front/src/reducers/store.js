import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import memberReducer from "./slices/memberSlice";
import couponReducer from "./slices/couponSlice";
import reviewReducer from "./slices/reviewSlice";
import qnaReducer from "./slices/qnaSlice";
import categoryReducer from "./slices/categorySlice";
import dealProductReducer from "./slices/dealProductSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    members: memberReducer,
    coupons: couponReducer,
    reviews: reviewReducer,
    qnas: qnaReducer,
    categories: categoryReducer,
    dealProducts: dealProductReducer,
  },
});

export default store;
