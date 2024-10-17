import { IProjectAnalytics } from "@/app/interfaces/project";
import { Diagnostic } from "../logger/logger";
import { get } from "../utils";
import { rAggregatorUrl } from "./endpoints";

export const getEnrollments = async (id: string, value: boolean): Promise<IProjectAnalytics> => {
  try {
    const resp = await get(`${rAggregatorUrl}/StudentCourse/GetStudentInfoSummary/${id}?enrolled=${value}`);
    const data: IProjectAnalytics = resp.data;
    Diagnostic("SUCCESS ON GET, returning", data);
    return data;
  } catch (err) {
    Diagnostic("ERROR ON GET, returning", err);
    throw err;
  }
};
