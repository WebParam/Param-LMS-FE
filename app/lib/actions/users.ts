
"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { rUserUrl, wUserUrl } from "./endpoints";
import { IAdminPasswordChangeReset, IAdminUpdateUser } from "@/app/interfaces/user";

export const getUsersByRole = async (role: string) => {
  try {
    const resp = await get(`${rUserUrl}/Users/ByRole/${role}`);
    console.log(resp);
    const data = resp.data;

    // Assuming the structure is as provided
    const users = data[0]?.users || [];

    Diagnostic("SUCCESS ON GET, returning", users);
    return users;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};

export const AdminResetPassword = async (payload: IAdminPasswordChangeReset) => {
  try {
    const resp = await put(`${wUserUrl}/Users/AdminResetPassword`, payload);
    console.log(resp);
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
    const resp = await get(`https://khumla-dev-user-read.azurewebsites.net/api/v1/Users/${userId}`);
    console.log(resp);
    const data = resp.data;

    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};
