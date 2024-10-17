import Assessments from "@/components/Assessment/Assessments";
import { getAssessments } from "@/app/lib/actions/assessments";
import Tabs from "@/components/Assessment/Tabs";
import PageHeader from "@/components/PageHeaders/assessments/PageHeader";

const Page = async ({ params }: { params: { id: string } }) => {
  const courseId = params.id;
  const assessments = await getAssessments(courseId);

  return (
    <>
      <PageHeader courseId={courseId} />

      <div className="container page__container page__container page-section">
        <Tabs />
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
