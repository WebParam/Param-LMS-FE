"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { deleteAssessment } from "@/app/lib/actions/assessments";

function DeleteAssessmentModal(props: any) {
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";

  const delUser = async () => {
    setIsSpinner(true);
    await deleteAssessment(props.id!);
    const date = new Date().toString();
    router.replace(`${pathname}?title=${title}&refreshId=${date}`, {
      scroll: false,
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Are you sure you want to Delete?</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          No
        </Button>
        <button className="btn btn-success" onClick={() => delUser()}>
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
export default DeleteAssessmentModal;
