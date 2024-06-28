import { IOption } from "@/app/interfaces/questions";
import { useState } from "react";

export default function CreateQuestionBtn({
  option,
  selectedOption,
  setSelectedOption,
}: {
  option: IOption;
  selectedOption: string | null;
  setSelectedOption: (value: any) => void;
}) {
  const [label, setLabel] = useState(option.label);

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
      className="form-group d-flex  align-items-center"
    >
      <input
        type="radio"
        name="correctValue"
        value={label}
        checked={selectedOption === label}
        onChange={handleOptionChange}
        style={{ width: "17px", height: "17px" }}
        disabled={false}
      />
      <input type="hidden" name="options[0][id]" value={option.id} />
      <input
        style={{ width: "150px" }}
        type="text"
        className="form-control"
        placeholder="Label: E.g. A"
        name="options[0][label]"
        defaultValue={option.label}
        onChange={(e: any) => setLabel(e.target.value)}
      />
      <input
        style={{ width: "720px" }}
        type="text"
        className="form-control"
        placeholder="Option ..."
        name="options[0][description]"
        defaultValue={option.description}
      />
      <i className="material-icons">delete</i>
    </div>
  );
}
