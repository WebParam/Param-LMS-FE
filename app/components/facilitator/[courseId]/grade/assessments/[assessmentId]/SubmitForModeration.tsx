"use client";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { submitForModeration } from "@/app/lib/actions/assessments";
import { useParams, useRouter } from "next/navigation";
import { getUsers, getUsersByRoleAndCourses } from "@/app/lib/data/users";

function SubmitForModeration(props: any) {
  const [selectedModerator, setSelectedModerator] = useState("");
  const [moderators, setModerators] = useState<any[]>([]);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleModeratorChange = (e: any) => {
    setSelectedModerator(e.target.value);
  };

  const router = useRouter();
  const { courseId, assessmentId, id } = useParams<{
    courseId: string;
    assessmentId: string;
    id: string;
  }>();

  const submitModeration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (selectedModerator === "") {
      setErrorMessage("Please select a Moderator");
      return;
    }

    formData.append("moderatorId", selectedModerator || "");
    formData.append("assessmentId", assessmentId);
    setLoading(true);

    try {
      const response = await submitForModeration(formData);
      const { data, message } = response;
      setLoading(false);

      if (data) {
        setSuccessMessage("Moderation submitted successfully");
        setTimeout(() => {
          setErrorMessage("");
          props.onHide();
          router.back();
        }, 3000);
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting moderation:", error);
      setErrorMessage("Failed to submit moderation");
      setSuccessMessage("");
    }
  };

  const getModerators = async () => {
    const moderators: any[] = await getUsers();
    const users = await getUsersByRoleAndCourses(courseId, 0);

    const moderatorDetails = moderators.reduce((acc: any, moderator: any) => {
      acc[moderator.userId] = moderator;
      return acc;
    }, {});

    const moderatorsData = users.map(
      (user: any) => moderatorDetails[user.userId]
    );
    setModerators(moderatorsData || []);
  };

  useEffect(() => {
    getModerators();
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
                  onClick={() => setErrorMessage("")}
                  onChange={handleModeratorChange}
                >
                  <option value="">Select a moderator...</option>
                  {moderators.length > 0 &&
                    moderators.map((moderator: any) => (
                      <option key={moderator.userId} value={moderator.userId}>
                        {moderator.firstName} {moderator.lastName} -{" "}
                        {moderator.email}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-center w-100">
              <div>
                <Button
                  variant="secondary"
                  onClick={props.onHide}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button variant="success" type="submit">
                  {!loading ? (
                    "Submit"
                  ) : (
                    <div className="spinner-border text-white" role="status" />
                  )}
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default SubmitForModeration;

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
