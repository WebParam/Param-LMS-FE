"use client";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, useSearchParams } from "next/navigation";
import { createAssessment } from "@/app/lib/actions/assessments";
import { CreateUserBtn } from "./Buttons";

function CreateUserModal(props: any) {
  const { id: courseId, moduleId } = useParams<{
    id: string;
    moduleId: string;
  }>();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";

  const createAssessmentWithParams = createAssessment.bind(
    null,
    courseId,
    moduleId,
    title
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={createAssessmentWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h5>Name & Surname</h5>
              <input
                minLength={10}
                className="form-control mb-3"
                placeholder="Enter your title here..."
                name="title"
              />
            </div>
            <div>
              <h5>User Role</h5>
              <select className="form-control mb-3" name="assessmentType">
                <option value="1">Facilitor</option>
                <option value="0">Moderator</option>
              </select>
            </div>
            <div>
              <h5>Email Address</h5>
              <input
                type="email"
                minLength={10}
                className="form-control mb-3"
                placeholder="Enter your title here..."
                name="title"
              />
            </div>
            <div>
              <h5>Phone Number</h5>
              <input
                type="email"
                minLength={10}
                className="form-control mb-3"
                placeholder="Enter your title here..."
                name="title"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <CreateUserBtn />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(CreateUserModal), {
  ssr: false,
});
