"use client";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import EditModuleBtn from "./EditModuleBtn";
import ReactQuill from "react-quill";
import { updateKnowledgeModule } from "@/app/lib/actions/knowledge-module";

function EditKnowledgeTopicModal(props: any) {
  const { id: courseId } = useParams<{
    id: string;
  }>();
  const [description, setDescription] = useState(props.description || "");
  const searchParams = useSearchParams();
  const [closeEditModal, setCloseEditModal] = useState(false);
  const title = searchParams.get("title") || "";
  const updateKnowledgeTopicWithParams = updateKnowledgeModule.bind(
    null,
    props.id,
    description,
    courseId,
    title
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={updateKnowledgeTopicWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Knowledge Module</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <h5>Module Code/No.</h5>
            <input
              className="form-control mb-3"
              placeholder="Enter your Module Code. E.g KM01"
              name="moduleCode"
              defaultValue={props.moduleCode}
            />
          </div>
          <div>
            <h5>Title</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              name="title"
              defaultValue={props.name}
            />
          </div>
          <div>
            <h5>Description</h5>
            <ReactQuill
              value={description}
              onChange={(value) => setDescription(value)}
              style={{ color: "#252525" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <EditModuleBtn setCloseEditModal={setCloseEditModal} />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(EditKnowledgeTopicModal), {
  ssr: false,
});
