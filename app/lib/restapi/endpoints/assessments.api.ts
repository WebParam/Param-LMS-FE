import { IAssessment } from "@/app/interfaces/assessment";
import { GET, POST, PUT, DELETE } from "../client";
import { IResponseObject } from "../response";
import { IStudentAnswer } from "@/app/interfaces/studentAnswer";

export const assessmentWriteUrl = process.env.NEXT_PUBLIC_ASSESSMENT_WRITE_URL;
export const assessmentReadUrl = process.env.NEXT_PUBLIC_ASSESSMENT_READ_URL;

export const AssessmentApi = {
  POST_AddAssessments: async (
    payload: IAssessment
  ): Promise<IResponseObject<IAssessment>> => {
    const response = await POST(
      `${assessmentWriteUrl}/Assessments/AddAssessment`,
      payload
    );
    return response;
  },
  POST_StudentAnswers: async (
    payload: IStudentAnswer
  ): Promise<IResponseObject<IStudentAnswer>> => {
    const response = await POST(
      `${assessmentWriteUrl}/StudentAnswers/AddStudentAnswer`,
      payload
    );
    return response;
  },
  PUT_UpdateAssessment: async (payload: IAssessment): Promise<any> => {
    try {
      const response = await PUT(
        `${assessmentWriteUrl}/Assessments/UpdateAssessment`,
        payload
      );

      return response;
    } catch (error) {
      console.error("Error updating assessment:", error);
      throw error;
    }
  },

  GET_GetAllAssessments: async () => {
    const response = await GET(
      `${assessmentReadUrl}/Assessments/GetAssessments`
    );
    return response;
  },

  GET_CourseAssessment: async (courseId: string) => {
    const response = await GET(
      `${assessmentReadUrl}/Assessments/GetAssessment?id=${courseId}`
    );
    return response.data;
  },
  GET_StudentAssessmentsByCourses: async (payload: string) => {
    console.log("payload server side", payload);
    const response = await GET(
      `${assessmentReadUrl}/Assessments/GetAssessmentsByCourses?${payload}&courses=course1`
    );
    return response;
  },

  GET_StudentAssessmentsAnswers: async () => {
    const response = await GET(
      `${assessmentReadUrl}/StudentAnswers/GetStudentsAnswers`
    );
    return response;
  },
};
