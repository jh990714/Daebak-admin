import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authorsDatas from "layouts/tables/authorsTable/data/authorsData";

export const fetchMembers = createAsyncThunk("members/fetchMembers", async () => {
  // const response = await axios.get("http://localhost:8080/member/getMembers");

  // return response.data;
  return authorsDatas;
});

const memberSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = [...action.payload];
        console.log(state.members);
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default memberSlice.reducer;
