import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchProducts 액션 정의
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await axios.get("http://localhost:8080/product/getProducts");
    console.log("productResponse");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});

export const fetchUpdateProduct = createAsyncThunk(
  "products/fetchUpdateProduct",
  async (product) => {
    try {
      const response = await axios.post("http://localhost:8080/product", product);
      console.log("productResponse");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error; // 에러를 던져서 rejected 상태로 전환
    }
  }
);

// productSlice 정의
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
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.map((product) =>
          product.productId === action.payload.productId ? action.payload : product
        );
      })
      .addCase(fetchUpdateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
