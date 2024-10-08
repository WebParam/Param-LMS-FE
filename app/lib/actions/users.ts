import { get, post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import {
  IAdminPasswordChangeReset,
  IAdminUpdateUser,
} from "@/app/interfaces/user";
import { rUserUrl, wUserUrl } from "./endpoints";

export const login = async (email: string, password: string) => {
  try {
    const resp = await post(`${wUserUrl}/Users/Login`, { email, password });
    Diagnostic("SUCCESS ON POST, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    throw err;
  }
};

export const getUsersByRole = async (role: string) => {
  try {
    const resp = await get(`${rUserUrl}/Users/ByRole/${role}`);
    console.log(resp);
    const data = resp.data;
    const users = data[0]?.users || [];
    Diagnostic("SUCCESS ON GET, returning", users);
    return users;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};

export const AdminResetPassword = async (
  payload: IAdminPasswordChangeReset
) => {
  try {
    const resp = await put(`${wUserUrl}/Users/AdminResetPassword`, payload);
    const data = resp;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};

export const AdminSendResetOTP = async (payload:any) => {
  try {
    const resp = await post(`${wUserUrl}/Users/SendResetPasswordOtp`, payload);
    const data = resp;

    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};

export const adminForgotResetPassword = async (payload: {
  email: string;
  password: string;
  otp: string;
}) => {
  try {
    const resp = await put(`${wUserUrl}/Users/ResetPassword`, payload);
    const data = resp.data;

    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};

export const adminUpdateUserDetails = async (payload: IAdminUpdateUser) => {
  try {
    const resp = await put(`${wUserUrl}/Users/AdminUpdateUser`, payload);
    console.log(resp);
    const data = resp.data;

    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};

export const getAdminUser = async (userId: string) => {
  try {
    const resp = await get(
      `https://khumla-dev-user-read.azurewebsites.net/api/v1/Users/${userId}`
    );
    console.log(resp);
    const data = resp.data;

    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};
