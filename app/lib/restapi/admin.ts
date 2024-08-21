export async function getAdminAssessments(id: string) {

    const url = `${process.env.ASSESSMENT_READ_URL}/api/Assessments/GetAssessmentsByUser?userId=${id}`;
    console.log("url", url)
    const assessments = await fetch(url).then((res) => res.json())
    return assessments;
}