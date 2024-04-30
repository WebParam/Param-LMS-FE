import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { courseSlice } from "./courseSlice";
import { quizSlice } from "./quizSlice";
import { assessmentSlice } from "./assessmentSlice";
import {documentSlice } from "./documentSice";
import { watchedVideoSlice } from "./watcheVideosSlice";
import { analyticsSlice } from "./courseAnalyticSlice"; 
import pageReloadMiddleware from './pageReloadMiddleware';


const persistCourse = {
  key: 'course',
  storage: storage,
  whitelist: ['course'],
};

const persistQuiz = {
  key: 'quizzes',
  storage: storage,
  whitelist: ['quizzes'],
};

const persistAssessment = {
  key: 'assessment',
  storage: storage,
  whitelist: ['assessment'],
};

const persistDocument = {
  key: 'documents',
  storage: storage,
  whitelist: ['documents'],
};

const persistWatchedVideo = {
  key: 'videos',
  storage: storage,
  whitelist: ['videos'],
};

const persistAnalytics = {
  key: 'analytics', 
  storage: storage,
  whitelist: ['studentSectionAnalytics', 'studentAssessmentAnalytics', 'studentQuizAnalytics'],
};

const persistedCourseReducer = persistReducer(persistCourse, courseSlice.reducer);
const persistedQuizReducer = persistReducer(persistQuiz, quizSlice.reducer);
const persistedDocumentReducer = persistReducer(persistDocument, documentSlice.reducer);
const persistedWatchedVideoReducer = persistReducer(persistWatchedVideo, watchedVideoSlice.reducer);
const persistedAssessmentReducer = persistReducer(persistAssessment, assessmentSlice.reducer);
const persistedAnalyticsReducer = persistReducer(persistAnalytics, analyticsSlice.reducer);

export const store = configureStore({
  reducer: {
    course: persistedCourseReducer,
    quizzes: persistedQuizReducer,
    documents: persistedDocumentReducer,
    assessment: persistedAssessmentReducer,
    watchedVideos: persistedWatchedVideoReducer,
    analytics: persistedAnalyticsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['quizzes']
      },
    }).concat(pageReloadMiddleware), 
});

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
