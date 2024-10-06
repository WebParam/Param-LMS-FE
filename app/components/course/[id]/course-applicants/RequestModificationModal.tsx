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
import { sendDocRejectionEmail } from "@/app/lib/actions/courseStudents";

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
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hidePopUp, setHidePopUp] = useState(false)
  const [disableBtn, setDisableBtn] = useState(false);
  const isEnrolled =  searchParams.get("isEnrolled");


  const requestDocumentUpdateFn = async () => {
    setSuccessMessage("")
    setDisableBtn(true)
    if (selectedDocuments.length > 0) {
      setIsSpinner(true);
       await sendDocRejectionEmail(studentId);
       setSuccessMessage("Request Successfully sent")
       setIsSpinner(false);
      const date = new Date().toString();
      router.replace(
        `${pathname}?title=${title}&studentName=${studentName}&refreshId=${date}&}&isEnrolled=${isEnrolled}`,
        {
          scroll: false,
        }
      );
    setTimeout(() => {
      setSuccessMessage("")
      props.onHide();
      setDisableBtn(false)
    },2000)
    } else {
      setDisableBtn(false)
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
      onHide={hidePopUp}
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
          {props.documents && props.documents.filter((doc:any) => doc.status == "Rejected").map((document: any) => (
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

      {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert  alert-danger">{errorMessage}</div>
        )}
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <button
          className="btn btn-danger"
          disabled={disableBtn}
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
