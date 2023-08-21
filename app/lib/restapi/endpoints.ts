import { ICourse } from "@/app/interfaces/courses";
import { GET, POST, PUT } from "./client";
import { IResponseObject } from "./response";
``


export const url = "https://6545-41-116-124-131.ngrok-free.app/api";



export const Api = {
  Base: url,


  POST_CreateCourse: async (
    payload: ICourse
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${url}/Courses/AddCourse`, payload);
    return response;
  },

};
