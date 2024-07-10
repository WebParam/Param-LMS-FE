"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function CreateNotificationModal(props: any) {
  const [description, setDescription] = useState("");
  const [createUnitModal, setCreateUnitModal] = useState(false);
  const [queryPrompt, setQueryPrompt] = useState<string>("");
  const [reminder, setReminder] = useState(false);
  const [targetGroup, setTargetGroup] = useState("Select Group");
  const submmitRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCreateUnitModal(false);
  }, []);

  const submit = () => {
    submmitRef.current?.click();
    if (titleRef.current?.value && titleRef.current?.value.length > 10) {
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
      >
        <form>
          <Modal.Body>
            <div className="d-flex justify-content-between align-items-start">
              <h6>Notification Title</h6>
              <button
                type="button"
                className="btn btn-link"
                aria-label="Close"
                onClick={props.onHide}
                style={{ fontSize: "1.5rem", textDecoration: "none", marginTop: "-20px" }}
              >
                &times;
              </button>
            </div>
            <input
              minLength={10}
              name="title"
              className="form-control mb-3"
              placeholder="Enter your title here..."
              required
              ref={titleRef}
            />
            <div>
              <h6>Description</h6>
              <ReactQuill
                value={description}
                onChange={(value) => setDescription(value)}
                placeholder="Write your notification description here..."
                style={{ color: "#252525" }}
              />
            </div>
            <div className="mt-3">
              <h6>Notification Target</h6>
              <select
                className="form-control"
                value={targetGroup}
                onChange={(e) => setTargetGroup(e.target.value)}
              >
                <option>Select Group</option>
                <option>Course Students</option>
                <option>Individual Student</option>
                
              </select>
            </div>
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <h6 style={{ marginBottom: "0" }}>Notification Reminder?</h6>
              <input
                type="checkbox"
                checked={reminder}
                onChange={() => setReminder(!reminder)}
                style={{
                  width: "15px",
                  height: "15px",
                  accentColor: "green",
                  borderColor: "green",
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <input type="send" hidden ref={submmitRef} />
            <Button variant="success" onClick={() => submit()}>
              Send Notification
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
export default dynamic(() => Promise.resolve(CreateNotificationModal), {
  ssr: false,
});