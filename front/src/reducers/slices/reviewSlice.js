import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchReviews 액션 정의
export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async () => {
  try {
    const response = await axios.get("http://localhost:8080/review/all");
    console.log("reviewResponse", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});

export const fetchSaveReviews = createAsyncThunk(
  "reviews/fetchSaveReviews",
  async ({ reviewId, reviewResponse }) => {
    try {
      const response = await axios.put(`http://localhost:8080/review/${reviewId}`, reviewResponse);
      console.log("reviewResponse", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  }
);

// reviewtSlice 정의
const reviewtSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSaveReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaveReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = state.reviews.map((review) =>
          review.reviewId === action.payload.reviewId ? action.payload : review
        );
        console.log(state.reviews);
      })
      .addCase(fetchSaveReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateReview } = reviewtSlice.actions;
export default reviewtSlice.reducer;
