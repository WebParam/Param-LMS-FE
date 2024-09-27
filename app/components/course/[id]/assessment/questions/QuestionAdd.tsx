import ReactQuill from "react-quill";
import { useEffect, useRef, useState } from "react";
import { createQuestion } from "@/app/lib/actions/questions";
import { useParams, useSearchParams } from "next/navigation";
import Options from "./Options";
import { AddBtn } from "./Buttons";
import Rubrics from "./Rubrics";

export default function QuestionAdd() {
  const [description, setDescription] = useState("");
  const [questionType, setQuestionType] = useState("Quiz");
  const [score, setScore] = useState(1);
  const ref = useRef<HTMLFormElement>(null);

  const {
    id: courseId,
    moduleId,
    assessmentId,
  } = useParams<{
    id: string;
    moduleId: string;
    assessmentId: string;
  }>();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const topicTitle = searchParams.get("topicTitle") || "";
  const refreshId = searchParams.get("refreshId");

  const createQuestionWithParams = createQuestion.bind(
    null,
    description,
    courseId,
    moduleId,
    assessmentId,
    title,
    topicTitle
  );

  useEffect(() => {
    ref.current?.reset();
    setDescription("");
  }, [refreshId]);

  return (
    <form ref={ref} action={createQuestionWithParams}>
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
                onChange={(e: any) => setScore(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            {questionType == "Quiz" ? <Options /> : <Rubrics />}
          </div>
        </div>
        <div
          style={{ rowGap: "20px" }}
          className="col-1 card d-flex p-3 align-items-center"
        >
          <AddBtn />
        </div>
      </div>
    </form>
  );
}
