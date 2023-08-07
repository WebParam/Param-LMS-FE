import { GET, POST, PUT } from "./client";
import { IUserLoginModel, IUserResponseModel,  } from "../../interfaces/user";
import { IResponseObject } from "./response";
import { ICourse, IdeleteModule, IdeleteSection, IdeleteVideo } from "@/app/interfaces/courseSlice";



const url = "  https://a2e4-154-117-172-210.ngrok-free.app";
//https://9dcb-154-117-172-210.ngrok-free.app/api/Account/Login

export const Api = {
  Base: url,

  POST_Login: async (
    payload: IUserLoginModel
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/api/Account/Login`, payload);
    return response;
  },


  POST_CreateCourse: async (
    payload: ICourse
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/api/Courses/AddCourse`, payload);
    return response;
  },



  POST_deleteSection: async (
    payload: IdeleteSection
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/api/Courses/DeleteSection`, payload);
    return response;
  },


  


  POST_deleteModule: async (
    payload: IdeleteModule
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/api/Courses/DeleteModule`, payload);
    return response;
  },

  POST_deleteVideo: async (
    payload: IdeleteVideo
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/api/Courses/DeleteVideo`, payload);
    return response;
  },

};
