import { createSlice } from "@reduxjs/toolkit";
import { AppStore } from "./store";
import { IWatchedVideo, IWatchedVideos } from "../interfaces/courses";

import Cookies from "universal-cookie";

const cookies = new Cookies();
const user = cookies.get("param-lms-user");

export const initialState: IWatchedVideos = {
  videos: [] as IWatchedVideo[],
};

export const watchedVideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setSelectedWatchedForEdit(state, action) {
      return action.payload;
    },

    createWatchedDetail(state, action) {
      const _action = action.payload as IWatchedVideo;
      const newWatchedVideo: IWatchedVideo = {
        courseId: _action.courseId,
        videoId: _action.videoId,
        studentId: user?.id,
        watched: _action.watched,
      };

      state.videos.push(newWatchedVideo);
    },
  },
});

export const { createWatchedDetail } = watchedVideoSlice.actions;

export const getSelectedWatchedVideoForEdit = (state: AppStore) =>
  state.watchedVideos.videos;

export default watchedVideoSlice.reducer;
