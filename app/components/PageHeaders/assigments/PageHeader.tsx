"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function PageHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const pathName = usePathname();
  const isAssessment =
    pathName == "/protected/admin/assessments-assignments/pages/assessments";
  const isStudent =
    pathName ==
    `/protected/admin/assessments-assignments/pages/assignments/66792cf48d68c25b74bba7aa/grade-assignment/6674335c5f6ceeb4980ebb68?title=${courseTitle}&studentNameLihle%20Mqhayi&homeTitle`;

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">Mark Assignments </h2>

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
          <button
            onClick={() =>
              router.push(`/protected/admin/facilitator?title=${courseTitle}`)
            }
            className="btn btn-success"
          >
            Dashboard
          </button>
        </div>
      </div>
    </>
  );
}
