import { GET, POST, PUT, DELETE } from "../client";
import { IResponseObject } from "../response";
import IComment, { ICommentReply } from "@/app/interfaces/comment";
import { IRating } from "@/app/interfaces/Rating";

export const commentReadUrl = process.env.NEXT_PUBLIC_COMMENT_READ_URL;
export const commentWriteUrl = process.env.NEXT_PUBLIC_COMMENT_WRITE_URL;

export const CommentsApi = {
  GET_CommentsByReference: async (
    referenceId: string
  ): Promise<IResponseObject<IComment>[]> => {
    const response = await GET(
      `${commentReadUrl}/Comments/GetCommentsByReference?referenceId=${referenceId}`
    );
    return response;
  },

  POST_AddComment: async (
    payload: IComment
  ): Promise<IResponseObject<IComment>> => {
    const response = await POST(
      `${commentWriteUrl}/Comments/AddComment`,
      payload
    );
    return response;
  },

  POST_AddRating: async (
    payload: IRating
  ): Promise<IResponseObject<IRating>> => {
    const response = await POST(
      `${commentWriteUrl}/Ratings/AddRating`,
      payload
    );
    return response;
  },

  GET_GetRating: async (id: string): Promise<IResponseObject<IRating>> => {
    const response = await GET(`${commentReadUrl}/Ratings/GetRating?id=${id}`);
    return response;
  },

  GET_GetAllComments: async (): Promise<IResponseObject<IComment[]>> => {
    const response = await GET(`${commentReadUrl}/Comments/GetComments`);
    return response;
  },

  POST_AddCommentReply: async (
    payload: ICommentReply
  ): Promise<IResponseObject<IComment>> => {
    const response: any = await POST(
      `${commentWriteUrl}/Comments/AddCommentReply`,
      payload
    );
    return response;
  },
};
