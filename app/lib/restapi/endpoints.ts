import { ICourse, ICourseResponseModel, IDeleteSection,IDeleteVideo,IStudentCourses } from "@/app/interfaces/courses";
import { GET, POST, PUT } from "./client";
import { IResponseObject } from "./response";
import { IUser, IUserLoginModel, IUserRegisterModel } from "@/app/interfaces/user";
import  IComment, { ICommentReply }  from "@/app/interfaces/comment";

export const courseWriteUrl = "http://localhost:50851/api";

export const courseReadUrl="http://localhost:8001/api";

export const userWriteUrl = "https://localhost:52376/api";

export const userReadUrl="https://localhost:52370/api";

export const commentReadUrl="https://localhost:52372/api";

export const commentWriteUrl="https://localhost:52374/api";
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
    const response = await PUT(`${courseWriteUrl}/Courses/updateCourse`, payload);
    return response;
  },


  DELETE_DeleteSection: async (
    payload: IDeleteSection
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${courseWriteUrl}/Courses/DeleteSection`, payload);
    return response;
  },

  DELETE_DeleteVideo: async (
    payload: IDeleteVideo
  ): Promise<IResponseObject<any>> => {
    const response = await POST(`${courseWriteUrl}/Courses/DeleteVideo`, payload);
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

  GET_CommentsByReference: async (
    referenceId: string
  ): Promise<IResponseObject<IComment>[]> => {
    const response = await GET(`${commentReadUrl}/Comments/GetCommentsByReference?referenceId=${referenceId}`);
    return response;
  },

  GET_CoursesByUserId: async (
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

  GET_UsersByIds:async (userIds:string[]):Promise<IResponseObject<IUser>[]>=>{
   const queryParams=userIds.map(id => `Ids=${id}`).join('&');
   const response = await GET(`${courseReadUrl}/Users/GetUsersByIds?${queryParams}`);
    return response;
  },

DELETE_CourseById: async (
    courseId: string
  ): Promise<any> => {
    const response = await GET(`${courseWriteUrl}/Courses/${courseId}`);
    return response;
  },

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

  GET_UserById:async(id:string)
          :Promise<IResponseObject<IUser>>=>{
            
            const response:IResponseObject<IUserRegisterModel>= await GET(`${userReadUrl}/Users/GetUserById?Id=${id}`);
            
            console.log("response:" ,response);
           
            const user:IResponseObject<IUser>={
              data:{
                name:response.data?.firstName??"",
                surname:response.data?.lastName??"",
                image:response.data?.image??"",
                email:response.data?.email??"",
                summary:response.data?.summary??"",
                headLine:response.data?.headLine??""
              },
              message:response.message,
              error:response.error,
              status:0
            };
            console.log("Author response:",user);
           return user;
          },
  POST_AddComment:async (payload:IComment)
  :Promise<IResponseObject<IComment>>=>{
    const response = await POST(`${commentWriteUrl}/Comments/AddComment`,payload);
    return response;
  },
  POST_AddCommentReply:async(payload:ICommentReply)       
  :Promise<IResponseObject<IComment>> => {
    const response:any = await POST(`${commentWriteUrl}/Comments/AddCommentReply`,payload);
    return response;
  }
};
