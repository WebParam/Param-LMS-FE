import { getAssessments } from "@/app/lib/actions/assessments";
import PageHeader from "@/components/facilitator/[courseId]/grade/assessments/PageHeader";
import Assessments from "@/components/facilitator/[courseId]/grade/assessments/Assessments";

const Page = async ({ params }: { params: { courseId: string } }) => {
  const courseId = params.courseId;
  const assessments = await getAssessments(courseId);

  return (
    <>
      <PageHeader />

      <div className="container page__container page__container page-section">
        <div className="card mb-0">
          <div
            data-aos="fade-up"
            className="table-responsive"
            data-toggle="lists"
            data-lists-sort-by="js-lists-values-employee-name"
            data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
          >
            <Assessments list={assessments} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
