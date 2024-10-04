"use server";
import { redirect } from "next/navigation";
import { del, get, post, put } from "../utils";
import { rAnalyticUrl, rCourseUrl, rLogbookUrl, rUserUrl, wCourseUrl, wLogbookUrl } from "./endpoints";
import { unstable_noStore as noStore } from "next/cache";
import { Diagnostic } from "../logger/logger";
import { IClassSession } from "@/app/interfaces/class-session";

export const createClass = async (payload: IClassSession) => {
  try {
    const resp = await post(`${wLogbookUrl}/ClassSessions/CreateClassSession`, payload);
    const data = await resp.data;
    Diagnostic("SUCCESS ON POST, returning", data);
    return data
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    throw err;
  }

};

export const updateClass = async (payload: IClassSession) => {
    try {

      const resp = await put(`${wLogbookUrl}/ClassSessions/UpdateClassSession`, payload);
      const data = await resp.data;
      
      Diagnostic("SUCCESS ON PUT, returning", data);
      return data
    } catch (err) {
      Diagnostic("ERROR ON PUT, returning", err);
      throw err;
    }
  
  };

export const getCourseClassSessions = async (
    courseId: string,
  ) => {
    try {
      const resp = await get(
        `${rLogbookUrl}/ClassSessions/GetClassSessions/${courseId}/Course`
      );
      const data = resp.data;
      
      console.log("Data data", data);
      Diagnostic("SUCCESS ON GET, returning", data);
      return data;
    } catch (error) {
      Diagnostic("ERROR ON GET, returning", error);
      throw error;
    }
  };

  export const deleteCourseClassSessions = async (
    classId: string,
  ) => {
    try {
      const resp = await del(
        `${wLogbookUrl}/ClassSessions/DeleteClassSession/${classId}`
      );
      const data = resp.message;
      
      console.log("Data data", data);
      Diagnostic("SUCCESS ON DELETE returning", data);
      return data;
    } catch (error) {
      Diagnostic("ERROR ON DELETE, returning", error);
      throw error;
    }
  };
  


