import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetchQnas 액션 정의
export const fetchQnas = createAsyncThunk("qnas/fetchQnas", async () => {
  try {
    const response = await axios.get("http://localhost:8080/qna/all");
    console.log("qnaResponse", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching qnas:", error);
    throw error; // 에러를 던져서 rejected 상태로 전환
  }
});

// qnatSlice 정의
const qnatSlice = createSlice({
  name: "qnas",
  initialState: {
    qnas: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQnas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQnas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.qnas = action.payload;
      })
      .addCase(fetchQnas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateQna } = qnatSlice.actions;
export default qnatSlice.reducer;
