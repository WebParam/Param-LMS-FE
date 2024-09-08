"use client";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function EditButton({handleSubmit, setShowModal }: any) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (pending) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [pending]);

  return (
    <button
    onClick={handleSubmit}
      className="btn btn-success btn-block d-flex flex-column justify-content-center align-items-center"
      disabled={pending}
    >
      Submit
    </button>
  );
}
