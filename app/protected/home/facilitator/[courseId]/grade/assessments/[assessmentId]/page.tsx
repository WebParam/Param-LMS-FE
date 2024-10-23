import { getStudentsAssessment } from "@/app/lib/actions/assessments";
import PageHeader from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/PageHeader";
import { Moderation } from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/Button";
import StudentAssessments from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/StudentAssessments";
import Tabs from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/Tabs";

export default async function Page({
  params,
  searchParams,
}: {
  params: { assessmentId: string };
  searchParams: { [key: string]: string };
}) {
  const assessments = await getStudentsAssessment(params.assessmentId);
  const { submitStatus } = searchParams;
  let filterAssessments = assessments;

  if (submitStatus === "pending") {
    filterAssessments = assessments.filter(
      (assessment: any) => assessment.factilitatorMark === -1
    );
  } else if (submitStatus === "graded") {
    filterAssessments = assessments.filter(
      (assessment: any) => assessment.factilitatorMark > -1
    );
  } else if (submitStatus === "moderated") {
    filterAssessments = assessments.filter(
      (assessment: any) => assessment.moderatorMark > -1
    );
  }

  return (
    <>
      <PageHeader />

      <div className="container page__container page__container page-section">
        <Moderation />
        <Tabs />
        <div data-aos="flip-up" className="card mb-0">
          <StudentAssessments list={filterAssessments} />
        </div>
      </div>
    </>
  );
}
