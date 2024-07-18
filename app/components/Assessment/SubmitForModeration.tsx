"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaUser } from "react-icons/fa";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Pagination from "@/app/components/Pagination";

function SubmitForModeration(props: any) {
  const [dueDate, setDueDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moderators] = useState([
    { name: "Ms Billy Mokoena", email: "BillyMok@thooto.com" },
    { name: "Mr Leonard Messi", email: "Messileo@thooto.com" },
    { name: "Dr Jane Doe", email: "JaneDoe@thooto.com" },
    { name: "Prof John Smith", email: "JohnSmith@thooto.com" },
    { name: "Ms Alice Johnson", email: "AliceJ@thooto.com" },
    { name: "Mr Bob Brown", email: "BobB@thooto.com" },
    { name: "Ms Carol White", email: "CarolW@thooto.com" },
    { name: "Mr Dave Black", email: "DaveB@thooto.com" },
  ]);

  const ITEMSPERPAGE = 3;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = moderators.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form>
          <Modal.Header closeButton>
            <Modal.Title className="text-center m-auto">Select Moderator</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <h5>Names and Email Addresses</h5>
              {currentItems.map((moderator, index) => (
                <div className="d-flex align-items-center mb-3" key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius:"10px" }}>
                  <FaUser className="mr-2" />
                  <span>{index + 1}. {moderator.name} - {moderator.email}</span>
                </div>
              ))}
              <h5>Moderation Due Date</h5>
              <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex align-items-center mt-3">
                <Form.Group controlId="startTime" className="mr-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="endTime" className="ml-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between w-100">
              <Pagination
                listLength={moderators.length}
                indexOfLastItem={indexOfLastItem}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                ITEMSPERPAGE={ITEMSPERPAGE}
              />
              <div>
                <Button variant="secondary" onClick={props.onHide} className="mr-2">
                  Cancel
                </Button>
                <Button variant="success" type="submit">
                  Send
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default dynamic(() => Promise.resolve(SubmitForModeration), {
  ssr: false,
});