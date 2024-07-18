"use client";
import { submitFacilitatorAssessment } from "@/app/lib/actions/assessments";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function FeedbackModal(props: any) {
  const router = useRouter();
  const facilitatorId = "6580051b2b3b4e16f159792d";
  const { assessmentId, id } = useParams<{ assessmentId: string; id: string }>();
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

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
        setFormSuccess(""); // Clear success message if there is an error
        return;
      }
      setFormError(""); // Clear error message if successful
      setFormSuccess("Assessment submitted successfully");
      setTimeout(() => {
        setFormSuccess(""); // Clear success message after a few seconds
        props.onHide();
        router.back();
      }, 3000);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      setFormError("Failed to submit assessment");
      setFormSuccess(""); // Clear success message if there is an error
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
            Submit Feedback
          </div>
          <button onClick={props.onHide} type="button" className="btn btn-icon">
            <i className="material-icons">close</i>
          </button>
        </div>
        <Modal.Body>
          <p className="font-size-16pt">Are you sure you want to submit this feedback?</p>
          {formError && <div className="text-danger">{formError}</div>}
          {formSuccess && <div className="text-success">{formSuccess}</div>}
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