"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { rOptionUrl, wOptionUrl, wQuestionUrl } from "./endpoints";
import { Diagnostic } from "../logger/logger";

export const createOption = async (
  label: string,
  description: string,
  questionId: string
) => {
  try {
    const resp = await post(`${wOptionUrl}/AddOption`, {
      label,
      description,
      questionId,
    });

    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);

    console.error(err);
  }
};

export const getOptions = async (questionId: string) => {
  try {
    const resp = await get(`${rOptionUrl}/GetOptions/${questionId}`);
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
