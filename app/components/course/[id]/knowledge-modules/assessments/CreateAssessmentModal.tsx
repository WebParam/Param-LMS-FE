"use client";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { createAssessment } from "@/app/lib/actions/assessments";
import { CreateAssesssmentBtn } from "./Buttons";

function CreateAssessmentModal(props: any) {
  const { id: courseId, moduleId } = useParams<{
    id: string;
    moduleId: string;
  }>();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";

  const documentId = "6662f253961e396de00b89c4";
  const pathname = usePathname();
  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url = `${arrUrl.join(
    "/"
  )}/document/${documentId}/questions?title=${title}`;

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
          <Modal.Title>Create Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h5>Name</h5>
              <input
                minLength={10}
                className="form-control mb-3"
                placeholder="Enter your title here..."
                name="title"
              />
            </div>
            <div>
              <h5>Type</h5>
              <select className="form-control mb-3" name="type">
                <option value="1">Formative</option>
                <option value="0">Summative</option>
              </select>
            </div>
            <div>
              <h5>Total Marks</h5>
              <input
                min="0"
                className="form-control mb-3"
                placeholder="Enter total marks for Assessment here..."
                name="totalMarks"
                type="number"
                defaultValue={0}
              />
            </div>{" "}
            <div>
              <h5>Due Date</h5>
              <input
                minLength={10}
                className="form-control mb-3"
                name="dueDate"
                type="date"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <CreateAssesssmentBtn />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default CreateAssessmentModal;
