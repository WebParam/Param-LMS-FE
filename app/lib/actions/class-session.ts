"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { rAnalyticUrl, rCourseUrl, rLogbookUrl, rUserUrl, wCourseUrl, wLogbookUrl } from "./endpoints";
import { unstable_noStore as noStore } from "next/cache";
import { Diagnostic } from "../logger/logger";
import { IClassSession } from "@/app/interfaces/class-session";

export const createClass = async (payload: IClassSession) => {
  try {
    const resp = await post(`${wLogbookUrl}/ClassSessions/CreateClassSession`, payload);
    const data = await resp.data;
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
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
  