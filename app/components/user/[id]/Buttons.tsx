"use client";
import { useFormStatus } from "react-dom";

export function EditUserBtn() {
  const formstatus = useFormStatus();

  return (
    <button className="btn btn-success">
      {formstatus.pending ? (
        <span className="spinner-border text-white" role="status" />
      ) : (
        <>Submit</>
      )}
    </button>
  );
}
