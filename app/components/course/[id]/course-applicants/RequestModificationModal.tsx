"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { requestDocumentsUpdate } from "@/app/lib/actions/document";

function RequestModificationModal(props: any) {
  const { studentId } = useParams<{
    studentId: string;
  }>();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [documentsError, setDocumentsError] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const studentName = searchParams.get("studentName") || "";
  const refreshId = searchParams.get("refreshId") || "";

  const requestDocumentUpdateFn = async () => {
    if (selectedDocuments.length > 0) {
      setIsSpinner(true);
      console.log("selectedDocuments", selectedDocuments)
      // await requestDocumentsUpdate(selectedDocuments, studentId);
      const date = new Date().toString();
      router.replace(
        `${pathname}?title=${title}&studentName=${studentName}&refreshId=${date}`,
        {
          scroll: false,
        }
      );
    } else {
      setDocumentsError("Please select at least a document");
    }
  };

  const handleCheckboxChange = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDocuments([...selectedDocuments, value]);
    } else {
      setSelectedDocuments(selectedDocuments.filter((val) => val !== value));
    }
  };

  useEffect(() => {
    setIsSpinner(false);
    setSelectedDocuments([]);
    setDocumentsError("");
  }, [refreshId]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ background: "#24345c" }} closeButton>
        <Modal.Title style={{ color: "white" }}>
          Request Documents Modification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Please select the Documents to be Modified below:</h5>
        </div>
        <div>
          {props.documents.map((document: any) => (
            <div key={document.id} className="d-flex">
              <div className="d-flex mr-2">
                <input
                  type="checkbox"
                  value={document.id}
                  checked={selectedDocuments.includes(document.id)}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>{document.name || "File - " + document.id}</div>
            </div>
          ))}
        </div>
        {documentsError && <p className="text-danger">{documentsError}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <button
          className="btn btn-danger"
          onClick={() => requestDocumentUpdateFn()}
        >
          {isSpinner ? (
            <span className="spinner-border text-white" role="status" />
          ) : (
            <>Send Request</>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default RequestModificationModal;
