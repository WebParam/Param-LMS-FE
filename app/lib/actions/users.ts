"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { Diagnostic } from "../logger/logger";
import { rUsersUrl } from "./endpoints";


export const getUsersByRole = async (role: string) => {
    try {
      const resp = await get(`${rUsersUrl}/Users/ByRole/${role}`);
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
  