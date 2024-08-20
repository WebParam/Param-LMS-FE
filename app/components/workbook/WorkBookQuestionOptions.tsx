import { IOption } from "@/app/interfaces/questions";
import { useState } from "react";
import OptionAdd from "../course/[id]/knowledge-modules/knowledge-topics/OptionAdd";
import OptionDelete from "../course/[id]/knowledge-modules/knowledge-topics/OptionDelete";

export default function WorkBookQuestionOptions({ options }: { options?: IOption[] }) {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      {options &&
        options.map((option: IOption) => (
          <OptionDelete
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            key={option.id}
            option={option}
          />
        ))}
      <OptionAdd
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </>
  );
}
