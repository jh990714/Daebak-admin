import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchCoupons 액션 정의
export const fetchCoupons = createAsyncThunk("coupons/fetchCoupons", async () => {
  try {
    const response = await axios.get("http://localhost:8080/coupon/all");
    console.log("couponResponse");
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});

// coupontSlice 정의
const coupontSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateCoupon } = coupontSlice.actions;
export default coupontSlice.reducer;
