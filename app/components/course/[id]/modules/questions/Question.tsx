import ReactQuill from "react-quill";
import { useEffect, useRef, useState } from "react";
import QuestionOptions from "./QuestionOptions";
import QuestionRubric from "./QuestionRubric";
import { updateQuestion } from "@/app/lib/actions/questions";
import { useParams, useSearchParams } from "next/navigation";
import { IOption, IQuestion } from "@/app/interfaces/questions";
import { getOptions } from "@/app/lib/actions/options";
import { getRubrics } from "@/app/lib/actions/rubrics";
import { EditBtn } from "./Buttons";

export default function Question({ question }: { question: IQuestion }) {
  const [description, setDescription] = useState(question.description);
  const [questionType, setQuestionType] = useState(question.questionType);
  const [score, setScore] = useState(question.score);
  const [options, setOptions] = useState<IOption[]>([]);
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const refreshId = searchParams.get("refreshId");
  const ref = useRef<HTMLFormElement>(null);

  const fetchOptions = async () => {
    const data = await getOptions(question.id!);
    console.log("Options", data);
    setOptions(data);
  };

  const fetchRubric = async () => {
    const data = await getRubrics(question.id!);
    setOptions(data);
  };

  useEffect(() => {
    if (question.questionType == "Quiz") fetchOptions();
    else fetchRubric();
    ref.current?.reset();
  }, [refreshId]);

  const {
    id: courseId,
    moduleId,
    assessmentId,
  } = useParams<{
    id: string;
    moduleId: string;
    assessmentId: string;
  }>();

  const updateQuestionWithParams = updateQuestion.bind(
    null,
    question.id!,
    description,
    courseId,
    moduleId,
    assessmentId,
    title
  );

  return (
    <form ref={ref} action={updateQuestionWithParams}>
      <div className="row">
        <div className="card p-4 col-11">
          <div className="form-group row mb-0">
            <div className="col-sm-9">
              <ReactQuill
                value={description}
                onChange={(value) => setDescription(value)}
                style={{ color: "#252525", height: "56px" }}
                placeholder="Question ..."
              />
            </div>
            <div className="col-sm-3">
              <select
                id="select01"
                data-toggle="select"
                className="form-control mb-4"
                name="questionType"
                defaultValue={questionType}
                onChange={(e: any) => setQuestionType(e.target.value)}
              >
                <option>Select Question Type</option>
                <option>Long Text</option>
                <option>Quiz</option>
              </select>
              <input
                name="score"
                type="number"
                className="form-control"
                placeholder="Score: E.g 1"
                min="1"
                defaultValue={score}
                onChange={(e: any) => setScore(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            {questionType == "Quiz" ? (
              <QuestionOptions options={options} />
            ) : (
              <QuestionRubric />
            )}
          </div>
        </div>
        <div
          style={{ rowGap: "20px" }}
          className="col-1 card d-flex p-3 align-items-center"
        >
          <EditBtn />
          <i className="material-icons">delete</i>
        </div>
      </div>
    </form>
  );
}
