"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteProject } from "@/app/lib/actions/project";

function DeleteProjectModal(props: any) {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const [disabled, setDisabled] = useState(false);
  const [hideModal, setHideModal] = useState<boolean>(false)
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId") || "";
  const date = new Date().toString();

  const delProject = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    setIsSpinner(true);
    setDisabled(true);

    try {
      const resp = await deleteProject(props.id);
      setIsSpinner(false);
      setSuccessMessage("Project Deleted Successfully");
      setTimeout(() => {
        router.replace(`${pathname}?refreshId=${date}`, {
          scroll: false,
        });
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setErrorMessage("Failed Deleting Project");
      setIsSpinner(false);
      setTimeout(() => {
        setErrorMessage("");
        setDisabled(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setIsSpinner(false);
  }, [refreshId]);

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
          <h5>Are you sure you want to Delete Project?</h5>
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
          className="btn btn-success"
          onClick={() => delProject()}
        >
          {isSpinner ? (
            <span className="spinner-border text-white" role="status" />
          ) : (
            <>Delete Project</>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default DeleteProjectModal;
