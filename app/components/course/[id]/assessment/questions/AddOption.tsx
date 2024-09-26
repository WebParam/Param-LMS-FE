import { useEffect, useState } from "react";

interface TopicElement {
  id: number;
  description: string;
  label: string;
}

export default function AddOption({
  description,
  setDescription,
  setShowError,
  topicElements,
  setTopicElements,
  selectedOption,
  handleOptionChange,
  refreshId,
}: {
  description: string;
  selectedOption: string | null;
  setDescription: (description: string) => void;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowError: (value: boolean) => void;
  topicElements: TopicElement[];
  setTopicElements: (element: any[]) => void;
  refreshId: string;
}) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    setLabel("");
    setDescription("");
  }, [refreshId]);

  return (
    <div
      style={{ columnGap: "20px" }}
      className="form-group d-flex mb-0 align-items-center"
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
        type="text"
        className="form-control w-25"
        placeholder="Label: E.g. A"
        value={label}
        name={`options[${topicElements.length}][label]`}
        onChange={(e: any) => setLabel(e.target.value)}
        onClick={() => setShowError(false)}
      />
      <input
        type="text"
        className="form-control w-75"
        placeholder="Option ..."
        name={`options[${topicElements.length}][description]`}
        value={description}
        onChange={(e: any) => setDescription(e.target.value)}
        onClick={() => setShowError(false)}
      />{" "}
      <button className="btn p-0" type="button">
        <i
          style={{ fontSize: "25px" }}
          className="material-icons"
          onClick={() => {
            if (label !== "" && description !== "") {
              const newElement = {
                id: topicElements.length,
                label,
                description,
              };
              setTopicElements([...topicElements, newElement]);
              setLabel("");
              setDescription("");
            } else {
              setShowError(true);
            }
          }}
        >
          add
        </i>
      </button>
    </div>
  );
}
