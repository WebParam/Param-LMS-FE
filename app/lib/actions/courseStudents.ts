import { Diagnostic } from "../logger/logger";
import { get } from "../utils";

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

export const getStudentInfo = async (studentId: string) => {
    const resp = await get(`https://khumla-development-user-read.azurewebsites.net/api/v1/Profile/GetUserProfile/${studentId}`)
    return resp.data
}

export const getStudentData = async (studentId: string) => {
  const resp = await get(`https://khumla-development-user-read.azurewebsites.net/api/Student/GetStudentInformation/${studentId} `)
  return resp.data
}