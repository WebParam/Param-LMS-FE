import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { courseSlice } from "../redux/courseSlice";
import {viewCourseSlice} from "../redux/viewCourseSlice";
import { quizSlice } from "../redux/quizSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: quizSlice.name
};


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