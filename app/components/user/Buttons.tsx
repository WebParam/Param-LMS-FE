import { Button } from "react-bootstrap";
import { useFormStatus } from "react-dom";

export function CreateUserBtn() {
  const formstatus = useFormStatus();

  return (
    <Button variant="success" type="submit">
      {formstatus.pending ? (
        <span className="spinner-border text-white" role="status" />
      ) : (
        <>Submit</>
      )}
    </Button>
  );
}

export function EditAssesssmentBtn() {
  const formstatus = useFormStatus();

  return (
    <Button variant="success" type="submit">
      {formstatus.pending ? (
        <span className="spinner-border text-white" role="status" />
      ) : (
        <>Submit</>
      )}
    </Button>
  );
}
