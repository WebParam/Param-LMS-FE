"use client";
import Link from "next/link";
import "./layout.scss";
import { usePathname, useSearchParams, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EnrollStudentModal from "@/components/course/[id]/course-applicants/EnrollStudentModal";
import RejectStudentModal from "@/components/course/[id]/course-applicants/RejectStudentModal";
import { saveAs } from 'file-saver';
import RequestModificationModal from "@/components/course/[id]/course-applicants/RequestModificationModal";
import { downloadStudentDocs, getStudentDocuments } from "@/app/lib/actions/courseStudents";
import { Modal } from "react-bootstrap";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseTitle = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const refreshId = searchParams.get("refreshId");
  const { id: courseId, studentId } = useParams<{ id: string; studentId: string }>();
  const [enrollModal, setEnrollModal] = useState<boolean>(false);
  const [rejectModal, setRejectModal] = useState<boolean>(false);
  const [requestModal, setRequestModal] = useState<boolean>(false);
  const [documents, setDocuments] = useState([]);
  const [exportModal, setExportModal] = useState(false);
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const isEnrolled = searchParams.get("isEnrolled");

  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const baseLayoutUrl = arrUrl.join("/");

  const tabs = [
    {
      title: "Profile",
      url: `${baseLayoutUrl}/profiles?title=${courseTitle}&studentName=${studentName}&isEnrolled=${isEnrolled}`,
      path: `${baseLayoutUrl}/profiles`,
    },
    {
      title: "Demographics",
      url: `${baseLayoutUrl}/demographics?title=${courseTitle}&studentName=${studentName}&isEnrolled=${isEnrolled}`,
      path: `${baseLayoutUrl}/demographics`,
    },
    {
      title: "Contacts",
      url: `${baseLayoutUrl}/contacts?title=${courseTitle}&studentName=${studentName}&isEnrolled=${isEnrolled}`,
      path: `${baseLayoutUrl}/contacts`,
    },
    {
      title: "Regional",
      url: `${baseLayoutUrl}/regional?title=${courseTitle}&studentName=${studentName}&isEnrolled=${isEnrolled}`,
      path: `${baseLayoutUrl}/regional`,
    },
    {
      title: "Employment",
      url: `${baseLayoutUrl}/employment?title=${courseTitle}&studentName=${studentName}&isEnrolled=${isEnrolled}`,
      path: `${baseLayoutUrl}/employment`,
    },
    {
      title: "Documents",
      url: `${baseLayoutUrl}/document?title=${courseTitle}&studentName=${studentName}&isEnrolled=${isEnrolled}`,
      path: `${baseLayoutUrl}/document`,
    },
  ];

  async function studentInformation() {
    const response = await getStudentDocuments(studentId);
    setDocuments(response);
  }

  const exportStudentDocuments = async () => {
    setIsSpinner(true);
    try {
      const filename = "student_information.zip";
      const response = await downloadStudentDocs(studentId);

      if (!response.ok) {
        setIsSpinner(false);
        throw new Error('Network response was not ok');
      }
      setIsSpinner(false);
      const blob = await response.blob();
      saveAs(blob, filename);
    } catch (error) {
      setIsSpinner(false);
      console.error("Error downloading the file:", error);
    }
  };

  useEffect(() => {
    studentInformation();
  }, [refreshId]);

  const updateIsEnrolled = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('isEnrolled', '5');
    router.push(`${pathname}?${params.toString()}`);
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

      <Modal show={exportModal} keyboard={false} centered>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center flex-column gap-5">
            <div className="spinner-border text-primary" role="status" />
            <p style={{ color: "#252525" }}>Exporting Zip file...</p>
          </div>
        </Modal.Body>
      </Modal>

      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        {
          Number(isEnrolled) === 0 || Number(isEnrolled) === 1 ? null : <>
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
                className={`btn btn-block mx-1 ${documents.length > 0 ? "btn-success" : "btn-secondary"}`}
                onClick={() => setRequestModal(true)}
                disabled={!(documents.length > 0)}
              >
                Request Modification
              </button>
            </div>
          </>
        }

        {
          Number(isEnrolled) !== 0 || Number(isEnrolled) !== 1 &&
          <div className="mx-1">
            <button
              className="btn btn-block mx-1 btn-success"
              onClick={updateIsEnrolled}
            >
              Revise
            </button>
          </div>
        }

        <div className="mx-1">
          <button
            className={`btn btn-block mx-1 ${documents.length > 0 ? "btn-success" : "btn-secondary"}`}
            onClick={() => exportStudentDocuments()}
            disabled={!(documents.length > 0)}
          >
            Download Documents
          </button>
        </div>

        {
          Number(isEnrolled) === 0 || Number(isEnrolled) === 1 ? null : <>
            <div className="mx-1">
              <button
                className="btn btn-danger btn-block"
                onClick={() => setRejectModal(true)}
              >
                Reject Application
              </button>
            </div>
          </>
        }

        {
          Number(isEnrolled) === 0 || Number(isEnrolled) === 1 ? null :
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
                  {documents.length > 0 ? (
                    <>
                      <div
                        onClick={() => setRequestModal(true)}
                        className="dropdown-item"
                      >
                        Request Modification
                      </div>
                      <div
                        onClick={() => exportStudentDocuments()}
                        className="dropdown-item"
                      >
                        {
                          isSpinner ? <span className="spinner-border text-white" role="status" /> : "Download Documents"
                        }
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
        }
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
                  className={`card-title ${pathname == tab.path ? "text-white" : ""}`}
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
