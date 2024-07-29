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
import { deleteKnowledgeTopic } from "@/app/lib/actions/knowledge-topic";
import { updateDocumentStatus } from "@/app/lib/actions/document";
import { changeDocumentStatus } from "@/app/lib/actions/courseStudents";

function RejectDocumentModal(props: any) {
  const { id: courseId } = useParams<{
    id: string;
  }>();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const studentName = searchParams.get("studentName") || "";
  const refreshId = searchParams.get("refreshId") || "";
  const [selectedReason, setSelectedReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  const arrReasons = [
    "Invalid document",
    "Wrong document type",
    "Missing information",
    "Expired document",
    "Incorrect format",
    "Illegible document",
    "Duplicate document",
    "Unauthorized document",
    "Incomplete document",
  ];

  const declineDocumentFn = async () => {
    if (selectedReason !== "") {
      setIsSpinner(true);
      const payload = {
        documentId: props.documentId,
        status: "Rejected",
        reason: selectedReason
      }
       await changeDocumentStatus(payload);
       setSuccessMessage("Document Rejected Successfully");
      const date = new Date().toString();
      router.replace(
        `${pathname}?title=${title}&studentName=${studentName}&refreshId=${date}`,
        {
          scroll: false,
        }
      );
    setTimeout(() => {
      props.onHide();
    },2000)
    } else {
      setReasonError("Please select a reason");
    }
  };

  useEffect(() => {
    setIsSpinner(false);
    setReasonError("")
    setSelectedReason("");
    setSuccessMessage("");

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
          Reject Document - {props.documentName || "File - " + props.documentId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Please select why you are rejecting below:</h5>
        </div>
        <div>
          {arrReasons.map((reason: string) => (
            <div key={reason} className="d-flex">
              <div className="d-flex mr-2">
                <input
                  type="radio"
                  onChange={(e: any) => setSelectedReason(e.target.value)}
                  name="reason"
                  id=""
                />
              </div>
              <div>{reason}</div>
            </div>
          ))}
        </div>
        {reasonError && <p className="text-danger">{reasonError}</p>}
      </Modal.Body>
      <Modal.Footer>
      {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert  alert-danger">{errorMessage}</div>
        )}
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <button className="btn btn-danger" onClick={() => declineDocumentFn()}>
          {isSpinner ? (
            <span className="spinner-border text-white" role="status" />
          ) : (
            <>Reject Document</>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default RejectDocumentModal;
