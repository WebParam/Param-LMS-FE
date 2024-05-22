"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { revalidatePath } from "next/cache";
import { rCourseUrl, wCourseUrl } from "./endpoints";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { IResponseObject } from "@/app/lib/restapi/response";

export const createModule = async (description: string, courseId: string, courseTitle: string, formData: FormData) => {
  const body = {
    title: formData.get("title"),
    description: description,
    courseId,
    documentTone: formData.get("documentTone"),
    lengthOfParagraph: formData.get("lengthOfParagraph"),
  };

  try {
    await post(`${wCourseUrl}/Modules/Create`, body);
  } catch (err) {
    console.error(err);
  }

  const url = `/protected/admin/courses/${courseId}/modules?title=${courseTitle}`;
  revalidatePath(url);
  redirect(url);
};

export const getModules = async (id: string) => {
  try {
    const resp = await get(`${rCourseUrl}/Modules/${id}`);

    return resp.map((res: IResponseObject<IUnitStandard>) => res.data);
  } catch (err) {
    console.error(err);
  }
};

export const getModule = async (id: string) => {
  try {
    const resp = await get(`${rCourseUrl}/Modules/GetModule/${id}`);

    return resp.data;
  } catch (err) {
    console.error(err);
  }
};
  
export const updateModule = async (id: string, description: string, courseId: string, courseTitle: string, formData: FormData) => {

  const body = {
    id,
    title: formData.get("title"),
    description: description,
    courseId,
    documentTone: formData.get("documentTone"),
    lengthOfParagraph: formData.get("lengthOfParagraph"),
  };

  try {
    await post(`${wCourseUrl}/Modules/UpdateModule`, body);
  } catch (err) {
    console.error(err);
  }

  const url = `/protected/admin/courses/${courseId}/modules/${id}/edit?title=${courseTitle}`;
  revalidatePath(url);
  redirect(url);
};
