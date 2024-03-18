import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer ,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { courseSlice } from "./courseSlice";
import { quizSlice } from "./quizSlice";
import { assessmentSlice } from "./assessmentSlice";
import {documentSlice } from "./documentSice";

const persistCourse = {
  key: 'course',
  storage: storage, // Change this to localStorage
  whitelist: ['course'], 
};

const persistQuiz = {
  key: 'quizzes',
  storage: storage, // Change this to localStorage
  whitelist: ['quizzes'], 
};


const persistAssessment = {
  key: 'assessment',
  storage: storage, // Change this to localStorage
  whitelist: ['assessment'], 
};

const persistDocument = {
  key: 'document',
  storage: storage, // Change this to localStorage
  whitelist: ['document'],  
};

const persistedCourseReducer = persistReducer(persistCourse, courseSlice.reducer);
const persistedQuizReducer = persistReducer(persistQuiz, quizSlice.reducer);
const persistedDocumentReducer = persistReducer(persistDocument, documentSlice.reducer);
const persistedAssessmentReducer = persistReducer(persistAssessment, assessmentSlice.reducer);

export const store = configureStore({
  reducer: {
    course: persistedCourseReducer, 
    quizzes: persistedQuizReducer,
    documents: persistedDocumentReducer,
    assessment : persistedAssessmentReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      ignoredPaths: ['quizzes'] 
    },
  }),
});

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
