"use client";
import Link from "next/link";
import "./layout.scss";
import {
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import EnrollStudentModal from "@/components/course/[id]/course-applicants/EnrollStudentModal";
import RejectStudentModal from "@/components/course/[id]/course-applicants/RejectStudentModal";
import RequestModificationModal from "@/components/course/[id]/course-applicants/RequestModificationModal";
import { getStudentDocuments } from "@/app/lib/actions/courseStudents";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const refreshId = searchParams.get("refreshId");
  const { id: courseId, studentId } = useParams<{
    id: string;
    studentId: string;
  }>();
  const [enrollModal, setEnrollModal] = useState<boolean>(false);
  const [rejectModal, setRejectModal] = useState<boolean>(false);
  const [requestModal, setRequestModal] = useState<boolean>(false);
  const [documents, setDocuments] = useState([]);

  const baseLayoutUrl = `/protected/admin/courses/${courseId}/course-applicants/${studentId}`;
  const tabs = [
    {
      title: "Profile",
      url: `${baseLayoutUrl}/profiles?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/profiles`,
    },
    {
      title: "Demographics",
      url: `${baseLayoutUrl}/demographics?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/demographics`,
    },
    {
      title: "Contacts",
      url: `${baseLayoutUrl}/contacts?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/contacts`,
    },
    {
      title: "Regional",
      url: `${baseLayoutUrl}/regional?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/regional`,
    },
    {
      title: "Employment",
      url: `${baseLayoutUrl}/employment?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/employment`,
    },
    {
      title: "Documents",
      url: `${baseLayoutUrl}/document?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/document`,
    },
  ];

  async function studentInformation() {
    const response = await getStudentDocuments(studentId);
    setDocuments(response);
  }

  useEffect(() => {
    studentInformation();
    setRejectModal(false);
    setEnrollModal(false);
    setRequestModal(false);
  }, [refreshId]);

  return (
    <>
      <EnrollStudentModal
        id={studentId}
        show={enrollModal}
        onHide={() => setEnrollModal(false)}
      />

      <RequestModificationModal
        id={studentId}
        documents={documents}
        show={requestModal}
        onHide={() => setRequestModal(false)}
      />

      <RejectStudentModal
        id={studentId}
        show={rejectModal}
        onHide={() => setRejectModal(false)}
      />

      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        <div className="mx-1">
          <button
            className="btn btn-success btn-block mx-1"
            onClick={() => setEnrollModal(true)}
          >
            Enroll Student
          </button>
        </div>
        <div className="mx-1">
          <button
            className={`btn btn-block mx-1 ${
              documents.length > 0 ? "btn-success" : "btn-secondary"
            }`}
            onClick={() => setRequestModal(true)}
            disabled={!(documents.length > 0)}
          >
            Request Modification
          </button>
        </div>
        <div className="mx-1">
          <button
            className="btn btn-danger btn-block"
            onClick={() => setRejectModal(true)}
          >
            Reject Application
          </button>
        </div>
      </div>

      <div className="card p-relative o-hidden mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              href={tab.url}
              className={pathname == tab.path ? "bg-success" : ""}
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              style={{ cursor: "pointer" }}
            >
              <span className="flex d-flex flex-column">
                <strong
                  className={`card-title ${
                    pathname == tab.path ? "text-white" : ""
                  }`}
                >
                  {tab.title}
                </strong>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="card mt-3">{children}</div>
    </>
  );
}

export default Layout;
