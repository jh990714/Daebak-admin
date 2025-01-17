import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 광고 데이터 가져오기
export const fetchAd = createAsyncThunk("ad/fetchAd", async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/ads`);
  return response.data;
});

// 광고 데이터 업데이트
export const fetchUpdateAd = createAsyncThunk("ad/fetchUpdateAd", async (formData) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/ads`, formData);
  return response.data;
});

// 광고 데이터 생성
export const fetchCreateAd = createAsyncThunk("ad/fetchCreateAd", async (formData) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/ads`, formData);
  return response.data;
});

// 광고 데이터 삭제
export const fetchDeleteAd = createAsyncThunk("ad/fetchDeleteAd", async (adId) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/ads/${adId}`);
  return adId;
});

const initialState = {
  ads: [],
  status: "idle",
  error: null,
};

const adSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Ads
      .addCase(fetchAd.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ads = action.payload;
      })
      .addCase(fetchAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Create Ad
      .addCase(fetchCreateAd.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCreateAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ads.push(action.payload);
      })
      .addCase(fetchCreateAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update Ad
      .addCase(fetchUpdateAd.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUpdateAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedAd = action.payload;
        state.ads = state.ads.map((ad) => (ad.adId === updatedAd.adId ? updatedAd : ad));
      })
      .addCase(fetchUpdateAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeleteAd.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDeleteAd.fulfilled, (state, action) => {
        state.status = "succeeded";
        const adId = action.payload;
        state.ads = state.ads.filter((ad) => ad.adId !== adId);
      })
      .addCase(fetchDeleteAd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default adSlice.reducer;
