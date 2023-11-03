import { ICourse, ICourseResponseModel, IDeleteSection } from "@/app/interfaces/courses";
import { GET, POST, PUT } from "./client";
import { IResponseObject } from "./response";
import { IUserLoginModel, IUserRegisterModel } from "@/app/interfaces/user";

export const courseWriteUrl = "http://localhost:50851/api";

export const courseReadUrl="http://localhost:8001/api";

export const deleteurl = "http://localhost:50851/api";

export const authUrl = "https://localhost:50894/api";

export const Api = {
  Base: courseWriteUrl,

  GET_Courses: async (): Promise<any> => {
    const response = await GET(`${courseReadUrl}/Courses/GetCourses`);
    return response;
  },

  POST_CreateCourse: async (
    payload: ICourse
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${courseWriteUrl}/Courses/AddCourse`, payload);
    return response;
  },

  PUT_UpdateCourse: async (
    payload: ICourse
  ): Promise<any> => {
    const response = await PUT(`${courseUrl}/Courses/updateCourse`, payload);
    return response;
  },


  DELETE_DeleteSection: async (
    payload: IDeleteSection
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${deleteurl}/Courses/AddCourse`, payload);
    return response;
  },

  GET_CourseById: async (
    courseId: string
  ): Promise<IResponseObject<ICourseResponseModel>> => {
    const response = await GET(`${courseReadUrl}/Courses/GetCourse?id=${courseId}`);
    return response;
  },
  GET_AllCourses: async (
    courseId: string
  ): Promise<IResponseObject<ICourseResponseModel[]>> => {
    const response = await GET(`${courseReadUrl}/Courses/`);
    return response;
  },
  GET_CoursesById: async (
    userId: string
  ): Promise<any> => {
    const response = await GET(`${courseReadUrl}/Courses/GetCoursesByUser?userId=${userId}`);
    return response;
  },

  
  GET_StudentCoursesById: async (
    studentId: string
  ): Promise<IResponseObject<IStudentCourses>> => {
    const response = await GET(`${courseReadUrl}/Courses/GetStudentCourses?studentId=${studentId}`);
    return response;
  },

  GET_CoursesByIds: async (courseIds: string[]): Promise<any> => {
    const queryParams = courseIds.map(id => `Ids=${id}`).join('&');
    const response = await GET(`${courseReadUrl}/Courses/GetCoursesByIds?${queryParams}`);
    return response;
  },

DELETE_CourseById: async (
    courseId: string
  ): Promise<any> => {
    const response = await GET(`${deleteurl}/Courses/${courseId}`);
    return response;
  },

  POST_Login: async (
    payload: IUserLoginModel
  ): Promise<IResponseObject<IUserRegisterModel>> => {
    const response = await POST(`${authUrl}/Users/Login`, payload);
    return response;
  },

  POST_Register: async (
    payload: IUserRegisterModel
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${authUrl}/Users/AddUser`, payload);
    return response;
  },
  POST_RegisterAdmin: async (
    payload: IUserRegisterModel
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${authUrl}/Users/AddAdmin`, payload);
    return response;
  },

};
