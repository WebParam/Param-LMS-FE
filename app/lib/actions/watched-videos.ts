import { get} from "../utils";
import { Diagnostic } from "../logger/logger";
import { rAnalyticUrl} from "./endpoints";


export const getCourseWatchedVideos = async (id: string) => {
    try {
      const resp = await get(
        `${rAnalyticUrl}/VideoWatched/Course/${id}/Videos`
      );
  
      const data = resp.data;
      Diagnostic("SUCCESS ON GET, returning", data);
      return data;
    } catch (err) {
      Diagnostic("ERROR ON GET, returning", err);
      throw err;
    }
  };

  
export const getStudentWatchedVideos = async (studentId:string,courseId: string) => {
    try {
      const resp = await get(
        `${rAnalyticUrl}/VideoWatched/Student/${studentId}/Course/${courseId}/Videos`
      );
      const data = resp.data;
      Diagnostic("SUCCESS ON GET, returning", data);
      return data;
    } catch (err) {
      Diagnostic("ERROR ON GET, returning", err);
      throw err;
    }
  };
  