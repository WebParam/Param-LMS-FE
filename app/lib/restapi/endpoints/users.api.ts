import { GET, POST } from "../client";
import {
  IUser,
  IUserLoginModel,
  IUserRegisterModel,
} from "@/app/interfaces/user";
import { IResponseObject } from "../response";

export const userWriteUrl =
  "https://khumla-dev-user-write.azurewebsites.net/api";

export const userReadUrl =
  "https://khumla-dev-user-read.azurewebsites.net/api";

export const UserApi = {
  POST_Login: async (
    payload: IUserLoginModel
  ): Promise<IResponseObject<IUserRegisterModel>> => {
    const response = await POST(`${userWriteUrl}/Users/Login`, payload);
    return response;
  },

  POST_Register: async (
    payload: IUserRegisterModel
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${userWriteUrl}/Users/AddUser`, payload);
    return response;
  },
  
  POST_RegisterAdmin: async (
    payload: IUserRegisterModel
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${userWriteUrl}/Users/AddAdmin`, payload);
    return response;
  },

  GET_UserById: async (id: string): Promise<IResponseObject<IUser>> => {
    const response = await GET(
      `${userReadUrl}/Users/GetUsersByIds?userIds=${id}`
    );

    return response;
  },

  GET_UsersByIds: async (
    userIds: string[]
  ): Promise<IResponseObject<IUser>[]> => {
    const queryParams = userIds.map((id) => `Ids=${id}`).join("&");
    const response = await GET(
      `${userReadUrl}/Users/GetUsersByIds?${queryParams}`
    );
    return response;
  },
};
