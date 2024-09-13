"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateEnrollmentStatus, updateProgramEnrollmentStatus } from "@/app/lib/actions/courseStudents";

function EnrollStudentModal(props: any) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { id: courseId, studentId } = useParams<{
    id:string,
    courseId:string,
    studentId:string
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
  const isFreemium = process.env.NEXT_PUBLIC_USER;

  const enrollStudent = async () => {
    setIsSpinner(true);
    setDisabled(true);
    try {
      const email = localStorage.getItem("email")!;
      const programPayload = {
        userId: studentId,
        organizationProgramId: courseId,
        status: 0,
        fullName: studentName,
        email,
        organizationProgramTitle: title,
        rejectionReason: ""
      };

      const payload = {
        userId: studentId,
        status: 0,
        fullName: studentName,
        email,
        courseTitle: title
      };

      const updateStatus = isFreemium ? updateProgramEnrollmentStatus : updateEnrollmentStatus;
      const resp = await updateStatus(isFreemium ? programPayload : payload);

      if (resp.enrollmentStatus === 0) {
        setSuccessMessage("Student Enrolled Successfully");
        router.replace(homePath);
      } else {
        setErrorMessage("Failed Enrolling Student");
      }
    } catch (error) {
      setErrorMessage("Error enrolling student");
    } finally {
      setIsSpinner(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    setIsSpinner(false);
  }, [searchParams.get("refreshId")]);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton style={{ background: "#24345c" }}>
        <Modal.Title style={{ color: "white" }}>Enroll Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to Enroll Student?</h5>
      </Modal.Body>
      <Modal.Footer>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
        <button disabled={disabled} className="btn btn-success" onClick={enrollStudent}>
          {isSpinner ? <span className="spinner-border text-white" role="status" /> : "Enroll Student"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default EnrollStudentModal;
