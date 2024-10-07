"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getQuestions } from "@/app/lib/actions/questions";
import Question from "@/components/course/[id]/modules/questions/Question";
import { IQuestion } from "@/app/interfaces/questions";
import QuestionAdd from "@/components/course/[id]/assessment/questions/QuestionAdd";

const Body = ({ params }: { params: { assessmentId: string } }) => {
  const assessmentId = params.assessmentId;
  const [list, setList] = useState([]);
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");

  const fetchQuestions = async () => {
    const response = await getQuestions(assessmentId);
    setList(response);
  };

  useEffect(() => {
    fetchQuestions();
  }, [refreshId]);

  return (
    <>
      <div className="page-separator mb-4">
        <div className="page-separator__text">Questions</div>
      </div>

      <QuestionAdd />

      {list &&
        list.map((question: IQuestion) => (
          <Question key={question.id} question={question} />
        ))}
    </>
  );
};

export default Body;
