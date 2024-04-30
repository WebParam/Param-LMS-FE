import { createSlice } from "@reduxjs/toolkit";
import { IStudentSectionAnalyticDetails, IStudentAssessmentAnalytic, IStudentQuizAnalytics, IStudentSectionAverage, IStudentAssessmentAverage, IStudentQuizAverage } from "../interfaces/analytics";
import { AppStore } from "./store";

interface AnalyticsState {
  studentSectionAnalytics: IStudentSectionAnalyticDetails[] | IStudentSectionAverage[];
  studentAssessmentAnalytics: IStudentAssessmentAnalytic[] | IStudentAssessmentAverage[];
  studentQuizAnalytics: IStudentQuizAnalytics[] | IStudentQuizAverage[];
}

const initialState: AnalyticsState = {
  studentSectionAnalytics: [],
  studentAssessmentAnalytics: [],
  studentQuizAnalytics: []
};

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    saveStudentSectionAnalytics(state, action) {
      state.studentSectionAnalytics = action.payload;
    },
    saveStudentAssessmentAnalytics(state, action) {
      state.studentAssessmentAnalytics = action.payload;
    },
    saveStudentQuizAnalytics(state, action) {
      state.studentQuizAnalytics = action.payload;
    },
    resetAnalticState: (state) => {
        Object.assign(state, initialState); 
      },
  }
});

export const {
  saveStudentSectionAnalytics,
  saveStudentAssessmentAnalytics,
  saveStudentQuizAnalytics,
  resetAnalticState
} = analyticsSlice.actions;

export const selectStudentSectionAnalytics = (state:AppStore) => state.analytics.studentSectionAnalytics;
export const selectStudentAssessmentAnalytics = (state:AppStore) => state.analytics.studentAssessmentAnalytics;
export const selectStudentQuizAnalytics = (state:AppStore) => state.analytics.studentQuizAnalytics;

export default analyticsSlice.reducer;
