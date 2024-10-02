import { Option } from "@/app/interfaces/assessments";
import { useState, useEffect } from "react";

type Props = {
  questionNumber: number;
  setTotals: (total: number, index: number) => void;
  questionName: string;
  questionDescription: string;
  questionScore: number;
  answers: Option[];
  studentMultipleChoiceAnswer: Option[];
};
export default function ({
  questionNumber,
  setTotals,
  questionName,
  questionDescription,
  questionScore,
  answers,
  studentMultipleChoiceAnswer,
}: Props) {
  const [grade, setGrade] = useState(0);
  const [isGraded, setIsGraded] = useState(false);
  const [answer, setAnswer] = useState("");

  return (
    <div className="card table-responsive my-24pt">
      <table className="table table-flush table--elevated">
        <thead>
          <tr>
            <th>{questionName}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {answers.map((choice, index) => {
            const isStudentAnswer =
              studentMultipleChoiceAnswer[0].label == choice.label;
            if (!answer && choice.isCorrect) {
              setAnswer(choice.label);
              if (isStudentAnswer) {
                setGrade((prevGrade) => {
                  const newGrade = questionScore;
                  setTotals(questionScore, questionNumber);
                  return newGrade;
                });
              }
            }

            return (
              <tr className="w-100">
                <td
                  key={index}
                  className={`py-2 w-100 ${
                    isStudentAnswer
                      ? choice.isCorrect
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    disabled
                    name="answer"
                    value={choice.label}
                    defaultChecked={isStudentAnswer}
                  />
                  <span className="ml-2">
                    {choice.label}. {choice.description}
                  </span>
                </td>
              </tr>
            );
          })}
          <tr className="">
            <td
              style={{ width: "100%" }}
              className={`py-2 d-flex justify-content-between align-items-center `}
            >
              <h6 className="m-0">Correct Answer : {answer}</h6>

              <div className="">
                <Grade
                  questionType="short"
                  setIsGraded={setIsGraded}
                  grade={grade}
                  questionScore={questionScore}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Grade({
  questionType,
  setIsGraded,
  grade,
  questionScore,
}: {
  setIsGraded: (isGraded: boolean) => void;
  grade: number;
  questionType?: string;
  questionScore: number;
}) {
  return (
    <div className="d-flex w-100">
      <div className="d-flex ">
        <div className={`text-center w-100 py-2`}>
          <h6
            className={`mb-1 ${
              grade === questionScore ? "text-success" : "text-danger"
            }`}
          >
            Score: {grade} / {questionScore}
          </h6>
        </div>
      </div>
      {!questionType && (
        <div>
          <button
            onClick={() => setIsGraded(false)}
            type="button"
            className="btn btn-outline-success"
          >
            <i className="material-icons">edit</i>
          </button>
        </div>
      )}
    </div>
  );
}
