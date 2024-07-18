"use server";
import { redirect } from "next/navigation";
import { get, post } from "../utils";
import { rAnalyticUrl, rCourseUrl, rKnowledgeModuleUrl, wCourseUrl } from "./endpoints";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { IResponseObject } from "@/app/lib/restapi/response";
import { Diagnostic } from "../logger/logger";

export const createModule = async (
  description: string,
  queryPrompt: string,
  courseId: string,
  courseTitle: string,
  formData: FormData
) => {
  const body = {
    title: formData.get("title"),
    audioVoice: formData.get("audioVoice"),
    description: description,
    courseId,
    queryPrompt: queryPrompt,
    documentTone: formData.get("documentTone"),
    lengthOfParagraph: formData.get("lengthOfParagraph"),
  };

  console.log("body", body)
  try {
    const data = await post(`${wCourseUrl}/Modules/Create`, body);
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);

    console.error(err);
  }

  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/modules?title=${courseTitle}&refreshId=${date}`;
  redirect(url);
};

export const getModules = async (id: string) => {
  try {
    const resp = await get(`${rCourseUrl}/Modules/${id}`);
    const data = resp.map((res: IResponseObject<IUnitStandard>) => res.data);
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);

    console.error(err);
  }
};

export const getModule = async (id: string) => {
  try {
    const resp = await get(`${rCourseUrl}/Modules/GetModule/${id}`);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    console.error(err);
  }
};

export const updateModule = async (
  id: string,
  description: string,
  courseId: string,
  courseTitle: string,
  queryPrompt:string,
  formData: FormData
) => {
  const body = {
    id,
    title: formData.get("title"),
    description: description,
    courseId,
    audioVoice : formData.get("audioVoice"),
    queryPrompt,
    documentTone: formData.get("documentTone"),
    lengthOfParagraph: formData.get("lengthOfParagraph"),
  };

  console.log("body",body)
  try {
    const data = await post(`${wCourseUrl}/Modules/UpdateModule`, body);
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error(err);
  }

  const url = `/protected/admin/courses/${courseId}/modules/${id}/edit?title=${courseTitle}`;
  redirect(url);
};


export const getModuleGraphs = async (id: string) => {
  try {
    const resp = await get( `${rAnalyticUrl}/GraphData/UnitStandardsAnalytics/${id}`);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    throw err;
  }
};

export const getKnowledgeModules = async (courseId: string) => {
  try {
    const resp = await get( `${rKnowledgeModuleUrl}/KnowledgeModules/GetKnowledgeModules/${courseId}`);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    throw err;
  }
};

export const getStudentModuleGraphs = async (moduleId: string, studentId:string) => {
  try {
    const resp = await get( `${rAnalyticUrl}/GraphData/StudentModuleAnalytic/${moduleId}/${studentId}`);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    throw err;
  }
};

