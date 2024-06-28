"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import {
  rAssessmentUrl,
  rRubricUrl,
  wAssessmentUrl,
  wQuestionUrl,
  wRubricUrl,
} from "./endpoints";
import { Diagnostic } from "../logger/logger";

export const createRubric = async (
  description: string,
  courseId: string,
  moduleId: string,
  assessmentId: string,
  questionId: string,
  courseTitle: string,
  type: string,
  formData: FormData
) => {
  const body = {
    label: formData.get("label"),
    description,
    questionId,
  };

  console.log("body", body);
  try {
    const data = await post(`${wRubricUrl}/AddRubric`, body);
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);

    console.error(err);
  }

  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/modules/${moduleId}/assessment/${assessmentId}/questions/${questionId}/edit-question?title=${courseTitle}&type=${type}&refreshId=${date}`;
  redirect(url);
};

export const getRubrics = async (questionId: string) => {
  try {
    const resp = await get(`${rRubricUrl}/GetRubrics/${questionId}`);
    console.log(resp);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);

    console.error(err);
  }
};

export const updateQuestion = async (
  id: string,
  description: string,
  courseId: string,
  moduleId: string,
  assessmentId: string,
  courseTitle: string,
  formData: FormData
) => {
  const body = {
    id,
    title: formData.get("title"),
    questionType: formData.get("questionType"),
    score: formData.get("score"),
    description,
    assessmentId,
  };

  try {
    const data = await put(`${wQuestionUrl}/UpdateQuestion`, body);
    Diagnostic("SUCCESS ON PUT, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON PUT, returning", err);

    console.error(err);
  }

  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/modules/${moduleId}/assessment/${assessmentId}/questions?title=${courseTitle}&refreshId=${date}`;
  redirect(url);
};
