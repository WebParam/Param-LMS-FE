import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

  useEffect(() => {
    setAcceptDocumentModal(false);
    setRejectDocumentModal(false);
    setDocumentShowModal(false);
  }, [refreshId]);

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
