"use client";
import { useSearchParams, useParams } from "next/navigation";
import AssignAssessmentModal from "./AssignAssessmentModal";
import { useState } from "react";
import Link from "next/link";

export default function PageHeader() {
  const searchParams = useSearchParams();
  const { courseId, assessmentId } = useParams<{
    courseId: string;
    assessmentId: string;
  }>();
  const assessmentName = searchParams.get("assessment-name");
  const status = searchParams.get("status") as string;
  const [openModal, setOpenModal] = useState(status === "available");
  const statuses: { [key: string]: string } = {
    all: "All",
    available: "Available",
    inProgress: "In Progress",
    pendingModeration: "Pending Moderation",
    moderated: "Moderated",
  };

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">
                {assessmentName} - {statuses[status]} Assessments
              </h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">
                  {assessmentName} - Assessments
                </li>
              </ol>
            </div>
          </div>
          <AssignAssessmentModal
            show={openModal}
            id={assessmentId}
            onHide={() => {
              setOpenModal(false);
            }}
          />
          <Link
            className="btn btn-success"
            href={`/protected/home/facilitator/${courseId}/grade/assessments?status=${status}`}
          >
            Mark Assessments
          </Link>
        </div>
      </div>
    </>
  );
}
