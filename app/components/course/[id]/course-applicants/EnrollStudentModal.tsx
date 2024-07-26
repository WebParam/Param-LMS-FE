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
import { deleteKnowledgeTopic } from "@/app/lib/actions/knowledge-topic";
import { enrollStudent } from "@/app/lib/actions/courseStudents";

function EnrollStudentModal(props: any) {
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

  const delKnowledgeTopic = async () => {
    setIsSpinner(true);
    // await enrollStudent(props.id!);
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
        <Modal.Title style={{ color: "white" }}>Enroll Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Are you sure you want to Enroll Student?</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <button className="btn btn-success" onClick={() => delKnowledgeTopic()}>
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
