"use server";
import { redirect } from "next/navigation";
import { del, get, post, put } from "../utils";
import {
  rAggregatorUrl,
  rAssessmentUrl,
  twAssessmentUrl,
  wAssessmentUrl,
} from "./endpoints";
import { Diagnostic } from "../logger/logger";
import { IMarkStudentAssessment } from "@/app/interfaces/assessments";
import { unstable_noStore as noStore } from "next/cache";

export const createAssessment = async (
  courseId: string,
  moduleId: string,
  courseTitle: string,
  formData: FormData
) => {
  const body = {
    title: formData.get("title"),
    assessmentType:Number(formData.get("assessmentsType")),
    courseId,
  };

  try {
    const data = await post(
      `${wAssessmentUrl}/Assessments/AddNewAssessment`,
      body
    );
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);

    console.error(err);
  }

  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/assessments?title=${courseTitle}&refreshId=${date}`;
  redirect(url);
};

export const getAssessments = async (id: string) => {
  noStore();

  try {
    const resp = await get(
      `${rAssessmentUrl}/Assessments/GetNewAssessments/${id}`
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

export const updateAssessment = async (
  id: string,
  courseId: string,
  moduleId: string,
  courseTitle: string,
  formData: FormData
) => {
  const body = {
    id,
    title: formData.get("title"),
  };

  try {
    const data = await put(
      `${wAssessmentUrl}/Assessments/UpdateNewAssessment`,
      body
    );
    Diagnostic("SUCCESS ON PUT, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON PUT, returning", err);

    console.error(err);
  }

  const date = new Date().toString();
  const url = `/protected/admin/courses/${courseId}/assessments?title=${courseTitle}&refreshId=${date}`;
  redirect(url);
};

export const deleteAssessment = async (assessmentId: string) => {
  try {
    const resp = await del(
      `${wAssessmentUrl}/Assessments/NewAssessment/${assessmentId}`
    );
    const data = resp.data;
    Diagnostic("SUCCESS ON DELETE, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON DELETE, returning", err);

    console.error(err);
  }
};

export const getStudentAssessmentAnswers = async (
  userId: string,
  assessmentId: string
) => {
  try {
    const resp = await get(
      `${rAssessmentUrl}/StudentAnswers/GetStudentAssessmentAnswer/${userId}/${assessmentId}`
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

export const getStudentsAssessment = async (courseId: string) => {
  try {
    const resp = await get(
      `${rAggregatorUrl}/StudentAssessment/StudentsAssessments/${courseId}`
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

export const markStudentAssessment = async (
  payload: IMarkStudentAssessment
) => {
  try {
    const response = await post(
      `${wAssessmentUrl}/Marks/AddLongAnswerMark`,
      payload
    );

    const data = response.data;

    Diagnostic("SUCCESS ON POST, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error(err);
  }
};
export const submitFacilitatorAssessment = async (payload: FormData) => {
  const body = {
    facilitatorId: payload.get("facilitatorId") ?? "",
    assessmentId: payload.get("assessmentId"),
    studentId: payload.get("studentId"),
    TotalMark: payload.get("TotalMark"),
  };

  try {
    const data = await post(
      `${wAssessmentUrl}/StudentAnswers/FacilitatorSubmit`,
      body
    );
    Diagnostic("SUCCESS ON POST, returning", data);
    return data.data;
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error("Error in submitFacilitatorAssessment:", err);
    throw err;
  }
};

export const submitModeratorAssessment = async (payload: FormData) => {
  const body = {
    moderatorId: payload.get("facilitatorId") ?? "",
    assessmentId: payload.get("assessmentId"),
    studentId: payload.get("studentId"),
  };
  try {
    const data = await post(
      `${twAssessmentUrl}/StudentAnswers/FacilitatorSubmit`,
      body
    );
    Diagnostic("SUCCESS ON POST, returning", data);
    return data.data;
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error("Error in submitFacilitatorAssessment:", err);
    throw err;
  }
};

export const submitForModeration = async (payload: FormData) => {
  const body = {
    moderatorId: payload.get("moderatorId") ?? "",
    assessmentId: payload.get("assessmentId"),
    studentId: payload.get("studentId"),
  };
  try {
    const data = await post(
      `${twAssessmentUrl}/StudentAnswers/FacilitatorSubmit`,
      body
    );
    Diagnostic("SUCCESS ON POST, returning", data);
    return data.data;
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error("Error in submitFacilitatorAssessment:", err);
    throw err;
  }
};

export const getModeratorStudentsAssessment = async (courseId: string) => {
  try {
    const resp = await get(
      `${rAggregatorUrl}/StudentAssessment/StudentsAssessments/${courseId}`
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

export const submitModeratorFeedback = async (payload: FormData) => {
  const body = {
    id: "668bc5b9ab353d951018b589",
    moderatorFeedBack: payload.get("moderatorFeedBack") ?? "",
    questionId: "5f8d0d55b54764421b7160e0",
  };
  console.log("body", body);
  try {
    const data = await post(
      `${twAssessmentUrl}/StudentAnswers/AddModeratorFeedBack`,
      body
    );
    Diagnostic("SUCCESS ON POST, returning", data);
    return data.data;
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error("Error in submitFacilitatorAssessment:", err);
    throw err;
  }
};
