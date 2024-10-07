"use client";
import { useEffect, useState } from "react";
import AddRubric from "./AddRubric";
import { useSearchParams } from "next/navigation";

interface TopicElement {
  id: number;
  element: string;
  code: string;
}

function Options() {
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");

  const [showError, setShowError] = useState(false);
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [topicElements, setTopicElements] = useState<TopicElement[]>([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    setSelectedOption((prevSelected: string) =>
      prevSelected === value ? "" : value
    );
  };

  useEffect(() => {
    setTopicElements([]);
  }, [refreshId]);

  return (
    <div className="mt-2">
      {topicElements &&
        topicElements.map((topic, index) => (
          <div
            style={{ columnGap: "20px" }}
            className="form-group d-flex mb-3 align-items-center"
            key={topic.id}
          >
            <input
              type="text"
              className="form-control w-75"
              placeholder="Rubric ..."
              name={`options[${topic.id}][description]`}
              defaultValue={topic.element}
              onChange={(e) => {
                const updatedElements = [...topicElements];
                updatedElements[index].element = e.target.value;
                setTopicElements(updatedElements);
              }}
            />
            <input
              type="text"
              className="form-control w-25"
              placeholder="Points: E.g. 4"
              name={`options[${topic.id}][label]`}
              defaultValue={topic.code}
            />
            <button className="btn p-0" type="button">
              <i
                style={{ fontSize: "25px" }}
                className="material-icons"
                onClick={() => {
                  setTopicElements((prevTopicElements) =>
                    prevTopicElements.filter((e, i) => e.id !== topic.id)
                  );
                }}
              >
                delete
              </i>
            </button>
          </div>
        ))}
      <AddRubric
        label={label}
        setLabel={setLabel}
        description={description}
        setDescription={setDescription}
        selectedOption={selectedOption}
        setShowError={setShowError}
        topicElements={topicElements}
        setTopicElements={setTopicElements}
        handleOptionChange={handleOptionChange}
      />
      {showError && <p className="text-danger">Enter Topic Element</p>}
    </div>
  );
}
export default Options;
