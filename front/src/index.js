import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import store from "reducers/store";
import { fetchProducts } from "reducers/slices/productSlice";
import { fetchMembers } from "reducers/slices/memberSlice";
import { fetchCoupons } from "reducers/slices/couponSlice";
import { fetchReviews } from "reducers/slices/reviewSlice";

const container = document.getElementById("app");
const root = createRoot(container);

store.dispatch(fetchProducts());
store.dispatch(fetchMembers());
store.dispatch(fetchCoupons());
store.dispatch(fetchReviews());

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </Provider>
  </BrowserRouter>
);
