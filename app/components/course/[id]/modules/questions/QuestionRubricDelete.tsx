import { Rubric } from "@/app/interfaces/rubric";

export default function QuestionRubric({ rubric }: { rubric: Rubric }) {
  return (
    <div
      style={{ columnGap: "20px" }}
      className="form-group d-flex align-items-center"
    >
      <input
        style={{ width: "750px" }}
        type="text"
        className="form-control"
        placeholder="Rubric ..."
        name="options[1][label]"
        defaultValue={rubric.label}
      />
      <input
        style={{ width: "150px" }}
        type="number"
        className="form-control"
        placeholder="Points: E.g. 4"
        name="options[1][description]"
        defaultValue={rubric.description}
      />
      <i className="material-icons">delete</i>
    </div>
  );
}
