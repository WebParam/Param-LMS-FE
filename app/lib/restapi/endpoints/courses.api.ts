import { ICourse, IDeleteSection,IDeleteVideo,IStudentCourses } from "@/app/interfaces/courses";
import { GET, POST, PUT ,DELETE} from "../client";
import { IResponseObject } from "../response";



export const courseWriteUrl = "https://khumla-development-course-write.azurewebsites.net/api";

export const courseReadUrl="https://khumla-development-course-read.azurewebsites.net/api";

export const CourseApi = {
    GET_Courses: async (): Promise<any> => {
        const response = await GET(`${courseReadUrl}/Courses/GetCourses`);
        return response;
      },
    
      POST_CreateCourse: async (
        payload: ICourse
      ): Promise<IResponseObject<ICourse>> => {
        const response = await POST(`${courseWriteUrl}/Courses/AddCourse`, payload);
        return response;
      },
    
      PUT_UpdateCourse: async (payload: ICourse): Promise<any> => {
        try {
          
          const response = await PUT(`${courseWriteUrl}/Courses/updateCourse`, payload);
          
          return response;
        } catch (error) {
          console.error("Error updating course:", error);
          throw error;
        }
      },
      
      POST_CourseEnrollment: async (payload:any): Promise<any> => {
        try{
          const response = await POST(`${courseWriteUrl}/Enrollments/AddEnrollment`, payload);
          return response;
        }
        catch(error){
          console.error("Error enrolling course:", error);
          throw error;
        }
      },
    
      DELETE_DeleteSection: async (
        payload: IDeleteSection
      ): Promise<any> => {
        const response = await PUT(`${courseWriteUrl}/Courses/DeleteSection`, payload);
        return response;
      },
    
      DELETE_DeleteVideo: async (
        payload: IDeleteVideo
      ): Promise<IResponseObject<any>> => {
        const response = await POST(`${courseWriteUrl}/Courses/DeleteVideo`, payload);//USE PUT METHOD
        return response;
      },
    
      GET_CourseById: async (
        courseId: string
      ): Promise<IResponseObject<ICourse>> => {
        const response = await GET(`${courseReadUrl}/Courses/GetCourse?id=${courseId}`);
        return response;
      },
      GET_AllCourses: async (
        courseId: string
      ): Promise<IResponseObject<ICourse[]>> => {
        const response = await GET(`${courseReadUrl}/Courses/`);
        return response;
      },
      GET_CoursesByUserId: async (
        userId: string
      ): Promise<IResponseObject<ICourse[]>> => {
        const response = await GET(`${courseReadUrl}/Courses/${userId}`);
        return response;
      },
  
      GET_StudentCoursesById: async (
        studentId: string
      ): Promise<IResponseObject<IStudentCourses>> => {
        const response = await GET(`${courseReadUrl}/Courses/GetStudentCourses?studentId=${studentId}`);
        return response;
      },
      
      GET_EnrolledCoursesByStudentId: async (
        studentId:string
      ): Promise<any> => {
        const response = await GET(`${courseReadUrl}/Enrollments/GetUserEnrollements?userId=${studentId}`);
        return response;
      },
    
      GET_CoursesByIds: async (courseIds: string[]): Promise<any> => {
        const queryParams = courseIds.map(id => `Ids=${id}`).join('&');
        const response = await GET(`${courseReadUrl}/Courses/GetCoursesByIds?${queryParams}`);
        return response;
      },
    
    
    
    DELETE_CourseById: async (
        courseId: string
      ): Promise<any> => {
    
        const response = await DELETE(`${courseWriteUrl}/Courses/${courseId}`);
        
        return response;
      },
      POST_Image: async (courseId :string , imageFile:any)
:Promise<IResponseObject<ICourse>> => {
  const _course:any = await POST(`${courseWriteUrl}/Courses/UploadImage/${courseId}`,imageFile);
  return _course;
},
        

}