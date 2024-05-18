import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authorsDatas from "layouts/tables/authorsTable/data/authorsData";

export const fetchMembers = createAsyncThunk("members/fetchMembers", async () => {
  const response = await axios.get("http://localhost:8080/member/getMembers");

  return response.data;
});

export const saveMember = createAsyncThunk("members/saveMember", async (memberData) => {
  const response = await axios.put(`http://localhost:8080/member/updateCoupon`, memberData);
  return response.data;
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
      })
      .addCase(saveMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.members = state.members.map((member) =>
          member.id === action.payload.id ? action.payload : member
        );
      })
      .addCase(saveMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default memberSlice.reducer;
