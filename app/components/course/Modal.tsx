"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { createModule } from "@/app/lib/actions/module";

function MyVerticallyCenteredModal(props: any) {
  const [description, setDescription] = useState("");
  const tones = ["Informal", "Formal", "Soft", "Strong"];
  const createModuleWithParams = createModule.bind(
    null,
    description,
    props.courseId,
    props.title
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={createModuleWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Create Unit Standard - {props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <h5>Title</h5>
            <input
              minLength={10}
              name="title"
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
            <select
              id="select01"
              data-toggle="select"
              className="form-control"
              name="documentTone"
            >
              <option selected={false}>Select Tone</option>
              {tones.map((name: string) => (
                <option selected={false}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <h5>Length of Paraphrase</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              type="number"
              name="lengthOfParagraph"
              min="1"
              defaultValue="1"
            />
          </div>
          <div className="mt-3">
            <h5>Audio voices</h5>
            <select
              id="select01"
              data-toggle="select"
              className="form-control"
              name="audioVoice"
            >
              <option selected={false}>Select voice</option>
              {tones.map((name: string) => (
                <option selected={false}>{name}</option>
              ))}
            </select>
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
export default dynamic(() => Promise.resolve(MyVerticallyCenteredModal), {
  ssr: false,
});
