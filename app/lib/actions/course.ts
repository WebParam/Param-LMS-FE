"use server";
import { redirect } from "next/navigation";
import { get, post } from "./utils";
const baseUrl = "https://663efe1be3a7c3218a4bcaaf.mockapi.io/api/v1";

export const createCourse = async (formData: FormData) => {
  const data = await post(`${baseUrl}/course`, formData);
  redirect(`/protected/admin/courses/${data.id}?title=${data.title}`);
};

export const getCourses = async () => {
  try {
    return await get(`${baseUrl}/course`);
  } catch (err) {
    console.error(err);
  }
};

export const getCourse = async (id: number) => {
  try {
    return await get(`${baseUrl}/course/${id}`);
  } catch (err) {
    console.error(err);
  }
};
