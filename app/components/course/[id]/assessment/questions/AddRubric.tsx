interface TopicElement {
  element: string;
  code: string;
}

export default function AddRubric({
  label,
  setLabel,
  description,
  setDescription,
  setShowError,
  topicElements,
  setTopicElements,
  selectedOption,
  handleOptionChange,
}: {
  label: string;
  setLabel: (element: string) => void;
  description: string;
  selectedOption: string | null;
  setDescription: (element: string) => void;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowError: (value: boolean) => void;
  topicElements: TopicElement[];
  setTopicElements: (element: any[]) => void;
}) {
  return (
    <div
      style={{ columnGap: "20px" }}
      className="form-group d-flex mb-0 align-items-center"
    >
      <input
        type="text"
        className="form-control w-75"
        placeholder="Rubric ..."
        value={label}
        name={`options[${topicElements.length}][description]`}
        onChange={(e: any) => setLabel(e.target.value)}
        onClick={() => setShowError(false)}
      />
      <input
        type="text"
        className="form-control w-25"
        placeholder="Points: E.g. 4"
        name={`options[${topicElements.length}][label]`}
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
                element: label,
                code: description,
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
