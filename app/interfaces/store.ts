import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { courseSlice } from "../redux/courseSlice";
import {viewCourseSlice} from "../redux/viewCourseSlice";
import { quizSlice } from "../redux/quizSlice";


export const store = configureStore({
    reducer: {
      [courseSlice.name]: courseSlice.reducer,
      [viewCourseSlice.name]:viewCourseSlice.reducer,
      [quizSlice.name]:quizSlice.reducer
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;