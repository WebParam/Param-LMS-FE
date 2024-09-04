import Assessments from "@/components/Assessment/Assessments";
import { getAssessments } from "@/app/lib/actions/assessments";
import Assignments from "@/components/assignment/Assignments";
import PageHeader from "./PageHeader";

const Page = async () => {
  const courseId = "65dfa6c48d42c66c74d3940c";
  const assessments = await getAssessments(courseId);
  console.log("Assessments", assessments);

  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          <PageHeader />

          <div className="container page__container page__container page-section">
            <div className="card mb-0">
              <div
                className="table-responsive"
                data-toggle="lists"
                data-lists-sort-by="js-lists-values-employee-name"
                data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
              >
                <Assignments list={assessments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
