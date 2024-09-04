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
import { updateProjectEnrollmentStatus } from "@/app/lib/actions/project";

function EnrollStudentModal(props: any) {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { id: courseId, studentId } = useParams<{
    id: string;
    studentId: string;
  }>();
  const [isSpinner, setIsSpinner] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
const [disabled, setDisabled] = useState(false)
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const studentName = searchParams.get("studentName") || "";
  const refreshId = searchParams.get("refreshId") || "";
  const date = new Date().toString();
  const homePath = `/protected/admin/courses/${courseId}/course-applicants?title=${title}&refreshId=${date}`

  const delKnowledgeTopic = async () => {
    setIsSpinner(true);
    setDisabled(true);
    const email = localStorage.getItem("email")!;
    const payload = {
      userId: studentId,
      status: 0,
      organizationProgramId: courseId,
      organizationProrgamTitle: title,
      fullName: studentName,
      email: email,
      courseTitle: title,
    }
    const useProject = process.env.NEXT_PUBLIC_USER === "freemium";
    const resp = useProject? await updateProjectEnrollmentStatus(payload): await updateEnrollmentStatus(payload);
    console.log("Enroll Student Response", resp);
    if (resp.enrollmentStatus == 0) {
      setIsSpinner(false);
      setSuccessMessage("Student Enrolled Successfully");
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
        <Modal.Title style={{ color: "white" }}>Enroll Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Are you sure you want to Enroll Student?</h5>
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
        <button disabled={disabled} className="btn btn-success" onClick={() => delKnowledgeTopic()}>
          {isSpinner ? (
            <span className="spinner-border text-white" role="status" />
          ) : (
            <>Enroll Student</>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
export default EnrollStudentModal;
