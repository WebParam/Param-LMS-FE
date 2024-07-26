import { Diagnostic } from "../logger/logger";
import { get, put } from "../utils";

export const getCourseStudents = async (courseId: string) => {
    try {
      const resp = await get(
        `https://khumla-dev-api-aggregator.azurewebsites.net/api/v1/StudentCourse/GetCourseStudents/${courseId}`
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

export const enrollStudent = async (studentId: string) => {
    try {
      const resp = await get(
        `https://khumla-dev-api-aggregator.azurewebsites.net/api/v1/StudentCourse/GetCourseStudents/${studentId}`
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

export const declineStudent = async (studentId: string, selectedReason: string) => {
    try {
      const resp = await get(
        `https://khumla-dev-api-aggregator.azurewebsites.net/api/v1/StudentCourse/GetCourseStudents/${studentId}`
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

export const getStudentInfo = async (studentId: string) => {
    const resp = await get(`https://khumla-development-user-read.azurewebsites.net/api/v1/Profile/GetUserProfile/${studentId}`)
    return resp.data
}

export const getStudentData = async (studentId: string) => {
  const resp = await get(`https://khumla-development-user-read.azurewebsites.net/api/Student/GetStudentInformation/${studentId} `)
  return resp.data
}

export const getStudentDocuments = async (studentId: string) => {
  const resp = await get(`https://khumla-development-user-read.azurewebsites.net/api/Documents/GetDocuments/${studentId} `)
  return resp.data
}

export const changeDocumentStatus = async (payload:any) => {
  const resp = await put(`https://khumla-development-user-write.azurewebsites.net/api/Documents/UpdateDocumentStatus `, payload);
  return resp.data
}
