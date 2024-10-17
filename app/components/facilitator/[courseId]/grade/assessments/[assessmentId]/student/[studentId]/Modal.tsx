"use client";
import {
  submitFacilitatorAssessment,
  submitModeratorAssessment,
} from "@/app/lib/actions/assessments";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "universal-cookie";

export default function FeedbackModal(props: any) {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  const router = useRouter();
  const facilitatorId = loggedInUser.id;
  const { assessmentId, studentId } = useParams<{
    assessmentId: string;
    studentId: string;
  }>();
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFacilitatorAssessmentWithParams = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (loggedInUser.role === "Facilitator") {
      formData.append("facilitatorId", facilitatorId);
      formData.append("assessmentId", assessmentId);
      formData.append("studentId", studentId);
      formData.append("TotalMark", props.totalMark);

      try {
        setLoading(true);
        const submitResponse = await submitFacilitatorAssessment(formData);
        if (!submitResponse.id) {
          setLoading(false);
          setFormError("Failed to submit assessment");
          setFormSuccess("");
          return;
        }
        setLoading(false);
        setFormError("");
        setFormSuccess("Assessment submitted successfully");

        setTimeout(() => {
          setFormSuccess("");
          props.onHide();
          router.back();
        }, 3000);
      } catch (error) {
        setLoading(false);
        console.error("Error submitting assessment:", error);
        setFormError("Failed to submit assessment");
        setFormSuccess("");
      }
    } else if (loggedInUser.role === "Moderator") {
      formData.append("moderatorId", facilitatorId);
      formData.append("assessmentId", assessmentId);
      formData.append("studentId", studentId);
      formData.append("TotalMark", props.moderatorTotalMark);

      try {
        setLoading(true);
        const submitResponse = await submitModeratorAssessment(formData);
        if (!submitResponse.id) {
          setLoading(false);
          setFormError("Failed to submit assessment");
          setFormSuccess("");
          return;
        }
        setLoading(false);
        setFormError("");
        setFormSuccess("Assessment submitted successfully");

        setTimeout(() => {
          setFormSuccess("");
          props.onHide();
          router.back();
        }, 3000);
      } catch (error) {
        setLoading(false);
        console.error("Error submitting assessment:", error);
        setFormError("Failed to submit assessment");
        setFormSuccess("");
      }
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
          <p className="font-size-16pt">
            Are you sure you want to submit this assessment?
          </p>
          {formError && <div className="text-danger">{formError}</div>}
          {formSuccess && <div className="text-success">{formSuccess}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="success" type="submit">
            {!loading ? (
              "Submit"
            ) : (
              <div className="spinner-border text-white" role="status" />
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
