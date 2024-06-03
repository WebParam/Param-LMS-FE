"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { rCourseUrl, wCourseUrl } from "./endpoints"
import { unstable_noStore as noStore } from 'next/cache';

export const createCourse = async (formData: FormData) => {
  const body = {
    title: formData.get("title"),
    description: formData.get("description"),
    instructorName: formData.get("instructorName"),
    courseLogoUrl: formData.get("courseLogoUrl"),
    thumbnailUrl: formData.get("thumbnailUrl"),
  };

  const resp = await post(`${wCourseUrl}/Courses/AddCourseNew`, body);
  const { id, title } = resp.data;
  const url = `/protected/admin/courses/${id}?title=${title}`;

  redirect(url);
};

export const getCourses = async () => {
  noStore();
  try {
    const resp = await get(`${rCourseUrl}/Courses/GetCoursesNew`);

    return resp.map((res: any) => res.data);
  } catch (err) {
    console.error(err);
  }
};

export const getCourse = async (id: string) => {
  try {
    const resp = await get(`${rCourseUrl}/Courses/GetCourseNew/${id}`);

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
    courseLogoUrl: formData.get("courseLogoUrl"),
    thumbnailUrl: formData.get("thumbnailUrl"),
  };

  const resp = await put(`${wCourseUrl}/Courses/UpdateCourseNew`, body);
  const { title } = resp.data;
  redirect(`/protected/admin/courses/${id}?title=${title}`);
};
