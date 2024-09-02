"use client";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";


interface Tabs {
  [id: string]: string;
}

export default function PageHeader() {
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2 className="mb-0">Edit project</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="/protected/home/projects">Home</a>
                </li>
                <li className="breadcrumb-item active">Edit project</li>
              </ol>
            </div>
            <div>
                <Link
                  className="btn btn-success"
                  href={`/protected/home/projects`}
                >
                  All Projects
                </Link>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}