"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";

function MyVerticallyCenteredModal(props: any) {
  const [title, setTitle] = useState<string>("");

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
          <h5>Name</h5>
          <input
            defaultValue=""
            minLength={10}
            onChange={(event) => setTitle(event.target.value)}
            className="form-control mb-3"
            placeholder="Enter your name here..."
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Link
          className="btn btn-success"
          onClick={props.onHide}
          href={`/protected/admin/courses/${props.courseId}/modules/create?courseId=${props.courseId}&title=${props.name}`}
        >
          Submit
        </Link>
      </Modal.Footer>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(MyVerticallyCenteredModal), {
  ssr: false,
});
