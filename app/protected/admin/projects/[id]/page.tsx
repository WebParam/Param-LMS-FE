import { getProject, updateProject } from "@/app/lib/actions/project";
import EditForm from "@/components/project/[id]/editform";

export default async function Course({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  const updateProjectWithId = updateProject.bind(null, params.id)

  return (
    <>
      <div className="card mt-3">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          {project && (
            <EditForm
            title={project.programTitle}
            description={project.programDescription}
            projectLogoUrl={project.logo}
            duration={project.duration}
            action={updateProjectWithId}
          />
          )}
        </div>
      </div>
    </>
  );
}
