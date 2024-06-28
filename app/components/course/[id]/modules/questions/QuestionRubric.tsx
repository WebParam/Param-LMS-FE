import { Button } from "react-bootstrap";
import { useFormStatus } from "react-dom";
import QuestionRubricDelete from "./QuestionRubricDelete";
import QuestionRubricAdd from "./QuestionRubricAdd";

export default function QuestionRubric() {
  return (
    <>
      <QuestionRubricDelete />
      <QuestionRubricAdd />
    </>
  );
}
