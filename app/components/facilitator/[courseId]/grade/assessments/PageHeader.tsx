"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";

export default function PageHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">Mark Assessments</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Mark Assessments</li>
              </ol>
            </div>
          </div>
          <button
            onClick={() =>
              router.push(`/protected/home/facilitator?title=${courseTitle}`)
            }
            className="btn btn-success"
          >
            {loggedInUser.role} Dashboard
          </button>
        </div>
      </div>
    </>
  );
}
