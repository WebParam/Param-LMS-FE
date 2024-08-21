import { IActivity } from "@/app/interfaces/analytics";
import { GET, POST, PUT, DELETE } from "../client";
import { IResponseObject } from "../response";

export const analyticsRead = process.env.NEXT_PUBLIC_ANALYTICS_READ_URL;
export const activityWrite = process.env.NEXT_PUBLIC_ACTIVITY_WRITE_URL;
export const courseWriteUrl = process.env.NEXT_PUBLIC_COURSE_WRITE_URL;

export const AnalyticsApi = {
  POST_Activity: async (
    payload: IActivity
  ): Promise<IResponseObject<IActivity>> => {
    const activity = await POST(
      `${activityWrite}/Activities/CreateActivity`,
      payload
    );
    return activity;
  },

  POST_CourseProgress: async (
    payload: any
  ): Promise<any> => {
    try {
      const response = await POST(
        `${courseWriteUrl}/Enrollments/UpdateProgress`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error enrolling course:", error);
      throw error;
    }
  },
  GET_StudentAnalytics: async (courseId: string, creatingUser: string) => {
    const response = await GET(
      `${analyticsRead}/Analytics/GetCourseProgress?courseId=${courseId}&creatingUser=${creatingUser}`
    );
    return response;
  },

  GET_StudentSectionAnalytics: async (
    studentNumber: string,
    courseId: string
  ) => {
    const response = await GET(
      `${analyticsRead}/Analytics/GetStudentCourseProgress?studentNumber=${studentNumber}&courseId=${courseId}`
    );
    return response;
  },

  GET_StudentAverageSectionAnalytics: async (
    courseId: string,
    creatingUserId: string
  ) => {
    const response = await GET(
      `${analyticsRead}/AveragesAnalytics/GetCourseProgressAverage?courseId=${courseId}&creatingUserId=${creatingUserId}`
    );
    return response;
  },

  GET_StudentAverageQuizAnalytics: async (
    courseId: string,
    creatingUserId: string
  ) => {
    const response = await GET(
      `${analyticsRead}/AveragesAnalytics/GetQuizProgressAverage?courseId=${courseId}&creatingUserId=${creatingUserId}`
    );
    return response;
  },

  GET_StudentAverageAssessmentAnalytics: async (
    courseId: string,
    creatingUserId: string
  ) => {
    const response = await GET(
      `${analyticsRead}/AveragesAnalytics/GetAssessmentProgressAverage?courseId=${courseId}&creatingUserId=${creatingUserId}`
    );
    return response;
  },

  GET_StudentAssessmentAnalytics: async (
    courseId: string,
    studentId: string
  ) => {
    const response = await GET(
      `${analyticsRead}/Analytics/GetStudentAssessmentProgress?studentNumber=${studentId}&courseId=${courseId}`
    );
    return response;
  },

  GET_StudentQuizAnalytics: async (studentId: string, courseId: string) => {
    const response = await GET(
      `${analyticsRead}/Analytics/GetStudentQuizProgress?studentNumber=${studentId}&courseId=${courseId}`
    );
    return response;
  },
};
