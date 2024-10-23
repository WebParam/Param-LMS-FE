"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { closeModeration } from "@/app/lib/actions/assessments";
import Cookies from "universal-cookie";

function CloseModerationModal(props: any) {
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const { courseId, assessmentId } = useParams<{
    courseId: string;
    assessmentId: string;
  }>();
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  const searchParams = useSearchParams();
  const assessmentName = searchParams.get("assessment-name") || "";

  const closeModerationFn = async () => {
    setIsSpinner(true);
    await closeModeration(assessmentId, loggedInUser.id);
    setIsSpinner(false);
    props.onHide();
    router.replace(
      `/protected/home/facilitator/${courseId}/grade/assessments?assessment-name=${assessmentName}&status=moderated`,
      {
        scroll: false,
      }
    );
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Close Moderation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Are you sure you want to Close Moderation?</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          No
        </Button>
        <button className="btn btn-success" onClick={() => closeModerationFn()}>
          {isSpinner ? (
            <span className="spinner-border text-white" role="status" />
          ) : (
            <>Yes</>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default CloseModerationModal;
