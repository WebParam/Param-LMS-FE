"use client";
import Link from "next/link";
import "./layout.scss";
import {
  usePathname,
  useSearchParams,
  useParams,
  useRouter,
} from "next/navigation";
import { useEffect, useState } from "react";
import EnrollStudentModal from "@/components/course/[id]/course-applicants/EnrollStudentModal";
import RejectStudentModal from "@/components/course/[id]/course-applicants/RejectStudentModal";
import RequestModificationModal from "@/components/course/[id]/course-applicants/RequestModificationModal";
import { getStudentDocuments } from "@/app/lib/actions/courseStudents";
import { rUserUrl } from "@/app/lib/actions/endpoints";
import { downloadFile } from "@/app/lib/utils";
import PageHeader from "./PageHeader";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseTitle = searchParams.get("title");
  const studentName = searchParams.get("studentName");

  const { id: courseId, studentId } = useParams<{
    id: string;
    studentId: string;
  }>();
  const [enrollModal, setEnrollModal] = useState<boolean>(false);
  const [rejectModal, setRejectModal] = useState<boolean>(false);
  const [requestModal, setRequestModal] = useState<boolean>(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isEnrolled = searchParams.get("isEnrolled");
  const isFreemium =  process.env.NEXT_PUBLIC_FREEMIUM ==="true";

  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const baseLayoutUrl = arrUrl.join("/");

  const tabs = [
    {
      title: "Student Info",
      url: `${baseLayoutUrl}/profiles?title=${courseTitle}&studentName=${studentName}&isEnrolled=${isEnrolled}`,
      path: `${baseLayoutUrl}/profiles`,
    },
    {
      title: "Documents",
      url: `${baseLayoutUrl}/document?title=${courseTitle}&studentName=${studentName}&isEnrolled=${isEnrolled}`,
      path: `${baseLayoutUrl}/document`,
    },
  ];

  async function studentInformation() {
    try {
      const response = await getStudentDocuments(studentId);
      setDocuments(response);
    } catch (err) {
      console.error("Failed to fetch student documents:", err);
      setError("Failed to load documents.");
    }
  }

  useEffect(() => {
    studentInformation();
  }, []);

  const updateIsEnrolled = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("isEnrolled", "5");
    router.push(`${pathname}?${params.toString()}`);
  };

  const downloadZip = async () => {
    setLoading(true);
    const filename = "student_information";
    const fileExtension = "zip";
    const isGet = true;
    const url = `${rUserUrl}/Documents/DownloadDocuments/${studentId}`;
    try {
      await downloadFile(url, filename, fileExtension, setLoading, isGet);
    } catch (err) {
      console.error("Failed to download documents:", err);
      setError("Failed to download documents.");
      setLoading(false);
    }
  };


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

      <PageHeader />
      <div className="container page__container page__container page-section">
        <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
          {Number(isEnrolled) !== 0 ||
            (Number(isEnrolled) !== 1 && (
              <div className="mx-1">
                <button
                  className="btn btn-block mx-1 btn-success"
                  onClick={updateIsEnrolled}
                >
                  Revise
                </button>
              </div>
            ))}

          {Number(isEnrolled) === 0 || Number(isEnrolled) === 1 ? null : (
            <>
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
                  className="btn btn-danger btn-block mx-1"
                  onClick={() => setRejectModal(true)}
                >
                  Reject Application
                </button>
              </div>
              <div className="mx-1">
                <button
                  className={`btn btn-block mx-1 ${
                    documents && documents.length > 0 ? "btn-success" : "btn-secondary"
                  }`}
                  onClick={() => setRequestModal(true)}
                  disabled={!(documents && documents.length > 0)}
                >
                  Request Modification
                </button>
              </div>
            </>
          )}

          {!isFreemium && (
            <div className="mx-1" style={{ width: "187px", height: "37.5px" }}>
              <button
                onClick={() => downloadZip()}
                style={{ cursor: documents && documents.length > 0 ? "pointer" : "" }}
                className={`btn w-100 h-100 ${
                  documents && documents.length > 0 ? "btn-success" : "btn-secondary"
                }`}
                disabled={!(documents && documents.length > 0)}
              >
                {loading ? (
                  <div className="spinner-border text-white" role="status" />
                ) : (
                  "Download Documents"
                )}
              </button>
            </div>
          )}

          {Number(isEnrolled) === 0 || Number(isEnrolled) === 1 ? null : (
            <div className="mx-1 d-flex align-items-center">
              <div className="dropdown ml-auto">
                <a
                  href="#"
                  data-toggle="dropdown"
                  data-caret="false"
                  className="text-muted"
                >
                  <i className="material-icons">more_vert</i>
                </a>
                <div
                  style={{ cursor: "pointer" }}
                  className="dropdown-menu dropdown-menu-right"
                >
                  {documents && documents.length > 0 ? (
                    <>
                      <div
                        onClick={() => setRequestModal(true)}
                        className="dropdown-item"
                      >
                        Request Modification
                      </div>
                      <div
                        onClick={() => downloadZip()}
                        className="dropdown-item"
                      >
                        {isSpinner ? (
                          <span
                            className="spinner-border text-white"
                            role="status"
                          />
                        ) : (
                          "Download Documents"
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="dropdown-item">Loading ...</div>
                      <div className="dropdown-item">Loading ...</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
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
      </div>
    </>
  );
}

export default Layout;
