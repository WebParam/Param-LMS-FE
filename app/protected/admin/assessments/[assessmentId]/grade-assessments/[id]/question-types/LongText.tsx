import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {  IMarkStudentAssessment, IRubric } from "@/app/interfaces/assessments";
import { useParams } from "next/navigation";
import { markStudentAssessment } from "@/app/lib/actions/assessments";

type Props = {
  questionName: string;
  questionDescription: string;
  questionAnswer: string;
  questionScore: number;
  rubric: IRubric[]
};
export default function ({
  questionName,
  questionAnswer,
  questionScore,
  rubric
}: Props) {
  const [grades, setGrades] = useState<number[]>(Array(rubric.length).fill(0));
  const [isGraded, setIsGraded] = useState(false);
  const totalGrade = grades.reduce((acc, grade) => acc + grade, 0);


  useEffect(() => {
    setIsGraded(totalGrade > 0);
  }, [totalGrade]);

  const handleGradeChange = async (index: number, grade: number) => {
    const newGrades = [...grades];
    newGrades[index] = grade;
    setGrades(newGrades);
    await markStudent(rubric[index].questionId, rubric[index].id, newGrades.reduce((acc, grade) => acc + grade, 0), rubric[index].label);
  };
  const { id: userId, assessmentId } = useParams<{
    id: string;
    assessmentId: string;
  }>();

  const markStudent = async (questionId:string,rubricId:string , mark: number, label:number) => {
    const payload: IMarkStudentAssessment = {
      assessmentId: assessmentId,
      questionId: questionId,
      rubricId: rubricId,
      userId: userId,
      creatingUserId: "someCreatingUserId",
      mark: mark,
      markType: 1,
      label : Number(label)
    };
    const markResponse = await markStudentAssessment(payload);
    console.log("markResponse",markResponse)
  }

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
         
          <tr></tr>
          <tr className="d-flex flex-column">
            <td className="py-2">
              <div>
                <h6>ANSWER:</h6>
                <p>{questionAnswer}</p>
                
              </div>
            </td>
          </tr>
          <tr>
          <td className="py-2">
              <div>
                <h6>RUBRIC:</h6>
              </div>
            </td>
            
          </tr>
          <tr className="d-flex flex-column ">
          {rubric.map((choice, index) => (
              <td key={index} className="py-2 d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column align-items-start">
                  <div className="text-success d-flex">
                    {Array(grades[index]).fill(<i className="material-icons">check</i>).map((icon, i) => (
                      <span key={i} className="mr-1">{icon}</span>
                    ))}
                  </div>
                  <span className="ml-2">{choice.description}</span>
                </div>
                <td style={{ width: "200px" }} className="py-1">
                <GradeInput
                  setIsGraded={setIsGraded}
                  setGrade={(grade) => handleGradeChange(index, grade)}
                  grade={grades[index] || choice.facilitatorScore}
                  questionScore={Number(choice.label)}
                />
              </td>
              </td>
            ))}
            <td style={{ width: "170px" }} className="py-1 d-flex flex-row align-items-center align-self-end">
                <Grade
                questionType="short"
                  setIsGraded={setIsGraded}
                  grade={totalGrade}
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
          <div className={`text-center w-100 py-2 ${grade < (questionScore * 0.5) ? "text-danger" : "text-success"}`}>Score: {grade} / {questionScore}</div>
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
          onChange={(e) => setGrade(Number(e.target.value))}
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
