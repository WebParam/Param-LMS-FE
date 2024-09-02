"use client"
import Link from "next/link";
import Cookies from "universal-cookie";

export default function PageHeader() {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const numberOfProjects = cookies.get("number-of-projects");

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2 className="mb-0">Projects</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Projects</li>
              </ol>
            </div>
            <div>
            {loggedInUser &&
  (loggedInUser.role === "SuperAdmin" || loggedInUser.role === "Admin") && (
    <Link
      className={`btn ${
        numberOfProjects >= 2 ? "btn-secondary disabled" : "btn-success"
      }`}
      href={numberOfProjects >= 2 ? "#" : `/protected/home/projects/create`}
      style={{ pointerEvents: numberOfProjects >= 2 ? "none" : "auto" }}
      onClick={(e) => {
        if (numberOfProjects > 2) {
          e.preventDefault();
        }
      }}
    >
      Create Project
    </Link>
  )}

            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
