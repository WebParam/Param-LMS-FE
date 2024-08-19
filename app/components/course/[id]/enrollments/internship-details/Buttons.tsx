import { useFormStatus } from "react-dom";

export function SubmitBtn() {
  const formstatus = useFormStatus();

  return (
    <>
      <button className="btn btn-success btn-block">
        {formstatus.pending ? (
          <span className="spinner-border text-white" role="status" />
        ) : (
          "Submit"
        )}
      </button>
    </>
  );
}
