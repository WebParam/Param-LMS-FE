"use client";

import { usePathname } from "next/navigation";

export default function PageHeader({
  assessment_name,
  ActivityTitle,
  title,
  mark,
}: {
  ActivityTitle: string;
  assessment_name: string;
  title: string;
  mark?: boolean;
}) {
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">{ActivityTitle}</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{title}</li>
                <li className="breadcrumb-item active">{assessment_name}</li>
              </ol>
              {mark && <h5 className="mt-2">Facilitator : MS K Ngubani</h5>}
            </div>

            {mark && (
              <div className="position-relative">
                <button className="btn btn-success">
                  Submit For Moderation
                </button>
              </div>
            )}
            {!mark && (
              <div>
                <h2 className="text-success">{mark}78%</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
