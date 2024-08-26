import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AcceptDocumentModal from "./AcceptDocumentModal";
import RejectDocumentModal from "./RejectDocumentModal";
import DocumentModal from "./DocumentModal";

const TableRow = ({ document }: { document: any }) => {
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [acceptDocumentModal, setAcceptDocumentModal] = useState(false);
  const [rejectDocumentModal, setRejectDocumentModal] = useState(false);
  const [documentShowModal, setDocumentShowModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const title = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const email = searchParams.get("email");
  const isEnrolled = searchParams.get("isEnrolled");
  const date = new Date();

  useEffect(() => {
    setDocumentShowModal(false);
  }, [refreshId]);

  const acceptDoc = () => {
    setAcceptDocumentModal(true);
    router.replace(
      `${pathname}?title=${title}&studentName=${studentName}&email=${email}&refreshId=${date}&isEnrolled=${isEnrolled}`,
      {
        scroll: false,
      }
    );
  };

  const rejectDoc = () => {
    setRejectDocumentModal(true);
    router.replace(
      `${pathname}?title=${title}&studentName=${studentName}&email=${email}&refreshId=${date}&isEnrolled=${isEnrolled}`,
      {
        scroll: false,
      }
    );
  };

  return (
    <>
      <AcceptDocumentModal
        documentName={document.name}
        documentId={document.id}
        data={document}
        show={acceptDocumentModal}
        onHide={() => setAcceptDocumentModal(false)}
      />

      <RejectDocumentModal
        documentId={document.id}
        documentName={document.name}
        show={rejectDocumentModal}
        onHide={() => setRejectDocumentModal(false)}
      />

      <DocumentModal
        documentId={document.id}
        documentName={document.name}
        show={documentShowModal}
        onHide={() => setDocumentShowModal(false)}
      />

      <tr className="selected">
        <td style={{ width: "250px" }} className="py-0">
          <div className="d-flex align-items-center justify-content-center">
            <p
              className="text-center my-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "250px",
              }}
            >
              {document.name || "N/A"}
            </p>
          </div>
        </td>
        <td style={{ width: "300px" }} className="py-0">
          <p
            className="text-center my-2"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "300px",
            }}
          >
            {document.status || "N/A"}
          </p>
        </td>
        {(Number(isEnrolled) == 0 || Number(isEnrolled) == 1) ? null : (
  <td style={{ width: "400px" }} className="py-0">
    <div className="text-center my-2 w-100">
      <button
        type="button"
        onClick={() => acceptDoc()}
        className="btn btn-outline-success btn-sm rounded-pill py-1 px-3 mr-2"
      >
        Accept
      </button>
      <button
        type="button"
        onClick={() => rejectDoc()}
        className="btn btn-outline-danger btn-sm rounded-pill py-1 px-3"
      >
        Reject
      </button>
    </div>
  </td>
)}


        <td style={{ width: "700px" }} className="py-0">
          <div className="d-flex justify-content-center">
            <div onClick={() => setDocumentShowModal(true)}>
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
