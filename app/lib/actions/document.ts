"use server";
import { redirect } from "next/navigation";
import { get, post } from "../utils";
import {
  wDocumentUrl,
  rDocumentUrl,
  rDocumentParaphraseUrl,
} from "./endpoints";
import { IResponseObject } from "@/app/lib/restapi/response";
import { Diagnostic } from "../logger/logger";
import { IDocument } from "@/app/interfaces/course-document";

export const uploadDocuments = async (courseId: string, moduleId: string, courseTitle: string, formData: FormData) => {
  try {
    const res = await fetch(`${wDocumentUrl}/Modules/${moduleId}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    Diagnostic("SUCCESS ON POST, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
  }

  const url = `/protected/admin/courses/${courseId}/modules/${moduleId}/documents?title=${courseTitle}&refreshed="true"`;
  redirect(url);
};

export const getDocuments = async (moduleId: string) => {
  try {
    const resp = await get(`${rDocumentUrl}/${moduleId}`);

    return resp.map((res: IResponseObject<IDocument>) => res.data);
  } catch (err) {
    console.error(err);
  }
};

export const paraphraseDocument = async (
  documentId: string,
  documentUrl: string
) => {
  try {
    await post(`${rDocumentParaphraseUrl}/parse`, {
      documentUrl,
      documentId,
    });
  } catch (err) {
    console.error(err);
  }
};