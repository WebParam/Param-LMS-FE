import { Diagnostic } from "../logger/logger";
import { get } from "../utils";

export const getEnrollments = async (courseId: string) => {
    try {
      const resp = await get(
        `https://khumla-dev-newcourse-read.azurewebsites.net/api/v1/Enrollments/GetCourseEnrollements/${courseId}`
      );
      console.log(resp);
      const data = resp.data;
      Diagnostic("SUCCESS ON GET, returning", data);
      return data;
    } catch (err) {
      Diagnostic("ERROR ON GET, returning", err);
  
      console.error(err);
    }
};
