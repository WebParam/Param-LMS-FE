import { Diagnostic } from "../logger/logger";
import { get } from "../utils";
import { rAggregatorUrl } from "./endpoints";

export const getEnrollments = async (courseId: string, enrolled: boolean) => {
  try {
    const resp = await get(
      `${rAggregatorUrl}/StudentCourse/GetStudentInfoSummary/${courseId}?enrolled=${enrolled}`
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
