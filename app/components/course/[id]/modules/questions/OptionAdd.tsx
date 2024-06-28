import { useState } from "react";
import { AddBtn } from "./Buttons";

export default function OptionAdd() {
  const [label, setLabel] = useState("");

  return (
    <div
      style={{ columnGap: "20px" }}
      className="form-group d-flex  mb-0 align-items-center"
    >
      <input
        style={{ width: "17px", height: "17px" }}
        type="radio"
        name="correctValue"
        id=""
        value={label}
      />
      <input
        style={{ width: "150px" }}
        type="text"
        className="form-control"
        placeholder="Label: E.g. A"
        name="options[1][label]"
        id=""
        onChange={(e: any) => setLabel(e.target.value)}
      />
      <input
        style={{ width: "720px" }}
        type="text"
        className="form-control"
        placeholder="Option ..."
        name="options[1][description]"
        id=""
      />
      <AddBtn />
    </div>
  );
}
