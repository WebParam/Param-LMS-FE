"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PageHeader() {
  const [title, setTitle] = useState("Course");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USER === "freemium") {
      setTitle("Project");
    }
  }, []);

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2 className="mb-0">{title} Applicants</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{title} Applicants</li>
              </ol>
            </div>
            <div>
              <Link
                className="btn btn-success"
                href={`/protected/home/${title.toLowerCase()}s`}
              >
                All {title}s
              </Link>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}