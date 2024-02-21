import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { courseSlice } from "../redux/courseSlice";
import { quizSlice } from "../redux/quizSlice";
import {documentSlice } from "../redux/documentSice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['course','quiz'], 
};

const persistedCourseReducer = persistReducer(persistConfig, courseSlice.reducer);

const persistedQuizReducer = persistReducer(persistConfig, quizSlice.reducer);

const persistedDocumentReducer = persistReducer(persistConfig, documentSlice.reducer);

export const store = configureStore({
  reducer: {
    course: persistedCourseReducer, 
    quizzes: persistedQuizReducer,
    documents: persistedDocumentReducer
  },
  devTools: true,
});

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
