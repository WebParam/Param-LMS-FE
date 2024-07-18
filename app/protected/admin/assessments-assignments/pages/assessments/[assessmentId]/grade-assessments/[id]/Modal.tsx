"use client";
import { submitFacilitatorAssessment } from "@/app/lib/actions/assessments";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function MyVerticallyCenteredModal(props: any) {
  const router = useRouter();
  const facilitatorId = "6580051b2b3b4e16f159792d";
  const { assessmentId, id } = useParams<{ assessmentId: string; id: string }>();
  const [formError, setFormError] = useState("");

  const submitFacilitatorAssessmentWithParams = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append('facilitatorId', facilitatorId);
    formData.append('assessmentId', assessmentId);
    formData.append('studentId', id);

    try {
      const submitResponse = await submitFacilitatorAssessment(formData);
      if (!submitResponse.id) {
        setFormError("Failed to submit assessment");
        return;
      }
      props.onHide();
      console.log("response", submitResponse);
      router.back();
    } catch (error) {
      console.error("Error submitting assessment:", error);
      setFormError("Failed to submit assessment");
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
            Submit Grading
          </div>
          <button onClick={props.onHide} type="button" className="btn btn-icon">
            <i className="material-icons">close</i>
          </button>
        </div>
        <Modal.Body>
          <p className="font-size-16pt">Are you sure you want to submit this grading?</p>
          {formError && <div className="text-danger">{formError}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
