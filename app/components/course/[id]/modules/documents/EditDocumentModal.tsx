"use client";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, useSearchParams } from "next/navigation";
import { createDocument, updateDocument } from "@/app/lib/actions/document";

function EditDocumentModal(props: any) {
  const { id: courseId, moduleId } = useParams<{
    id: string;
    moduleId: string;
  }>();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const updateDocumentWithParams = updateDocument.bind(
    null,
    props.documentId,
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
      <form action={updateDocumentWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Eidt Module</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <h5>Name</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              name="name"
              defaultValue={props.documentName}
            />
          </div>          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="success" onClick={props.onHide} type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(EditDocumentModal), {
  ssr: false,
});
