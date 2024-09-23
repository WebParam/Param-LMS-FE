"use client";
import { useEffect, useState } from "react";
import AddOption from "./AddOption";
import { useSearchParams } from "next/navigation";

interface TopicElement {
  id: number;
  description: string;
  label: string;
}

function Options() {
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId") || "";

  const [showError, setShowError] = useState(false);
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [topicElements, setTopicElements] = useState<TopicElement[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>("");

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    setSelectedOption((prevSelected) =>
      prevSelected && prevSelected === value ? "" : value
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
              type="radio"
              name="correctValue"
              value={topic.label}
              checked={selectedOption === topic.label}
              onChange={handleOptionChange}
              style={{ width: "17px", height: "17px" }}
              disabled={false}
            />
            <input
              type="text"
              className="form-control w-25"
              placeholder="Topic Element ..."
              name={`options[${topic.id}][label]`}
              defaultValue={topic.label}
              onChange={(e) => {
                const updatedElements = [...topicElements];
                updatedElements[index].description = e.target.value;
                setTopicElements(updatedElements);
              }}
            />
            <input
              type="text"
              className="form-control w-75"
              placeholder="Element Code ..."
              name={`options[${topic.id}][description]`}
              defaultValue={topic.description}
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
      <AddOption
        description={description}
        setDescription={setDescription}
        selectedOption={selectedOption}
        setShowError={setShowError}
        topicElements={topicElements}
        setTopicElements={setTopicElements}
        handleOptionChange={handleOptionChange}
        refreshId={refreshId}
      />
      {showError && <p className="text-danger">Enter Topic Element</p>}
    </div>
  );
}
export default Options;
