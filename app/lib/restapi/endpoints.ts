import { ICourse, ICourseResponseModel } from "@/app/interfaces/courses";
import { GET, POST, PUT } from "./client";
import { IResponseObject } from "./response";
``


export const url = "https://8c8b-41-116-28-148.ngrok-free.app/";



export const Api = {
  Base: url,


  GET_Courses: async():Promise<IResponseObject<ICourseResponseModel[]>> => {
    const response = await GET(`${url}/Courses/GetCourses`);
    return response;
  },

  POST_CreateCourse: async (
    payload: ICourse
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${url}/Courses/AddCourse`, payload);
    return response;
  },

};
