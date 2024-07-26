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
import { declineStudent } from "@/app/lib/actions/courseStudents";

function RejectStudentModal(props: any) {
  const { studentId } = useParams<{
    studentId: string;
  }>();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const studentName = searchParams.get("studentName") || "";
  const refreshId = searchParams.get("refreshId") || "";
  const [selectedReason, setSelectedReason] = useState("");
  const [reasonError, setReasonError] = useState("");

  const arrReasons = [
    "Illegible Application",
    "Invalid documents",
    "Wrong documents",
    "Missing information",
    "Expired documents",
  ];

  const declineStudentFn = async () => {
    if (selectedReason !== "") {
      setIsSpinner(true);
      // await declineStudent(studentId, selectedReason);
      const date = new Date().toString();
      router.replace(
        `${pathname}?title=${title}&studentName=${studentName}&refreshId=${date}`,
        {
          scroll: false,
        }
      );
    } else {
      setReasonError("Please select a reason");
    }
  };

  useEffect(() => {
    setIsSpinner(false);
    setReasonError("")
    setSelectedReason("");
  }, [refreshId]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ background: "#24345c" }} closeButton>
        <Modal.Title style={{ color: "white" }}>Reject Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Please select the reason for rejecting below:</h5>
        </div>
        <div>
          {arrReasons.map((reason: string) => (
            <div key={reason} className="d-flex">
              <div className="d-flex mr-2">
                <input
                  type="radio"
                  onChange={(e: any) => setSelectedReason(e.target.value)}
                  name="reason"
                  id=""
                />
              </div>
              <div>{reason}</div>
            </div>
          ))}
        </div>
        {reasonError && <p className="text-danger">{reasonError}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <button className="btn btn-danger" onClick={() => declineStudentFn()}>
          {isSpinner ? (
            <span className="spinner-border text-white" role="status" />
          ) : (
            <>Reject Application</>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default RejectStudentModal;
