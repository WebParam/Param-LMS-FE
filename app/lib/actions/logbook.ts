import { POST, GET } from "../restapi/client";
import { wLogbookUrl, rLogbookUrl } from "./endpoints";
import { Diagnostic } from "../logger/logger";
import { ICourseLogbook, IStudentLogbook } from "@/app/interfaces/logbook";

// /api/v1/CourseLogbook/AddCourseLogbook
export const addCourseLogbook = async (formData: FormData): Promise<{ data: ICourseLogbook | null, message: string, error: boolean }> => {
  try {
    const resp = await POST(`${wLogbookUrl}/CourseLogbook/AddCourseLogbook`, formData);
    Diagnostic("SUCCESS ON ADD COURSE LOGBOOK, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON ADD COURSE LOGBOOK, returning", err);
    throw err;
  }
}

// /api/v1/StudentLogbook/AddStudentLogbook
export const addStudentLogbook = async (formData: FormData): Promise<{ data: IStudentLogbook | null, message: string, error: boolean }> => {
  try {
    const resp = await POST(`${wLogbookUrl}/StudentLogbook/AddStudentLogbook`, formData);
    Diagnostic("SUCCESS ON ADD STUDENT LOGBOOK, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON ADD STUDENT LOGBOOK, returning", err);
    throw err;
  }
}

// /api/v1/CourseLogbooks/GetCourseLogbooksByCourse/testCourseId
export const getCourseLogbooksByCourse = async (courseId: string): Promise<{ data: ICourseLogbook | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLogbookUrl}/CourseLogbooks/GetCourseLogbooksByCourse/${courseId}`);
    Diagnostic("SUCCESS ON GET COURSE LOGBOOKS BY COURSE, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET COURSE LOGBOOKS BY COURSE, returning", err);
    throw err;
  }
}

// /api/v1/CourseLogbooks/GetAllCourseLogbooks
export const getAllCourseLogbooks = async (): Promise<{ data: ICourseLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLogbookUrl}/CourseLogbooks/GetAllCourseLogbooks`);
    Diagnostic("SUCCESS ON GET ALL COURSE LOGBOOKS, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET ALL COURSE LOGBOOKS, returning", err);
    throw err;
  }
}

// /api/v1/CourseLogbooks/GetAllCourseLogbooksByAdmin/{adminId}
export const getAllCourseLogbooksByAdmin = async (adminId: string): Promise<{ data: ICourseLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLogbookUrl}/CourseLogbooks/GetAllCourseLogbooksByAdmin/${adminId}`);
    Diagnostic("SUCCESS ON GET ALL COURSE LOGBOOKS BY ADMIN, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET ALL COURSE LOGBOOKS BY ADMIN, returning", err);
    throw err;
  }
}

// /api/v1/StudentLogbooks/GetStudentLogbooksByCourse/{studentId}/{courseId}
export const getStudentLogbooksByCourse = async (studentId: string, courseId: string): Promise<{ data: IStudentLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLogbookUrl}/StudentLogbooks/GetStudentLogbooksByCourse/${studentId}/${courseId}`);
    Diagnostic("SUCCESS ON GET STUDENT LOGBOOKS BY COURSE, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET STUDENT LOGBOOKS BY COURSE, returning", err);
    throw err;
  }
}

// /api/v1/StudentLogbooks/GetAllStudentLogbooks/{studentId}
export const getAllStudentLogbooks = async (studentId: string): Promise<{ data: IStudentLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLogbookUrl}/StudentLogbooks/GetAllStudentLogbooks/${studentId}`);
    Diagnostic("SUCCESS ON GET ALL STUDENT LOGBOOKS, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET ALL STUDENT LOGBOOKS, returning", err);
    throw err;
  }
}

// /api/v1/StudentLogbooks/GetAllCourseLogbooks/{courseId}
export const getAllCourseLogbooksByCourse = async (courseId: string): Promise<{ data: IStudentLogbook[] | null, message: string, error: boolean }> => {
  try {
    const resp = await GET(`${rLogbookUrl}/StudentLogbooks/GetAllCourseLogbooks/${courseId}`);
    Diagnostic("SUCCESS ON GET ALL COURSE LOGBOOKS BY COURSE, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON GET ALL COURSE LOGBOOKS BY COURSE, returning", err);
    throw err;
  }
}

// /api/v1/CourseLogbooks/PreviewDocument/{courseLogbookId}
export const previewDocument = async (courseLogbookId: string): Promise<Response> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (process.env.NEXT_PUBLIC_CLIENTKEY) {
      headers["Client-Key"] = process.env.NEXT_PUBLIC_CLIENTKEY;
    }

    const resp = await fetch(`${rLogbookUrl}/CourseLogbooks/PreviewDocument/${courseLogbookId}`, {
      method: "GET",
      headers,
    });
    Diagnostic("SUCCESS ON PREVIEW DOCUMENT, returning", resp);
    return resp;
  } catch (err) {
    Diagnostic("ERROR ON PREVIEW DOCUMENT, returning", err);
    throw err;
  }
}
