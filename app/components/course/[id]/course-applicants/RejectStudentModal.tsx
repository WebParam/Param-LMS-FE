"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateEnrollmentStatus, updateProgramEnrollmentStatus } from "@/app/lib/actions/courseStudents";

function RejectStudentModal(props: any) {
  const { id: courseId, studentId } = useParams<{
    id: string;
    studentId: string;
  }>();
  const [isSpinner, setIsSpinner] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const studentName = searchParams.get("studentName") || "";
  const date = new Date().toISOString();
  const homePath = `/protected/admin/courses/${courseId}/course-applicants?title=${title}&refreshId=${date}`;
  const isFreemium =  process.env.NEXT_PUBLIC_FREEMIUM ==="true";

  const [selectedReason, setSelectedReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const arrReasons = [
    "Illegible Application",
    "Invalid documents",
    "Wrong documents",
    "Missing information",
    "Expired documents",
  ];
  const declineStudentFn = async () => {
    setIsSpinner(true);
    setDisabled(true);
    setErrorMessage("")
    setSuccessMessage("")
    try {
      if (selectedReason !== "") {
        const email = localStorage.getItem("email")!;
        const programPayload = {
          userId: studentId,
          organizationProgramId: courseId,
          status: 1,
          fullName: studentName,
          email,
          organizationProgramTitle: title,
          rejectionReason: ""
        };

        const payload = {
          userId: studentId,
          status: 1,
          fullName: studentName,
          email,
          courseTitle: title,
          rejectionReason: selectedReason
        };

        const updateStatus = isFreemium ? updateProgramEnrollmentStatus : updateEnrollmentStatus;
      const resp = await updateStatus(isFreemium ? programPayload : payload);

        if (resp.enrollmentStatus === 1) {
          setSuccessMessage("Student Rejected Successfully");
          router.replace(homePath);
        } else {
          setErrorMessage("Failed Rejecting Student");
        }
      } else {
        setErrorMessage("Please select a reason for rejection.");
      }
    } catch (error) {
      setErrorMessage("Error processing your request");
      console.error(error);
    } finally {
      setIsSpinner(false);
      setDisabled(false);

    }
  };

  useEffect(() => {
    setIsSpinner(false);
    setReasonError("");
    setSelectedReason("");
  }, [searchParams.get("refreshId")]);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton style={{ background: "#24345c" }}>
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
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
        <button disabled={disabled} className="btn btn-danger" onClick={declineStudentFn}>
          {isSpinner ? <span className="spinner-border text-white" role="status" /> : "Reject Application"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectStudentModal;
