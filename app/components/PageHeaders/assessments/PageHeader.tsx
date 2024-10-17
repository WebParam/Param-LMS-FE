"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
export default function PageHeader({ courseId }: { courseId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const pathName = usePathname();
  const { moduleId } = useParams<{
    moduleId: string;
  }>();
  const isKnowledgeModule =
    pathName ==
    `/protected/admin/courses/${courseId}/grade/assignments/modules`;
  const isAssignmentPage =
    pathName ==
    `/protected/admin/courses/${courseId}/grade/assignments/modules/${moduleId}`;

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">
                {isKnowledgeModule
                  ? "Knowledge Modules"
                  : isAssignmentPage
                  ? "Mark Assingments"
                  : "Mark Assessments"}
              </h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">
                  Facilitator Dashboard
                </li>
              </ol>

              <h5 className="mt-2">Facilitator : MS K Ngubani</h5>
            </div>
          </div>

          {isKnowledgeModule && (
            <button
              onClick={() =>
                router.push(
                  `/protected/admin/facilitator?title=${courseTitle}&id=${courseId}`
                )
              }
              className="btn btn-success"
            >
              Facilitator Dashboard
            </button>
          )}

          {isAssignmentPage && (
            <button
              onClick={() =>
                router.push(
                  `/protected/admin/courses/${courseId}/grade/assignments/modules?title=${courseTitle}`
                )
              }
              className="btn btn-success"
            >
              Knowledge Modules
            </button>
          )}
        </div>
      </div>
    </>
  );
}
