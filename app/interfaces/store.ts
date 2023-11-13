import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { courseSlice } from "../courseSlice";
import {viewCourseSlice} from "../viewCourseSlice";


export const store = configureStore({
    reducer: {
      [courseSlice.name]: courseSlice.reducer,
      [viewCourseSlice.name]:viewCourseSlice.reducer
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;