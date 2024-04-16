// timeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserTimeState } from "../interfaces/analytics";
import Cookies from "universal-cookie";
import { AppStore } from "./store";

const cookies = new Cookies();
const loggedInUser = cookies.get("param-lms-user");

const initialState: IUserTimeState = {
  time: {
    loginTime: null,
    logoutTime: null,
  }
};

export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setLoginTime(state, action: PayloadAction<number>) {
      state.time.loginTime = action.payload;
      localStorage.setItem("loginTime", JSON.stringify( state.time.loginTime));
    },
    setLogoutTime(state, action: PayloadAction<number>) {
      state.time.logoutTime = action.payload;
      localStorage.setItem("logoutTime", JSON.stringify( state.time.logoutTime));

    },
    resetTimeState(state) {
      state.time.loginTime = null;
      state.time.logoutTime = null;
    },
  },
});

export const {
  setLoginTime,
  setLogoutTime,
  resetTimeState,
} = timeSlice.actions;

export const getTimeForEdit = (state: AppStore) => state.time;

export default timeSlice.reducer;
