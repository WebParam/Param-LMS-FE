import { IOption } from "@/app/interfaces/questions";
import { useState } from "react";

export default function CreateQuestionBtn({ option }: { option: IOption }) {
  const [label, setLabel] = useState(option.label);

  return (
    <div
      style={{ columnGap: "20px" }}
      className="form-group d-flex  align-items-center"
    >
      <input
        style={{ width: "17px", height: "17px" }}
        type="radio"
        name="correctValue"
        id=""
        value={label}
        checked={option.isCorrect ? "true" : "false"}
        disabled={false}
      />
      <input type="hidden" name="options[0][id]" value={option.id} />
      <input
        style={{ width: "150px" }}
        type="text"
        className="form-control"
        placeholder="Label: E.g. A"
        name="options[0][label]"
        id=""
        defaultValue={option.label}
        onChange={(e: any) => setLabel(e.target.value)}
      />
      <input
        style={{ width: "720px" }}
        type="text"
        className="form-control"
        placeholder="Option ..."
        name="options[0][description]"
        id=""
        defaultValue={option.description}
      />
      <i className="material-icons">delete</i>
    </div>
  );
}
