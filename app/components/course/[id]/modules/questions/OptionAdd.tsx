import { useState } from "react";
import { AddBtn } from "./Buttons";

export default function OptionAdd({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: string | null;
  setSelectedOption: (value: any) => void;
}) {
  const [label, setLabel] = useState("");
  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    setSelectedOption((prevSelected: any) =>
      prevSelected === value ? null : value
    );
  };

  return (
    <div
      style={{ columnGap: "20px" }}
      className="form-group d-flex  mb-0 align-items-center"
    >
      <input
        type="radio"
        name="correctValue"
        value={label}
        checked={selectedOption !== "" && selectedOption === label}
        onChange={handleOptionChange}
        style={{ width: "17px", height: "17px" }}
        disabled={false}
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
