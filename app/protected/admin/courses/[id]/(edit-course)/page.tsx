import EditForm from "@/app/components/course/[id]/editForm";
import { createCourse, getCourse } from "@/app/lib/actions/course";

export default async function Course({ params }: { params: { id: number } }) {
  const course = await getCourse(params.id);

  return (
    <>
      <div className="card mt-3">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          {course && (
            <EditForm
              title={course.title}
              description={course.description}
              instructorName={course.instructorName}
              logoUrl={course.logoUrl}
              thumbUrl={course.thumbUrl}
              action={createCourse}
            />
          )}
        </div>
      </div>
    </>
  );
}
