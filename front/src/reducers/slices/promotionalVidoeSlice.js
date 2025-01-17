import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 광고 비디오 가져오기
export const fetchPromotionalVideo = createAsyncThunk(
  "promotionalVideo/fetchPromotionalVideo",
  async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/promotionalVideo`);

      console.log("video", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching promotional videos:", error);
      throw error;
    }
  }
);

// 광고 비디오 업데이트
export const fetchUpdatePromotionalVideo = createAsyncThunk(
  "promotionalVideo/fetchUpdatePromotionalVideo",
  async (formData) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/promotionalVideo`,
        formData
      );

      console.log("update video", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating promotional video:", error);
      throw error;
    }
  }
);

// 광고 비디오 생성
export const fetchCreatePromotionalVideo = createAsyncThunk(
  "promotionalVideo/fetchCreatePromotionalVideo",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/promotionalVideo`,
        formData
      );

      console.log("create video", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating promotional video:", error);
      throw error;
    }
  }
);

// 광고 비디오 삭제
export const fetchDeletePromotionalVideo = createAsyncThunk(
  "promotionalVideo/fetchDeletePromotionalVideo",
  async (videoId) => {
    try {
      console.log("delete video", videoId);
      await axios.delete(`${process.env.REACT_APP_API_URL}/promotionalVideo?id=${videoId}`);

      return videoId; // 반환된 videoId를 그대로 사용
    } catch (error) {
      console.error("Error deleting promotional video:", error);
      throw error;
    }
  }
);

const promotionalVideoSlice = createSlice({
  name: "promotionalVideo",
  initialState: {
    promotionalVideos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromotionalVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPromotionalVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.promotionalVideos = action.payload;
      })
      .addCase(fetchPromotionalVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUpdatePromotionalVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdatePromotionalVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPromotionalVideo = action.payload;
        const index = state.promotionalVideos.findIndex(
          (promotionalVideo) => promotionalVideo.videoId === updatedPromotionalVideo.videoId
        );

        if (index !== -1) {
          state.promotionalVideos[index] = updatedPromotionalVideo;
        } else {
          state.promotionalVideos.push(updatedPromotionalVideo);
        }
      })
      .addCase(fetchUpdatePromotionalVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCreatePromotionalVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreatePromotionalVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.promotionalVideos.push(action.payload);
      })
      .addCase(fetchCreatePromotionalVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDeletePromotionalVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeletePromotionalVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedVideoId = action.payload;

        state.promotionalVideos = state.promotionalVideos.filter(
          (promotionalVideo) => promotionalVideo.videoId !== deletedVideoId
        );
      })
      .addCase(fetchDeletePromotionalVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default promotionalVideoSlice.reducer;
