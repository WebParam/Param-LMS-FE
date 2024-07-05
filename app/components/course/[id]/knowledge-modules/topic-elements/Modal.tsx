"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { confirmParaphrase } from "@/app/lib/actions/paraphrase";
import { useParams, useSearchParams } from "next/navigation";

function MyVerticallyCenteredModal(props: any) {
  const { id, moduleId, documentId } = useParams<{
    id: string;
    moduleId: string;
    documentId: string;
  }>();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const [description, setDescription] = useState(props.data.description);

  const confirmParaphraseWithParams = confirmParaphrase.bind(
    null,
    props.data.id,
    description,
    id,
    moduleId,
    documentId,
    title
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={confirmParaphraseWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Topic Element</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <h5>Topic ELement</h5>
            <ReactQuill
              value={description}
              onChange={(value) => setDescription(value)}
              style={{ color: "#252525" }}
            />
          </div>
          <div className="mt-3">
            <h5>Video Script</h5>
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
          <Button
            variant="success"
            onClick={() => {
              props.onHide(), props.setCloseLoader(true);
            }}
            type="submit"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(MyVerticallyCenteredModal), {
  ssr: false,
});
