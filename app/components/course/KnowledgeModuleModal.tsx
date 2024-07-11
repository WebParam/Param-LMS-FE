"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useSearchParams } from "next/navigation";
import { createKnowledgeModule } from "@/app/lib/actions/knowledge-module";

function KnowledgeModuleModal(props: any) {
  const [description, setDescription] = useState("");
  const [createUnitModal, setCreateUnitModal] = useState(false);
  const submmitRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const createModuleWithParams = createKnowledgeModule.bind(
    null,
    description,
    props.courseId,
    props.title
  );
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");

  useEffect(() => {
    setCreateUnitModal(false);
  }, [refreshId]);

  const submit = () => {
    submmitRef.current?.click();
    if (titleRef.current?.value && titleRef.current?.value.length > 5) {
      props.onHide();
      setCreateUnitModal(true);
    }
  };

  return (
    <>
      <Modal show={createUnitModal} keyboard={false} centered>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center flex-column gap-5">
            <div className="spinner-border text-primary" role="status" />
            <p style={{ color: "#252525" }}>Creating...</p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <form action={createModuleWithParams}>
          <Modal.Header closeButton>
            <Modal.Title>Create Knowledge Module - {props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <h5>Knowledge Module Code</h5>
              <input
                name="moduleCode"
                className="form-control mb-3"
                placeholder="Enter Module Code. E.g KM01"
                required
              />
            </div>
            <div>
              <h5>Title</h5>
              <input
                minLength={10}
                name="title"
                className="form-control mb-3"
                placeholder="Enter your title here..."
                required
                ref={titleRef}
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
            <input type="submit" hidden ref={submmitRef} />
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="success" onClick={() => submit()}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
export default dynamic(() => Promise.resolve(KnowledgeModuleModal), {
  ssr: false,
});