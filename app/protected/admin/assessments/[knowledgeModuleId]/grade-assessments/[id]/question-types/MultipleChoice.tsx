import { useState } from "react";

type Props = {
  questionName: string;
  questionDescription: string;
  questionAnswer: string;
  questionScore: number;
};
export default function ({
  questionName,
  questionDescription,
  questionAnswer,
  questionScore,
}: Props) {
  const [grade, setGrade] = useState(0);
  const [isGraded, setIsGraded] = useState(false);

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
            <td>1. {questionDescription}</td>
          </tr>
          <tr>
            <td>
              <strong>ANSWERS: </strong>
            </td>
            <td></td>
          </tr>
          <tr className="d-flex flex-column">
            {['A', 'B', 'C', 'D'].map((choice, index) => (
              <td key={index} className={`py-2 d-flex ${index == 2 ? "text-danger" : index == 3 && "text-success"}`}>
                <input type="radio" disabled name="answer" value={index} />
                <span className="ml-2">{choice}. {questionAnswer}</span>
              </td>
            ))}
            
            <td style={{ width: "170px" }} className="py-1 d-flex flex-row align-items-center align-self-end">
                <Grade
                questionType="short"
                  setIsGraded={setIsGraded}
                  grade={grade}
                  questionScore={questionScore}
                />
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
  questionType?:string
  questionScore: number;
}) {
  return (
    <div className="d-flex w-100">
      <div className="d-flex w-75">
        <div className="text-center w-100 py-2">Score: {grade} / {questionScore}</div>
      </div>
      {! questionType &&
        <div>
        <button
          onClick={() => setIsGraded(false)}
          type="button"
          className="btn btn-outline-success"
        >
         <i className="material-icons">edit</i>
        </button>
      </div>
}
    </div>
  );
}
