import { updateCourse, getCourse } from "@/app/lib/actions/course";
import { getProject, updateProject } from "@/app/lib/actions/project";
import ProjectForm from "@/components/project/form";

export default async function Course({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

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
             <ProjectForm data={project}/>
          )}
        </div>
      </div>
    </>
  );
}
