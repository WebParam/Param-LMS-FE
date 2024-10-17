"use client";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, useSearchParams } from "next/navigation";
import { EditAssesssmentBtn } from "./Buttons";
import { updateAssessment } from "@/app/lib/actions/assessments";

function EditAssessmentModal(props: any) {
  const { id: courseId, moduleId } = useParams<{
    id: string;
    moduleId: string;
  }>();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const updateAssessmentWithParams = updateAssessment.bind(
    null,
    props.assessmentId,
    courseId,
    moduleId,
    title
  );

  const dueDate = props.data.dueDate.split("T")[0];
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={updateAssessmentWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Assessment</Modal.Title>
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
                defaultValue={props.data.title}
              />
            </div>
            <div>
              <h5>Type</h5>
              <select
                defaultValue={props.data.type}
                className="form-control mb-3"
                name="type"
              >
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
                defaultValue={props.data.totalMarks}
              />
            </div>{" "}
            <div>
              <h5>Due Date</h5>
              <input
                minLength={10}
                className="form-control mb-3"
                name="dueDate"
                type="date"
                defaultValue={dueDate}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <EditAssesssmentBtn />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default EditAssessmentModal;
