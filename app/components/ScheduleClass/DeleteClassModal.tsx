"use client";
import { submitModeratorAssessment } from "@/app/lib/actions/assessments";
import { deleteCourseClassSessions } from "@/app/lib/actions/class-session";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteClassModal(props: any) {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
const pathName = usePathname();

  const submitFacilitatorAssessmentWithParams = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true)
      setFormError("");
      setFormSuccess("");
      const response = await deleteCourseClassSessions(props.id);
      if (response !== "Class successfully deleted") {
        setLoading(false)
        setFormError(response);
        setFormSuccess("");
        return;
      }
      setLoading(false);
      setFormError("");
      setFormSuccess(response);
      const date = new Date();
    
      setTimeout(() => {
        setFormSuccess(""); 
        props.onHide();
        router.replace(`${pathName}?title=Learning+Telecommunication&id=${id}&refreshId=${date}`);

      }, 3000);

    } catch (error) {
      setLoading(false)
      console.error("Error deleting class:", error);
      setFormError("Failed to delete class");
      setFormSuccess(""); 
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={submitFacilitatorAssessmentWithParams}>
        <div className="modal-header">
          <div className="modal-title h4" id="contained-modal-title-vcenter">
            Delete Class - {props.classTitle}
          </div>
          <button onClick={props.onHide} type="button" className="btn btn-icon">
            <i className="material-icons">close</i>
          </button>
        </div>
        <Modal.Body>
          <p className="font-size-16pt">Are you sure you want to delete this class?</p>
      
        </Modal.Body>
        <Modal.Footer>
        {formError && <div className="alert alert-danger">Failed to delete class</div>}
        {formSuccess && <div className="alert alert-success">Class deleted successfully</div>}
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="danger" type="submit">
          {!loading ? "Delete" : <div className="spinner-border text-white" role="status" /> }
          </Button>
          
        </Modal.Footer>
      </form>
    </Modal>
  );
}
