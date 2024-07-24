"use client";
import Link from "next/link";
import "./layout.scss";
import { post } from "@/app/lib/utils";
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";
import { useState } from "react";
import { Modal } from "react-bootstrap";

import Cookies from "universal-cookie";

function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const router = useRouter();
  const { id: courseId, studentId } = useParams<{
    id: string;
    studentId: string;
  }>();
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

  async function enrollStudent() {
    setLoading(true);
    const payload = {
      userId: studentId,
      course: courseId,
    };

    const res = await post(
      `https://khumla-dev-newcourse-write.azurewebsites.net/api/v1/Enrollments/AddEnrollment`,
      payload
    );

    if (res) {
      router.push("/protected/admin/course-applicants");
      setLoading(false);
    }
    setLoading(false);
  }

  let allDocsAccepted = cookies.get("documentsCompled") ?? "";

  console.log("are docs complete?", allDocsAccepted);

  return (
    <>
      <Modal show={loading} keyboard={false} centered>
        <Modal.Body>
          <div className="text-dark d-flex flex-column justify-content-center align-items-center gap-2">
            <div
              className="spinner-border text-dark spinner-border-md"
              role="status"
            />
            <p>Enrolling student...</p>
          </div>
        </Modal.Body>
      </Modal>

      <div className="card p-relative o-hidden mb-0">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.title}
              href={tab.url}
              className={pathname == tab.path ? "active" : ""}
              data-toggle="tab"
              role="tab"
              aria-selected="true"
              style={{ cursor: "pointer" }}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{tab.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="card mt-3">{children}</div>
      <div className="card-footer p-8pt">
        <button
          className="btn btn-primary enrolBtn notComplete"
          onClick={enrollStudent}
        >
          {loading ? (
            <div
              className="spinner-border text-light spinner-border-sm"
              role="status"
            />
          ) : (
            "Enroll Student"
          )}
        </button>
      </div>
    </>
  );
}

export default Layout;
