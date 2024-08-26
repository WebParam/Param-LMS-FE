import { Option } from "@/app/interfaces/assessments";
import { useState, useEffect } from "react";

type Props = {
  questionName: string;
  questionDescription: string;
  questionScore: number;
  answers: Option[];
  studentMultipleChoiceAnswer: Option[];
};
export default function ({
  questionName,
  questionDescription,
  questionScore,
  answers,
  studentMultipleChoiceAnswer,
}: Props) {
  const [grade, setGrade] = useState(0);
  const [isGraded, setIsGraded] = useState(false);

  useEffect(() => {
    const isCorrect = studentMultipleChoiceAnswer.every((answer) =>
      answers.some(
        (choice) => choice.label === answer.label && choice.isCorrect
      )
    );
    setGrade(isCorrect ? questionScore : 0);
  }, [answers, studentMultipleChoiceAnswer, questionScore]);

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
          <tr>
            <td>
              <strong>ANSWERS: </strong>
            </td>
            <td></td>
          </tr>
          <tr className="d-flex flex-column">
            {answers.map((choice, index) => {
              const isSelected = studentMultipleChoiceAnswer.some(
                (answer) => answer.label === choice.label
              );
              const isCorrect = choice.isCorrect;
              const selectedIndex = answers.findIndex(
                (answer) =>
                  answer.label === studentMultipleChoiceAnswer[0].label
              );
              return (
                <td
                  key={index}
                  className={`py-2 d-flex ${
                    isSelected
                      ? isCorrect
                        ? "text-success"
                        : "text-danger"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    disabled
                    name="answer"
                    value={selectedIndex}
                    defaultChecked={index === selectedIndex}
                  />
                  <span className="ml-2">{choice.label}</span>
                </td>
              );
            })}

            <td style={{width:"100%"}} className={`py-2 d-flex justify-content-between align-items-center `}>
             <p className="text-success">
             Correct Answer : 4
             </p>
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
        <div
          className={`text-center w-100 py-2 ${
            grade === questionScore ? "text-success" : "text-danger"
          }`}
        >
          Score: {grade} / {questionScore}
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
