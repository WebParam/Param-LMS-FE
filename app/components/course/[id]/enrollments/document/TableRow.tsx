import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
      <DocumentModal
        documentId={document.id}
        documentName={document.name}
        show={documentShowModal}
        onHide={() => setDocumentShowModal(false)}
      />

      <tr className="selected">
        <td style={{ width: "350px" }} className="py-0">
          <div className="d-flex align-items-center justify-content-center">
            <p
              className="text-center my-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "350px",
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
        <td style={{ width: "300px" }} className="py-0">
          <div className="d-flex justify-content-center">
            <div onClick={() => setDocumentShowModal(true)}>
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>
            </div>
          </div>
        </td>
        </tr>
      {/*  : <>
          <tr className="selected">
         <td colSpan={10}>
           <SkeletonLoader width="100%" height="2em" />
         </td>
         
       </tr>
       <tr className="selected">
         <td colSpan={10}>
           <SkeletonLoader width="100%" height="2em" />
         </td>
         
       </tr> <tr className="selected">
         <td colSpan={10}>
           <SkeletonLoader width="100%" height="2em" />
         </td>
         
       </tr>
         </> */}
    </>
  );
};

export default TableRow;
