"use server";
import { redirect } from "next/navigation";
import { get, post, put } from "../utils";
import { rAssessmentUrl, wOptionUrl, wQuestionUrl } from "./endpoints";
import { Diagnostic } from "../logger/logger";
import { IQuestion } from "@/app/interfaces/questions";

export const createQuestion = async (
  description: string,
  courseId: string,
  moduleId: string,
  assessmentId: string,
  courseTitle: string,
  formData: FormData
) => {
  const body = {
    questionType: formData.get("questionType"),
    score: formData.get("score"),
    description,
    assessmentId,
  };
  const correctValue = formData.get("correctValue");

  const entries: any = formData.entries();
  const objMap: { [key: string]: { [key: string]: FormDataEntryValue } } = {};

  // Iterate over formData entries
  for (const entry of entries) {
    const [key, value] = entry;
    const matches = key.match(/^options\[(\d+)\]\[(\w+)\]$/);
    if (matches) {
      const index = matches[1];
      const propName = matches[2];

      if (!objMap[index]) {
        objMap[index] = {};
      }

      objMap[index][propName] = value;
    }
  }

  // Convert the object map to an array of objects
  const objArray: { [key: string]: FormDataEntryValue }[] =
    Object.values(objMap);

  let question = {} as IQuestion;
  try {
    const data = await post(`${wQuestionUrl}/AddQuestion`, body);
    question = data.data;
    Diagnostic("SUCCESS ON POST, returning", data);

    const promiseArray = [];
    if (question && question.questionType == "Quiz") {
      for (const obj of objArray) {
        promiseArray.push(
          post(`${wOptionUrl}/AddOption`, {
            ...obj,
            isCorrect: correctValue == obj.label,
            questionId: question.id,
          })
        );
      }

      const response = await Promise.all(promiseArray);
      Diagnostic("SUCCESS ON POST, returning", response);
    }
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error(err);
  }

  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/modules/${moduleId}/assessment/${assessmentId}/questions?title=${courseTitle}&refreshId=${date}`;
  redirect(url);
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

  const correctValue = formData.get("correctValue");

  const entries: any = formData.entries();
  const objMap: { [key: string]: { [key: string]: FormDataEntryValue } } = {};

  // Iterate over formData entries
  for (const entry of entries) {
    const [key, value] = entry;
    const matches = key.match(/^options\[(\d+)\]\[(\w+)\]$/);
    if (matches) {
      const index = matches[1];
      const propName = matches[2];

      if (!objMap[index]) {
        objMap[index] = {};
      }

      objMap[index][propName] = value;
    }
  }

  // Convert the object map to an array of objects
  const objArray: { [key: string]: FormDataEntryValue }[] =
    Object.values(objMap);

  let question = {} as IQuestion;
  try {
    const data = await put(`${wQuestionUrl}/UpdateQuestion`, body);
    question = data.data;

    Diagnostic("SUCCESS ON PUT, returning", data);

    const promiseArray = [];
    if (question && question.questionType == "Quiz") {
      console.log("objArray:", objArray);
      for (const obj of objArray) {
        if (obj && obj.id) {
          promiseArray.push(
            put(`${wOptionUrl}/UpdateOption`, {
              ...obj,
              questionId: question.id,
              isCorrect: correctValue == obj.label,
            })
          );
        } else if (obj.label !== "" && obj.description !== "") {
          promiseArray.push(
            post(`${wOptionUrl}/AddOption`, {
              ...obj,
              isCorrect: correctValue == obj.label,
              questionId: question.id,
            })
          );
        }
      }

      const response = await Promise.all(promiseArray);
      Diagnostic("SUCCESS ON POST, returning", response);
    }
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error(err);
  }

  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/modules/${moduleId}/assessment/${assessmentId}/questions?title=${courseTitle}&refreshId=${date}`;
  redirect(url);
};

export const getQuestions = async (assessmentId: string) => {
  try {
    const resp = await get(
      `${rAssessmentUrl}/Questions/GetQuestions/${assessmentId}`
    );
    console.log(resp);
    const data = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);

    console.error(err);
  }
};

/* export const updateQuestion = async (
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
 */
