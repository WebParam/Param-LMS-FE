"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { submitForModeration } from "@/app/lib/actions/assessments";
import { useParams, useRouter } from "next/navigation";
import { getUsersByRole } from "@/app/lib/data/users";

function SubmitForModeration(props: any) {
  const [dueDate, setDueDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedModerator, setSelectedModerator] = useState<IUser | any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [moderators, setModerators] = useState<IUser[]>([]);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)


  const ITEMSPERPAGE = 3;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = moderators.slice(indexOfFirstItem, indexOfLastItem);

  const handleModeratorChange = (e: any) => {
    setSelectedModerator(e.target.value);
    console.log(e.target.value);
  };

  const router = useRouter();
  const { assessmentId, id } = useParams<{ assessmentId: string; id: string }>();

  const submitModeration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("moderatorId", selectedModerator.id);
    formData.append("assessmentId", assessmentId);
    formData.append("studentId", "6674335c5f6ceeb4980ebb68");
    setLoading(true)

    try {
      const submitResponse = await submitForModeration(formData);
  
      if (!submitResponse.id) {
        setLoading(false)

        setErrorMessage("Failed to submit moderation");
        setSuccessMessage("");
        return;
      }
      setLoading(false)

      setSuccessMessage("Moderation submitted successfully");
 
      setTimeout(() => {
        setErrorMessage("");

        props.onHide();
        router.back();
            }, 3000);
    } catch (error) {
      setLoading(false)

      console.error("Error submitting moderation:", error);
      setErrorMessage("Failed to submit moderation");
      setSuccessMessage("");
    }
  };

  const getUser = async () => {
    const users = await getUsersByRole("moderator");
    setModerators(users);
    console.log("users", users);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <form onSubmit={submitModeration}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center m-auto">
              Select Moderator
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div>
              <Form.Group controlId="moderatorSelect">
                <Form.Label>Moderator</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedModerator}
                  onChange={handleModeratorChange}
                >
                  <option value="">Select a moderator...</option>
                  {moderators.map((moderator: IUser, index) => (
                    <option key={index} value={moderator.id}>
                      {moderator.firstName} {moderator.lastName} - {moderator.email}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
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
              <div>
                <Button
                  variant="secondary"
                  onClick={props.onHide}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button variant="success" type="submit">
                {!loading ? "Submit" : <div className="spinner-border text-white" role="status" /> }
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

export interface IUser {
  id: string;
  reference: string | null;
  firstName: string;
  lastName: string;
  username: string | null;
  email: string;
  password: string;
  image: string;
  createdOn: string;
  createdBy: string;
  changedOn: string;
  changedBy: string;
  status: number;
  otp: string;
  role: string;
  loginType: number;
  headLine: string | null;
  summary: string | null;
  organizationId: string | null;
  isEmailVerified: boolean;
}
