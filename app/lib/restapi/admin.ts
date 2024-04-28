import { GET, POST, PUT, DELETE } from "./client";

const baseUrl = "https://khumla-development-api-aggregator.azurewebsites.net/";

export async function getAdminAssessments(id: string) {

    const url = `https://khumla-dev-assessment-read.azurewebsites.net/api/Assessments/GetAssessmentsByUser?userId=${id}`;
    console.log("url", url)
    const assessments = await fetch(url).then((res) => res.json())
    return assessments;
}

export const getCourseGraphs = async (
    creatingUser: string,
    courseId: string
  ): Promise<any> => {
  
    const response = await GET(
      `${baseUrl}api/Graphs/GetCourseGraphs?creatingUser=${creatingUser}&courseId=${courseId}`
    );
    return response;
  };