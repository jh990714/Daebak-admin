import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import datas from "layouts/tables/productTable/data/datas";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("http://localhost:8080/product/getProducts");
  console.log("productResponse");

  return response.data;
  // return datas;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        console.log("dd", state.products);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
