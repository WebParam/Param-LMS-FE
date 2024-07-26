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
import { updateDocumentStatus } from "@/app/lib/actions/document";

function AcceptDocumentModal(props: any) {
  const { id: courseId } = useParams<{
    id: string;
  }>();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const studentName = searchParams.get("studentName") || "";
  const refreshId = searchParams.get("refreshId") || "";

  const acceptDocumentFn = async () => {
    setIsSpinner(true);
    // await updateDocumentStatus(props.id, "Accepted", "");
    const date = new Date().toString();
    router.replace(
      `${pathname}?title=${title}&studentName=${studentName}&refreshId=${date}`,
      {
        scroll: false,
      }
    );
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
          Accept Document - {props.documentName || "File - " + props.documentId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Are you sure you want to Accept Document?</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <button className="btn btn-success" onClick={() => acceptDocumentFn()}>
          {isSpinner ? (
            <span className="spinner-border text-white" role="status" />
          ) : (
            <>Accept Document</>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default AcceptDocumentModal;
