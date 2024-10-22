"use client";
import { useRouter, useSearchParams } from "next/navigation";
export default function PageHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const submitStatus = searchParams.get("submitStatus") as string;
  const submitStatuses: { [key: string]: string } = {
    all: "All",
    pending: "Pending",
    graded: "Graded",
    moderated: "Moderated",
  };
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">{studentName} - {submitStatuses[submitStatus]} Student Assessment</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">
                  {studentName} - {submitStatuses[submitStatus]} Student Assessment
                </li>
              </ol>
            </div>
          </div>
          <button onClick={() => router.back()} className="btn btn-success">
            Student Assessments
          </button>
        </div>
      </div>
    </>
  );
}
