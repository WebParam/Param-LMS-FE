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
import { changeDocumentStatus } from "@/app/lib/actions/courseStudents";

  

function EditLogbookDoc(props: any) {
  const { id: courseId } = useParams<{
    id: string;
  }>();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const studentName = searchParams.get("studentName") || "";
  const refreshId = searchParams.get("refreshId") || "";
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const isEnrolled = searchParams.get("isEnrolled");
  const [disabled, setDisabled] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");

  const acceptDocumentFn = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSpinner(true);
    const payload = {
      documentId: props.documentId,
      status: "Accepted",
      reason: "",
      fileName: fileName,
      fileUrl: fileUrl,
    };

    try {
      setDisabled(true);
      await changeDocumentStatus(payload);
      setSuccessMessage("Document Accepted Successfully");
      const date = new Date().toString();
      router.replace(
        `${pathname}?title=${title}&studentName=${studentName}&refreshId=${date}&isEnrolled=${isEnrolled}`,
        {
          scroll: false,
        }
      );
      setTimeout(() => {
        props.onHide();
        setDisabled(false);
        setErrorMessage("");
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setDisabled(false);
      console.log("Error", error);
      setErrorMessage("Failed to Accept Document");
    }
  };

  useEffect(() => {
    setIsSpinner(false);
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
          Edit Document - {props.documentName || "File - " + props.documentId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="fileName" className="form-label">
            File Name:
          </label>
          <input
            defaultValue={props.name}
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fileUrl" className="form-label">
            File URL:
          </label>
          <input
            defaultValue={props.url}
            type="text"
            id="fileUrl"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="form-control"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert  alert-danger">{errorMessage}</div>
        )}

        <Button className = "btn btn-success" onClick={props.onHide}>
          submit
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default EditLogbookDoc;