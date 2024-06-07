"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { createParaphrase } from "@/app/lib/actions/paraphrase";
import { useParams, useSearchParams } from "next/navigation";

function CreateTranscriptModal(props: any) {
  const { id, moduleId, documentId } = useParams<{
    id: string;
    moduleId: string;
    documentId: string;
  }>();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const [description, setDescription] = useState("");
  const submmitRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const createParaphraseWithParams = createParaphrase.bind(
    null,
    description,
    id,
    moduleId,
    documentId,
    title
  );

  const submit = () => {
    submmitRef.current?.click();
    if (
      titleRef.current?.value &&
      titleRef.current?.value.length > 10
    ) {
      props.onHide();
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={createParaphraseWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Create Transcript</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <h5>Title</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              name="title"
              required
              ref={titleRef}
            />
          </div>
          <div>
            <h5>Video Link</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your Video Link here. E.g https://..."
              name="videoUrl"
            />
          </div>{" "}
          <div>
            <h5>Transcript</h5>
            <ReactQuill
              value={description}
              onChange={(value) => setDescription(value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
        <input type="submit" hidden ref={submmitRef} />
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => submit()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(CreateTranscriptModal), {
  ssr: false,
});
