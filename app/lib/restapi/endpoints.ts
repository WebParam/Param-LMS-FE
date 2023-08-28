import { ICourse, ICourseResponseModel } from "@/app/interfaces/courses";
import { GET, POST, PUT } from "./client";
import { IResponseObject } from "./response";
``


export const url = "https://9aa5-41-113-77-154.ngrok-free.app/api";



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
