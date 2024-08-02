"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { rUsersUrl, wUserUrl } from "./endpoints";


export const getUsersByRole = async (role: string) => {
    try {
      const resp = await get(`${rUsersUrl}/Users/ByRole/${role}`);
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
  
  export const ResetPassword = async (payload:any) => {

    try {
      const resp = await put(
        `${wUserUrl}/ResetPassword`,payload
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

export const SendResetPasswordOtp = async (payload:any) => {

  try {
    const resp = await post(
      `${wUserUrl}/SendResetPasswordOtp`,payload
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


export const VerifyOTP = async (payload:any) => {

  try {
    const resp = await post(
      `${wUserUrl}/VerifyOTP`,payload
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