import CreateForm from "@/app/components/project/create/form";
import { createProject } from "@/app/lib/actions/project";
import PageHeader from "./PageHeader";

const Body = () => {
  const title = "";
  const description = "";
  const duration = "";
  const projectLogoUrl ="";

  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        <div className="card mb-0">
          <div
            className="table-responsive"
            data-toggle="lists"
            data-lists-sort-by="js-lists-values-employee-name"
            data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
          >
            <CreateForm
              title={title}
              description={description}
              projectLogoUrl={projectLogoUrl}
              duration={duration}
              action={createProject}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
