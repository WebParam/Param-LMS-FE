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
import { uploadAssignment } from "@/app/lib/actions/assignments";
import Cookies from "universal-cookie";

function EditAssignmentDoc(props: any) {

  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const {id : courseId, moduleId} = useParams<{
    id : string ,
    moduleId : string
  }>();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const studentName = searchParams.get("studentName") || "";
  const refreshId = searchParams.get("refreshId") || "";
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const isEnrolled = searchParams.get("isEnrolled");
  const [disabled, setDisabled] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const cookies = new Cookies();
  const user = cookies.get("param-lms-user");

  const acceptDocumentFn = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSpinner(true);
    const payload = {
      documentId: props.documentId,
      status: "Accepted",
      reason: "",
      fileName: fileName,
      fileUrl: "",
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

  async function handleFileUpload(file: File) {
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", props.name);
    formData.append("knowledgeId", moduleId);
    formData.append("description", "");
    formData.append("creatingUserId", user.id);
    formData.append("scheduledDate", new Date().toISOString());
    formData.append("isPublished", "true");
    formData.append("file", file);
    try {
      const uploadCourseAssignments = await uploadAssignment(formData);
     // getKnowledgeModuleAssignments();
     const date = new Date()
     router.replace(`/protected/admin/courses/66c6f9fe0c2eeac80af3b590/knowledge-modules/66c6faa90c2eeac80af3b592/assignments?title=Contact%20Centre%20Manager&moduleTitle=Introductory%20studies%20for%20Contact%20Centre%20Managers?refreshId=${date}`)
    } catch (error) {
      console.error("Error uploading assignment:", error);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ background: "#24345c" }} closeButton>
        <Modal.Title style={{ color: "white" }}>
          Edit Assignment - {props.documentName || "File - " + props.documentId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="fileName" className="form-label">
            Assignment:
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
            Description:
          </label>
          <input
            defaultValue={props.url}
            type="text"
            id="fileUrl"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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

        <Button className = "btn btn-success" onClick={() => {
          handleFileUpload()
        }}>
          submit
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default EditAssignmentDoc;
