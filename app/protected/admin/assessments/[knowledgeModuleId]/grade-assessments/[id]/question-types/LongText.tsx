import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

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
          <tr></tr>
          <tr className="d-flex flex-column">
            <td className="py-2">
              <div>
                <h6>ANSWER:</h6>
                <ReactQuill
                
                value="" onChange={(value) => {}} />
              </div>
            </td>
          </tr>
          <tr>
          <td className="py-2">
              <div>
                <h6>RUBRIC</h6>
              </div>
            </td>
            
          </tr>
          <tr>
          {[1, 2, 3, 4].map((choice, index) => (
              <td key={index} className="py-2 d-flex">
                <span className="ml-2">{choice}. {questionAnswer}</span>
                <td style={{ width: "200px" }} className="py-1">
                <GradeInput
                  setIsGraded={setIsGraded}
                  setGrade={setGrade}
                  grade={grade}
                  questionScore={questionScore}
                />
              </td>
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
  

function GradeInput({
  setIsGraded,
  setGrade,
  grade,
  questionScore,
}: {
  setIsGraded: (isGraded: boolean) => void;
  setGrade: (grade: number) => void;
  grade: number;
  questionScore: number;
}) {
  return (
    <div className="d-flex w-100">
      <div className="d-flex w-75">
        <input
          type="number"
          className="form-control"
          defaultValue={grade}
          min="0"
          max={questionScore}
          onChange={(e) => setGrade(+e.target.value)}
        />
        <div className="text-center w-100 py-2"> / {questionScore}</div>
      </div>
      <div>
        <button
          onClick={() => setIsGraded(true)}
          type="button"
          className="btn btn-success"
        >
          <i className="material-icons">check</i>
        </button>
      </div>
    </div>
  );
}
