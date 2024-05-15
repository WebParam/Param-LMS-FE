"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function MyVerticallyCenteredModal(props: any) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>(
    "HTML documents follow a basic structure consisting of an opening <html> tag, containing <head> and <body> sections. The head typically includes metadata like title and links to CSS or JavaScript files, while the body contains the visible content of the page."
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Paraphrase</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <h5>Paraphrased Title</h5>
          <input
            defaultValue={props.data.title}
            minLength={10}
            onChange={(event) => setTitle(event.target.value)}
            className="form-control mb-3"
            placeholder="Enter your title here..."
          />
        </div>
        <div>
          <h5>Paraphrased Text</h5>
          <ReactQuill
            value={description}
            onChange={(value) => setDescription(value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="success" onClick={props.onHide}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(MyVerticallyCenteredModal), {
  ssr: false,
});
