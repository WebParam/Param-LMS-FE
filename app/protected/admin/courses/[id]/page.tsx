"use client"
import EditForm from "@/app/components/course/[id]/editForm";
import { useSearchParams } from "next/navigation";
import { createCourse } from "@/app/lib/action/course";

const Body = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const title = searchParams.get("title") || "";
  const description = searchParams.get("description") || "";
  const instructorName = searchParams.get("instructorName") || "";
  const logoUrl = searchParams.get("logoUrl") || "";

  return (
    <>
      <div className="card mb-0">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <EditForm
            title={title}
            description={description}
            instructorName={instructorName}
            logoUrl={logoUrl}
            action={createCourse}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
