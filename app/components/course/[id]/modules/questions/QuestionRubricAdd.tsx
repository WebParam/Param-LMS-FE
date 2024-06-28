export default function QuestionRubric() {
  return (
    <div
      style={{ columnGap: "20px" }}
      className="form-group d-flex mb-0 align-items-center"
    >
      <input
        type="text"
        className="form-control"
        placeholder="Rubric ..."
        name=""
        id=""
      />
      <input
        style={{ width: "150px" }}
        type="number"
        className="form-control"
        placeholder="Points: E.g. 4"
        name=""
        id=""
      />
      <i className="material-icons">add</i>
    </div>
  );
}
