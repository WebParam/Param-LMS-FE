import { getStudentsAssessment } from "@/app/lib/actions/assessments";
import PageHeader from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/PageHeader";
import { Moderation } from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/Button";
import StudentAssessments from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/StudentAssessments";
import Tabs from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/Tabs";

export default async function Page({
  params,
}: {
  params: { assessmentId: string };
}) {
  const assessments = await getStudentsAssessment(params.assessmentId);

  return (
    <>
      <PageHeader />

      <div className="container page__container page__container page-section">
        <Moderation />
        <Tabs />
        <div data-aos="flip-up" className="card mb-0">
          <StudentAssessments list={assessments} />
        </div>
      </div>
    </>
  );
}
