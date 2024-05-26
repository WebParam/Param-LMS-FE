"use server";
import { get, put } from "../utils";
import { rCourseUrl, wCourseUrl } from "./endpoints";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { IResponseObject } from "@/app/lib/restapi/response";
import { IParaPhraseResponseObject } from "@/app/interfaces/unit-standard";
import { redirect } from "next/navigation";

export const getParaphrases = async (id: string) => {
  noStore();
  try {
    const resp = await get(`${rCourseUrl}/Paraphrase/${id}`);
    return resp.map(
      (res: IResponseObject<IParaPhraseResponseObject[]>) => res.data
    );
  } catch (error) {
    throw error;
  }
};

export const confirmParaphrase = async (
  id: string,
  description: string,
  courseId: string,
  moduleId: string,
  documentId: string,
  courseTitle: string,
  formData: FormData
) => {
  const body = {
    id,
    title: formData.get("title"),
    description,
    paraphraseStatus: 1,
  };

  try {
    await put(`${wCourseUrl}/Paraphrase/ConfirmParaphrase`, body);
  } catch (error) {
    throw error;
  }
  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/modules/${moduleId}/document/${documentId}/paraphrase-document?title=${courseTitle}&refreshId=${date}`;
  revalidatePath(url);
  redirect(url);
};

export const confirmAudio = async (
  id: string,
  isConfirm: boolean,
  courseId: string,
  moduleId: string,
  documentId: string,
  courseTitle: string
) => {
  const audioStatus = isConfirm ? 1 : 0;
  
  try {
    await put(`${wCourseUrl}/Paraphrase/ConfirmAudio`, { id, audioStatus });
  } catch (error) {
    throw error;
  }

  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/modules/${moduleId}/document/${documentId}/confirm-audio?title=${courseTitle}&refreshId=${date}`;
  revalidatePath(url);
  redirect(url);
};

export const updateVideoLink = async (
  id: string,
  videoLink: string,
  courseId: string,
  moduleId: string,
  documentId: string,
  courseTitle: string
) => {
  
  try {
    await put(`${wCourseUrl}/Paraphrase/UploadVideoLink`, { id, videoLink });
  } catch (error) {
    throw error;
  }

  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/modules/${moduleId}/document/${documentId}/upload-link?title=${courseTitle}&refreshId=${date}`;
  revalidatePath(url);
  redirect(url);
};
