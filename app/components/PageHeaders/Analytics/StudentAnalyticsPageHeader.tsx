"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: { title: string }) {
  const { studentId, moduleId } = useParams<{
    studentId: string;
    moduleId: string;
  }>();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const studentName = searchParams.get("studentName")!;
  const moduleTitle = searchParams.get("module")!;
  const isStudent =
    pathName == `/protected/admin/analytics/graphs/${studentId}/course`;

  const isModule =
    pathName == `/protected/admin/analytics/graphs/${studentId}/${moduleId}`;
  const isHome = pathName == "/protected/admin/analytics/grouped-analytics"
  const isGroupedStAnalytics = pathName.includes("/protected/admin/analytics/grouped-analytics/videos")

  const router = useRouter();
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">
                {!isStudent && !isModule && (isGroupedStAnalytics ? `Video Analytics - ${title}` : `Grouped Analytics - ${title}`)}
                {isStudent && <span>{studentName} - {isGroupedStAnalytics ? "Video Analytics" : "Grouped Analytics"}</span>}
                {isModule && (
                  <span>
                    {studentName} - {moduleTitle}
                  </span>
                )}
              </h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{title} </li>
                <li className="breadcrumb-item active">Grouped Analytics</li>
              </ol>
            </div>
          </div>
          {
            isHome &&  <button onClick={() => router.replace("/protected/home/courses")} className="btn btn-success">
                All Courses
          </button>
          }
          {isStudent && (
            <button onClick={() => router.back()} className="btn btn-success">
              Grouped Analytics
            </button>
          )}
          {isModule && (
            <button onClick={() => router.back()} className="btn btn-success">
              {studentName} Analytics
            </button>
          )}
                    <button className="btn btn-primary">
                      
                      {
                        isGroupedStAnalytics ? "  All Courses" : "Grouped Analytics"
                      }
                    </button>

        </div>
      </div>
    </>
  );
}
