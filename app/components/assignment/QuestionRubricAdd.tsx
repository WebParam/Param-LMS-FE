import { AddBtn } from "../course/[id]/assessment/questions/Buttons";

export default function QuestionRubric() {
  return (
    <div className="form-group d-flex flex-column mb-0 ">
      <div
        style={{ width: "750px" }}
        className="d-flex align-items-center "
      >
        <input
          style={{ width: "700px" }}
          type="text"
          className="form-control"
          placeholder="Rubric ..."
          name="options[0][description]"
        />

        <input
          style={{ width: "150px" }}
          type="number"
          className="form-control ml-2"
          placeholder="Points: E.g. 4"
          name="options[0][label]"
        />
        <AddBtn />
      </div>

      <div className="d-flex justify-content-end">
        <input
          style={{ width: "150px" }}
          type="number"
          className="form-control mt-5 mr-4 "
          placeholder="Totol Score: E.g. 20"
          name="options[0][label]"
        />
      </div>
    </div>
  );
}
