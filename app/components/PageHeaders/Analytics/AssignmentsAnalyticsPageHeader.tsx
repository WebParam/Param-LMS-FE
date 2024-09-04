"use client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: { title: string }) {
  const { id } = useParams<{
    id: string;
  }>();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentName = searchParams.get("studentName")!;
  const isStudent =
  pathName == `/protected/admin/analytics/graphs/assignments/${id}`;
  const isHome = pathName == "/protected/admin/analytics/graphs/assignments"


  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">
                {
                    isStudent ? <span>{studentName}</span> : `Assignments Analytics - ${title}`
                }
               </h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{title} </li>
                <li className="breadcrumb-item active">Assignments Analytics</li>
              </ol>
            </div>
          </div>
          {isStudent && (
            <button onClick={() => router.back()} className="btn btn-success">Assignments Analytics</button>
          )}
           {
            isHome &&  <button onClick={() => router.replace("/protected/home/courses")} className="btn btn-success">
                All Courses
          </button>
          }
        </div>
      </div>
    </>
  );
}
