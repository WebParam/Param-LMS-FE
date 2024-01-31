import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { courseSlice } from "../redux/courseSlice";
import { quizSlice } from "../redux/quizSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['course','quiz'], 
};

const persistedCourseReducer = persistReducer(persistConfig, courseSlice.reducer);

const persistedQuizReducer = persistReducer(persistConfig, quizSlice.reducer);

export const store = configureStore({
  reducer: {
    course: persistedCourseReducer, 
    quizzes: persistedQuizReducer,
  },
  devTools: true,
});

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
