import OptionDelete from "./OptionDelete";
import OptionAdd from "./OptionAdd";
import { IOption } from "@/app/interfaces/questions";

export default function QuestionOptions({ options }: { options?: IOption[] }) {
  return (
    <>
      {options &&
        options.map((option: IOption) => <OptionDelete option={option} />)}
      <OptionAdd />
    </>
  );
}
