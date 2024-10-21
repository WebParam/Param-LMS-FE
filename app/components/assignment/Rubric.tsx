import ReactQuill from "react-quill";
import { useEffect, useRef, useState } from "react";
import { createQuestion } from "@/app/lib/actions/questions";
import { useParams, useSearchParams } from "next/navigation";
import QuestionRubric from "./QuestionRubric";
import { AddBtn } from "../course/[id]/assessment/questions/Buttons";

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
      <div className="card p-2 ">
        <QuestionRubric />
        
        </div>
    </form>
  );
}
