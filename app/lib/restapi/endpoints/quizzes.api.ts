import { IMarks, IQuiz } from "@/app/interfaces/quiz";
import { GET, POST, PUT } from "../client";
import { IResponseObject } from "../response";

export const quizReadUrl =
  "https://khumla-development-quiz-read.azurewebsites.net/api";

export const quizWriteUrl =
  "https://khumla-development-quiz-write.azurewebsites.net/api";

export const QuizApi = {
  POST_AddQuiz: async (payload: IQuiz): Promise<IResponseObject<IQuiz>> => {
    const response: any = await POST(
      `${quizWriteUrl}/Quizzes/AddQuizzes`,
      payload
    );
    return response;
  },

  POST_Quiz: async (quiz: IQuiz[]): Promise<IResponseObject<IQuiz[]>> => {
    const _quiz: any = await POST(`${quizWriteUrl}/Quizzes/AddQuizzes`, quiz);
    return _quiz;
  },

  PUT_UpdateQuizzes: async (
    payload: IQuiz[]
  ): Promise<IResponseObject<IQuiz[]>> => {
    try {
      const response = await PUT(
        `${quizWriteUrl}/Quizzes/UpdateQuizzes`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error updating quizzes:", error);
      throw error;
    }
  },

  PUT_UpdateMarks: async (
    payload: IMarks
  ): Promise<IResponseObject<IMarks>> => {
    try {
      const response = await PUT(`${quizWriteUrl}/Marks/UpdateMarks`, payload);
      return response;
    } catch (error) {
      console.error("Error updating quizzes:", error);
      throw error;
    }
  },

  POST_Marks: async (payload: IMarks): Promise<IResponseObject<IMarks>> => {
    const _marks: any = await POST(`${quizWriteUrl}//Marks/AddMark`, payload);
    return _marks;
  },

  GET_AllStudentMarks: async () => {
    const response: IMarks[] = await GET(`${quizReadUrl}/Marks/getMarks`);
    return response;
  },
  GET_AllQuizzes: async () => {
    const response: IQuiz[] = await GET(`${quizReadUrl}/Quizzes/getQuizzes`);
    return response;
  },
};
