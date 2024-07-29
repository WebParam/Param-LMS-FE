import { IUpdateEnrollment } from "@/app/interfaces/Enrollment";
import { Diagnostic } from "../logger/logger";
import { get, post, put } from "../utils";

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

export const updateEnrollmentStatus = async (payload:IUpdateEnrollment) => {

    try {
      const resp = await put(
        `https://khumla-dev-newcourse-write.azurewebsites.net/api/v1/Enrollments/UpdateEnrollmentStatus`,payload
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
  const resp = await put(`https://khumla-testing-user-write.azurewebsites.net/api/Documents/UpdateDocumentStatus `, payload);
  return resp.data
}

export const downloadStudentDocs = async (userId: any) => {
  const resp = await fetch(`https://khumla-testing-user-read.azurewebsites.net/api/Documents/DownloadDocuments/${userId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/zip'
    }
  });
  return resp;
};



export const sendDocRejectionEmail = async (
  userId: string,
 
) => {
  try {
    const data = await post(`https://khumla-testing-user-write.azurewebsites.net/api/Documents/SendDocumentRejectionEmail/${userId}`, {
      userId,
      
    });
    Diagnostic("SUCCESS ON POST, returning", data);
  } catch (err) {
    Diagnostic("ERROR ON POST, returning", err);
    console.error(err);
  }
};


