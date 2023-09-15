import { ICourse, ICourseResponseModel, IDeleteSection } from "@/app/interfaces/courses";
import { GET, POST, PUT } from "./client";
import { IResponseObject } from "./response";
import { IUserLoginModel, IUserRegisterModel } from "@/app/interfaces/user";

export const courseUrl = "https://4efc-41-113-76-218.ngrok-free.app/api";


export const deleteurl = "https://2ce8-154-0-14-142.ngrok-free.app/api";

export const authUrl = "https://ad6a-154-0-14-142.ngrok-free.app/api";

export const Api = {
  Base: courseUrl,

  GET_Courses: async (): Promise<IResponseObject<ICourseResponseModel[]>> => {
    const response = await GET(`${courseUrl}/Courses/GetCourses`);
    return response;
  },

  POST_CreateCourse: async (
    payload: ICourse
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${courseUrl}/Courses/AddCourse`, payload);
    return response;
  },

  POST_DeleteSection: async (
    payload: IDeleteSection
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${deleteurl}/Courses/AddCourse`, payload);
    return response;
  },

  GET_CourseById: async (
    courseId: string
  ): Promise<IResponseObject<ICourseResponseModel>> => {
    const response = await GET(`${courseUrl}/Courses/GetCourse?id=${courseId}`);
    return response;
  },
  GET_CoursesById: async (
    userId: string
  ): Promise<any> => {
    const response = await GET(`${courseUrl}/Courses/GetCoursesByUser?userId=${userId}`);
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
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${authUrl}/Users/Login`, payload);
    return response;
  },

  POST_Register: async (
    payload: IUserRegisterModel
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${authUrl}/Users/AddUser`, payload);
    return response;
  },



};
