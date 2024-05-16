"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "./utils";
const mockUrl = "https://663efe1be3a7c3218a4bcaaf.mockapi.io/api/v1";
const wCourseUrl =
  "https://khumla-development-newcourse-write.azurewebsites.net/api/v1/Courses";
const rCourseUrl =
  "https://khumla-development-newcourse-read.azurewebsites.net/api/v1/Courses";

export const createCourse = async (formData: FormData) => {
  const body = {
    title: formData.get("title"),
    description: formData.get("description"),
    instructorName: formData.get("instructorName"),
    logoUrl: formData.get("logoUrl"),
    thumbUrl: formData.get("thumbUrl"),
  };

  const resp = await post(`${wCourseUrl}/AddCourseNew`, body);
  const { id, title } = resp.data;
  redirect(`/protected/admin/courses/${id}?title=${title}`);
};

export const getCourses = async () => {
  try {
    return await get(`${mockUrl}/course`);
  } catch (err) {
    console.error(err);
  }
};

export const getCourse = async (id: string) => {
  try {
    const resp = await get(`${rCourseUrl}/GetCourseNew/${id}`);

    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateCourse = async (id: string, formData: FormData) => {
  const body = {
    id: id,
    title: formData.get("title"),
    description: formData.get("description"),
    instructorName: formData.get("instructorName"),
    logoUrl: formData.get("logoUrl"),
    thumbUrl: formData.get("thumbUrl"),
  };

  const resp = await put(`${wCourseUrl}/UpdateCourseNew`, body);
  const { title } = resp.data;
  redirect(`/protected/admin/courses/${id}?title=${title}`);
};
