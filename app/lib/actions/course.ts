"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { rAnalyticUrl, rCourseUrl, rUserUrl, wCourseUrl } from "./endpoints";
import { unstable_noStore as noStore } from "next/cache";
import { Diagnostic } from "../logger/logger";

export const createCourse = async (formData: FormData) => {
  const body = {
    title: formData.get("title"),
    description: formData.get("description"),
    videoScriptTone: formData.get("videoScriptTone"),
    instructorName: formData.get("instructorName"),
    courseLogoUrl: formData.get("courseLogoUrl"),
    thumbnailUrl: formData.get("thumbnailUrl"),
  };

  let url = "";
  try {
    const resp = await post(`${wCourseUrl}/Courses/AddCourseNew`, body);
    const data = await resp.data;
    const { id, title } = data;
    url = `/protected/admin/courses/${id}?title=${title}`;
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    throw err;
  }

  redirect(url);
};

export const getCourses = async () => {
  noStore();
  try {
    const resp = await get(`${rCourseUrl}/Courses/GetCoursesNew`);
    if (Array.isArray(resp) && resp.length > 0) {
      const data = resp.map((res: any) => res.data);
      Diagnostic("SUCCESS ON GET, returning", data);
      return data;
    } else return [];
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    throw err;
  }
};

export const getCourse = async (id: string) => {
  try {
    const resp = await get(`${rCourseUrl}/Courses/GetCourseNew/${id}`);

    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    throw err;
  }
};

export const updateCourse = async (id: string, formData: FormData) => {
  const body = {
    id: id,
    title: formData.get("title"),
    description: formData.get("description"),
    videoScriptTone: formData.get("videoScriptTone"),
    instructorName: formData.get("instructorName"),
    courseLogoUrl: formData.get("courseLogoUrl"),
    thumbnailUrl: formData.get("thumbnailUrl"),
  };

  let url = "";
  try {
    const resp = await put(`${wCourseUrl}/Courses/UpdateCourseNew`, body);

    const data = await resp.data;
    const { title } = data;
    url = `/protected/admin/courses/${id}?title=${title}`;
    Diagnostic("SUCCESS ON PUT, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON PUT, returning", err);
    throw err;
  }

  redirect(url);
};

export const getCourseGraphs = async (id: string) => {
  noStore();

  try {
    const resp = await get(`${rAnalyticUrl}/GraphData/CourseAnalytics/${id}`);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    throw err;
  }
};

export const getCourseTableAnalytics = async (id: string) => {
  try {
    const resp = await get(`${rAnalyticUrl}/TableData/CourseTable/${id}`);
    const data = resp.data;
    console.log("Data data", data);
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (error) {
    Diagnostic("ERROR ON GET, returning", error);
    throw error;
  }
};

export const getStudentCourseGraphsAnalytics = async (
  courseId: string,
  studentId: string
) => {
  try {
    const resp = await get(
      `${rAnalyticUrl}/GraphData/StudentCourseAnalytic/${courseId}/${studentId}`
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


export const getCourseVideoAnalytics = async (
  courseId: string,
) => {
  try {
    const resp = await get(
      `${rAnalyticUrl}/VideoWatched/Course/${courseId}/Videos`
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


export const getStudentCourseVideoAnalytics = async (
  courseId: string,
  studentId: string
) => {
  try {
    const resp = await get(
      `${rAnalyticUrl}/VideoWatched/Student/${studentId}/Course/${courseId}/Videos`
    );
    const data = resp;
    console.log("Data data", data);
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (error) {
    Diagnostic("ERROR ON GET, returning", error);
    throw error;
  }
};


export const getCodes = async () => {
  try {
    const resp = await get(`${rUserUrl}/Student/GetCodes`);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (error) {
    Diagnostic("ERROR ON GET, returning", error);
    throw error;
  }
};
