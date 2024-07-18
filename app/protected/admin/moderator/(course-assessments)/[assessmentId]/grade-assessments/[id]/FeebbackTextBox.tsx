"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { submitForModeration, submitModeratorFeedback } from "@/app/lib/actions/assessments";
import { useRouter } from "next/navigation";

function FeedbackTextBox({ questionId }: any) {
  const [feedback, setFeedback] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const submitFeedback = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("")
    setSuccessMessage("");
    event.preventDefault();
    const plainFeedback = feedback.replace(/<(?:\/)?[sp]+[^>]*>/g, "");

    if (!plainFeedback.trim()) {
      setErrorMessage("Feedback cannot be empty");
      setSuccessMessage("");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("questionId", questionId);
    formData.append("moderatorFeedBack", plainFeedback);

    try {
      const submitResponse = await submitModeratorFeedback(formData);
      if (!submitResponse.id) {
        setErrorMessage("Failed to submit feedback");
        setSuccessMessage("");
        return;
      }
      setSuccessMessage("Feedback submitted successfully");
      setErrorMessage("");

      setTimeout(() => {
        setSuccessMessage("");
        router.back();
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrorMessage("Failed to submit feedback");
      setSuccessMessage("");
    }
  };

  return (
    <div className="mb-2 py-2">
      <form onSubmit={submitFeedback}>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Reason For Overriding</h5>
            <button type="submit" className="btn btn-success">
              Submit Feedback
            </button>
          </div>
          <ReactQuill
            value={feedback}
            onChange={(value) => setFeedback(value)}
            style={{ color: "#252525", height: "100px" }}
          />
        </div>
      </form>
    </div>
  );
}

export default FeedbackTextBox;