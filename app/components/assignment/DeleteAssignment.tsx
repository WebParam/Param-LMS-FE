"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DELETE } from "@/app/lib/restapi/client";
import { wUserUrl } from "@/app/lib/actions/endpoints";
import { deleteAssignment } from "@/app/lib/actions/assignments";

function DeleteAssignmentModal(props: any) {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const [disabled, setDisabled] = useState(false);
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId") || "";
const  title = searchParams.get("title")!;
const  moduleTitle = searchParams.get("moduleTitle")!;

  const date = new Date().toString();

  const delProject = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    setIsSpinner(true);
    setDisabled(true);

    try {
      const resp = await deleteAssignment(props.id);
      if (resp === "Assignment deleted successfully.") {
        setIsSpinner(false);
        setTimeout(() => {
          router.replace(`${pathname}?title=${title}&moduleTitle=${moduleTitle}refreshId=${date}`);
          props.onHide();
        }, 2000);
      } else {
      }
    } catch (error) {
      setErrorMessage("Failed Deleting Assignmet");
      setIsSpinner(false);
      setTimeout(() => {
        setErrorMessage("");
        setDisabled(false);
      }, 2000);
    }
    setDisabled(false);
  };



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ background: "#24345c" }} closeButton>
        <Modal.Title style={{ color: "white" }}>
          Delete - {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Are you sure you want to Delete Assignment?</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert  alert-danger">{errorMessage}</div>
        )}
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <button
          disabled={disabled}
          className={disabled ? "btn btn-secondary" : "btn btn-success"}
          onClick={() => delProject()}
        >
          {isSpinner ? (
            <span className="spinner-border text-white" role="status" />
          ) : (
            <>Delete Assignment</>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default DeleteAssignmentModal;
