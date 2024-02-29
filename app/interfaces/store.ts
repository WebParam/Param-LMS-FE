import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer ,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { courseSlice } from "../redux/courseSlice";
import { quizSlice } from "../redux/quizSlice";
import {documentSlice } from "../redux/documentSice";

const persistCourse = {
  key: 'course',
  storage: storage, // Change this to localStorage
  whitelist: ['course'], 
};

const persistQuiz = {
  key: 'quiz',
  storage: storage, // Change this to localStorage
  whitelist: ['quiz'], 
};

const persistDocument = {
  key: 'document',
  storage: storage, // Change this to localStorage
  whitelist: ['document'],  
};

const persistedCourseReducer = persistReducer(persistCourse, courseSlice.reducer);
const persistedQuizReducer = persistReducer(persistQuiz, quizSlice.reducer);
const persistedDocumentReducer = persistReducer(persistDocument, documentSlice.reducer);

export const store = configureStore({
  reducer: {
    course: persistedCourseReducer, 
    quizzes: persistedQuizReducer,
    documents: persistedDocumentReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      ignoredPaths: ['quiz'] 
    },
  }),
});

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
