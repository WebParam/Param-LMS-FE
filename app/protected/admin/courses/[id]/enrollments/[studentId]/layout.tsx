"use client";
import Link from "next/link";
import "./layout.scss";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStudentDocuments } from "@/app/lib/actions/courseStudents";
import { rUserUrl } from "@/app/lib/actions/endpoints";
import { downloadFile } from "@/app/lib/utils";
import PageHeader from "./PageHeader";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const refreshId = searchParams.get("refreshId");
  const [loading, setLoading] = useState(false);
  const isFreemium = process.env.NEXT_PUBLIC_USER;

  const { id: courseId, studentId } = useParams<{
    id: string;
    studentId: string;
  }>();
  const [documents, setDocuments] = useState([]);

  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const baseLayoutUrl = arrUrl.join("/");

  const tabs = [
    {
      title: "Student Info",
      url: `${baseLayoutUrl}/profiles?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/profiles`,
    },
    {
      title: "Documents",
      url: `${baseLayoutUrl}/document?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/document`,
    },
    {
      title: "Internship Details",
      url: `${baseLayoutUrl}/internship-details?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/internship-details`,
    },
    {
      title: "Assessments",
      url: `${baseLayoutUrl}/assessment?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/assessments`,
    },
    {
      title: "Assignments",
      url: `${baseLayoutUrl}/assignment?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/assignment`,
    },
    {
      title: "SOR",
      url: `${baseLayoutUrl}/sor?title=${courseTitle}&studentName=${studentName}`,
      path: `${baseLayoutUrl}/sor`,
    },
  ];

  async function studentInformation() {
    const response = await getStudentDocuments(studentId);
    setDocuments(response);
  }

  const downloadZip = () => {
    setLoading(true);
    const filename = "student_information";
    const fileExtension = "zip";
    const isGet = true;
    const url = `${rUserUrl}/Documents/DownloadDocuments/${studentId}`;
    downloadFile(url, filename, fileExtension, setLoading, isGet);
  };

  useEffect(() => {
    studentInformation();
  }, [refreshId]);

  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        {!isFreemium && (
          <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
            <div className="mx-1" style={{ width: "187px", height: "37.5px" }}>
              <button
                onClick={() => downloadZip()}
                style={{ cursor: documents.length > 0 ? "pointer" : "" }}
                className={`btn w-100 h-100 ${
                  documents.length > 0 ? "btn-success" : "btn-secondary"
                }`}
                disabled={!(documents.length > 0)}
              >
                {loading ? (
                  <div className="spinner-border text-white" role="status" />
                ) : (
                  "Download Documents"
                )}
              </button>
            </div>
          </div>
        )}

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
      </div>
    </>
  );
}

export default Layout;
