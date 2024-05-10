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
      <Modal.Header closeButton>
        <Modal.Title>Create Unit Standard</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <h5>Title</h5>
          <input
            defaultValue=""
            minLength={10}
            onChange={(event) => setTitle(event.target.value)}
            className="form-control mb-3"
            placeholder="Enter your title here..."
          />
        </div>
        <div>
          <h5>Description</h5>
          <ReactQuill
            value={description}
            onChange={(value) => setDescription(value)}
          />
        </div>
        <div className="mt-3">
          <h5>Document Tone</h5>
          <select id="select01" data-toggle="select" className="form-control">
            <option selected={false}>Select Tone</option>
            <option>Another option</option>
            <option>Formal</option>
            <option>Informal</option>
            <option>Soft</option>
            <option>Strong</option>
          </select>
        </div>
        <div className="mt-3">
          <h5>Length of Paraphrase</h5>
          <input
            defaultValue="1"
            minLength={10}
            onChange={(event) => setTitle(event.target.value)}
            className="form-control mb-3"
            type="number"
            min="1"
          />
        </div>
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
