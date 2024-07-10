import { getCourses } from "@/app/lib/actions/course";
import { getModules } from "@/app/lib/actions/module";
import KnowledgeModules from "@/components/course/KnowledgeModules";
import PageHeader from "../facilitator/(components)/PageHeader";

const Page = async () => {
    const courseId = "6669f0ff8759b480859c10a7";
    const modules = await getModules(courseId);
    
 
  return (
    <>
      <div className="card mb-0">
      <PageHeader title="Facilitator Dashboard" facilitator />
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <KnowledgeModules list={modules} />
        </div>
      </div>
    </>
  );
};

export default Page;
