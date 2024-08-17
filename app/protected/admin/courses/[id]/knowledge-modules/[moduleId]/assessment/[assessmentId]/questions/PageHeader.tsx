"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function PageHeader() {
  const { id, moduleId } = useParams<{ id: string; moduleId: string }>();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const moduleTitle = searchParams.get("moduleTitle");
  const topicTitle = searchParams.get("topicTitle");

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2 className="mb-0">{topicTitle}</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{topicTitle}</li>
              </ol>
            </div>
            <div>
              <Link
                className="btn btn-success"
                href={`/protected/admin/courses/${id}/knowledge-modules/${moduleId}/assessments?title=${courseTitle}&moduleTitle=${moduleTitle}`}
              >
                Assessments
              </Link>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
