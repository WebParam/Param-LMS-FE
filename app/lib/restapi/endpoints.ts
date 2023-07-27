import { GET, POST, PUT } from "./client";
import { IUserLoginModel, IUserResponseModel,  } from "../../interfaces/user";
import { IResponseObject } from "./response";



const url = "https://6fa6-154-117-172-210.ngrok-free.app";
//https://9dcb-154-117-172-210.ngrok-free.app/api/Account/Login

export const Api = {
  Base: url,

  POST_Login: async (
    payload: IUserLoginModel
  ): Promise<IResponseObject<IUserResponseModel>> => {
    const response = await POST(`${url}/api/Account/Login`, payload);
    return response;
  },



};
