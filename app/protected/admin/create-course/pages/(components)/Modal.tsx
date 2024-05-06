"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function MyVerticallyCenteredModal(props: any) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <input
          value={title}
          minLength={10}
          onChange={(event) => setTitle(event.target.value)}
          className="form-control mb-3"
          placeholder="Enter your title here..."
        />

        <ReactQuill
          value={description}
          onChange={(value) => setDescription(value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="success" onClick={props.onHide}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(MyVerticallyCenteredModal), {
  ssr: false,
});
