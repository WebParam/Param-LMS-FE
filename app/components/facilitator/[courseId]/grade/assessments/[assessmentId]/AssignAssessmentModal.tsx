"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { assignFacilitator } from "@/app/lib/actions/assessments";
import Cookies from "universal-cookie";

function AssignAssessmentModal(props: any) {
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  const searchParams = useSearchParams();
  const assessmentName = searchParams.get("assessment-name") || "";
  const submitStatus = searchParams.get("submitStatus") || "";

  const assignFacilitatorFn = async () => {
    setIsSpinner(true);
    await assignFacilitator(props.id!, loggedInUser.id);
    setIsSpinner(false);
    props.onHide();
    router.replace(
      `${pathname}?assessment-name=${assessmentName}&status=inProgress&submitStatus=${submitStatus}`,
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
        <Modal.Title>Assign Assessment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Do you want to assign this Assessment to yourself?</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          No
        </Button>
        <button
          className="btn btn-success"
          onClick={() => assignFacilitatorFn()}
        >
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
export default AssignAssessmentModal;
