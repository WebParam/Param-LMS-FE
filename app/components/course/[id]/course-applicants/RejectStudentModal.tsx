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
import { updateEnrollmentStatus } from "@/app/lib/actions/courseStudents";

function RejectStudentModal(props: any) {
  const { id : courseId, studentId } = useParams<{
    id:string;
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
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const date = new Date().toString();
  const homePath = `/protected/admin/courses/${courseId}/course-applicants?title=${title}&refreshId=${date}`


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
      const email = localStorage.getItem("email")!;
      const payload = {
        userId: studentId,
        status: 1,
        fullName: studentName,
        email: email,
        courseTitle: title,
        rejectionReason:selectedReason
      }
      const resp = await updateEnrollmentStatus(payload);
      if (resp.enrollmentStatus == 1) {
        setIsSpinner(false);
        setSuccessMessage("Student Rejected Successfully");
        router.replace(
          `${pathname}?title=${title}&studentName=${studentName}&refreshId=${date}`,
          {
            scroll: false,
          }
        );
        router.push(homePath);
        return;
      }
  
      setErrorMessage("Failed Enrolling Student");
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
                  value={reason}
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
      {successMessage && (
          <div className="alert alert-success postion-abolute left-0">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert  alert-danger">{errorMessage}</div>
        )}
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
