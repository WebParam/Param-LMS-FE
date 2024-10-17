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
import {
  updateAssignment,
  uploadAssignment,
} from "@/app/lib/actions/assignments";
import Cookies from "universal-cookie";
import { IUpdateAssignment } from "@/app/interfaces/assignment";
import QuestionAdd from "./Rubric";

function EditAssignmentDoc(props: any) {
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const { id: courseId, moduleId } = useParams<{
    id: string;
    moduleId: string;
  }>();

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileName, setFileName] = useState<string>(props.name);
  const [desc, setDesc] = useState<string>(props.desc);
  const [date, setDate] = useState<Date | null>(new Date());
  const [publish, setPublish] = useState<string>(props.isPublished ? "yes" : "no");
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const moduleTitle = searchParams.get("moduleTitle");
  const cookies = new Cookies();
  const user = cookies.get("param-lms-user");

  const validateInputs = () => {
    if (!fileName.trim()) {
      setErrorMessage("Assignment title is required.");
      return false;
    }
    if (!desc.trim()) {
      setErrorMessage("Description is required.");
      return false;
    }
    return true;
  };

  async function handleFileUpload() {
    if (!validateInputs()) {
      return;
    }
    setIsSpinner(true);
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", fileName);
    formData.append("knowledgeId", moduleId);
    formData.append("description", desc);
    formData.append("creatingUserId", user.id);
    formData.append("scheduledDate", date!.toISOString());
    formData.append("isPublished", "true");
    formData.append("file", props.file);

    const payload: IUpdateAssignment = {
      id: props.id,
      title: fileName,
      description: desc,
      scheduledDate: date!.toISOString(),
      isPublished: publish == "yes" ? true : false,
    };
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (props.id) {
        await updateAssignment(payload);
      } else {
        await uploadAssignment(formData);
      }
      setSuccessMessage("Assignment uploaded successfully.");
      router.replace(
        `${pathname}?title=${title}&moduleTitle=${moduleTitle}&refreshId=${date}`,
        {
          scroll: false,
        }
      );
      props.onHide();
    } catch (error) {
      console.error("Error uploading assignment:", error);
      setErrorMessage("Failed to upload assignment. Please try again.");
    } finally {
      setIsSpinner(false);
      setFileName("");
      setDesc("");
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
          Edit Assignment - {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="fileName" className="form-label">
            Assignment Title:
          </label>
          <input
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
            type="text"
            id="fileUrl"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fileUrl" className="form-label">
            Scheduled Date:
          </label>
          <input
            type="date"
            value={date ? date.toISOString().substring(0, 10) : ""}
            onChange={(e) =>
              setDate(e.target.value ? new Date(e.target.value) : null)
            }
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fileUrl" className="form-label">
            Do you want to publish:
          </label>
          <select
            onChange={(e: any) => setPublish(e.target.value)}
            className="form-control"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <QuestionAdd/>
      </Modal.Body>
      <Modal.Footer>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <Button
          disabled={isSpinner}
          className={isSpinner ? "btn btn-secondary" : "btn btn-success"}
          onClick={handleFileUpload}
        >
          {isSpinner ? (
            <div
              style={{
                color: "white",
              }}
              className="spinner-border"
              role="status"
            />
          ) : (
            "Submit"
          )}
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default EditAssignmentDoc;
