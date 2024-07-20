import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { IMarkStudentAssessment, IRubric } from "@/app/interfaces/assessments";
import { useParams } from "next/navigation";
import { markStudentAssessment } from "@/app/lib/actions/assessments";


type Props = {
  questionName: string;
  questionDescription: string;
  questionAnswer: string;
  questionScore: number;
  rubric: IRubric[];
};

export default function ({
  questionName,
  questionAnswer,
  questionScore,
  rubric
}: Props) {
  const [facilitatorGrades, setFacilitatorGrades] = useState<number[]>([5,3,4]);//rubric.map(r => r.facilitatorScore || 0)
  const [moderatorGrades, setModeratorGrades] = useState<number[]>([2,1,3]);//rubric.map(r => r.moderatorScore || 0)
  const [isGraded, setIsGraded] = useState(false);
  const totalGrade = moderatorGrades.reduce((acc, grade) => acc + grade, 0);

  useEffect(() => {
    setIsGraded(totalGrade > 0);
  }, [totalGrade]);

  const handleGradeChange = async (index: number, grade: number) => {
    const newGrades = [...moderatorGrades];
    newGrades[index] = grade;
    setModeratorGrades(newGrades);
    await markStudent(rubric[index].questionId, rubric[index].id, grade, rubric[index].label);
  };

  const { id: userId, assessmentId } = useParams<{ id: string; assessmentId: string }>();

  const markStudent = async (questionId: string, rubricId: string, mark: number, label: number) => {
    const payload: IMarkStudentAssessment = {
      assessmentId: assessmentId,
      questionId: questionId,
      rubricId: rubricId,
      userId: userId,
      creatingUserId: "c1d2e3f4567890b1c2d3e4f5",
      mark: mark,
      markType: 0,
      label: Number(label)
    };
    const markResponse = await markStudentAssessment(payload);
  };

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
            <td className="py-2 d-flex justify-content-between">
              <div>
                <h6>RUBRIC:</h6>
              </div>
              <div className="d-flex flex-row justify-content-between mr-5">
                <h6 className="mr-5 text-success">Facilitator</h6>
                <h6 className="mr-3 text-danger">Moderator</h6>
              </div>
            </td>
          </tr>
          <tr className="d-flex flex-column">
            {rubric.map((choice, index) => (
              <td key={index} className="py-2 d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column align-items-start">
                <div className="text-danger d-flex mt-2">
                    {Array.from({ length: moderatorGrades[index] || 0 }).map((_, i) => (
                      <i key={i} className="material-icons">check</i>
                    ))}
                  </div>
                
                  <span className="ml-2">{choice.description}</span>
                  <div className="text-success d-flex">
                    {Array(facilitatorGrades[index]).fill(<i className="material-icons">check</i>).map((icon, i) => (
                      <span key={i} className="mr-1">{icon}</span>
                    ))}
                  </div>
                </div>
                <td style={{ width: "200px" }} className="py-1 d-flex flex-row justify-content-between w-25 ">
                  <div className="w-50">
                    <GradeInput
                      isFacilitator
                      setIsGraded={setIsGraded}
                      setGrade={(grade) => handleGradeChange(index, grade)}
                      grade={facilitatorGrades[index]}
                      questionScore={Number(choice.label)}
                    />
                  </div>
                  <div className="w-50">
                    <GradeInput
                      isFacilitator
                      setIsGraded={setIsGraded}
                      setGrade={(grade) => handleGradeChange(index, grade)}
                      grade={moderatorGrades[index]}
                      questionScore={Number(choice.label)}
                    />
                  </div>
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
  questionType?: string;
  questionScore: number;
}) {
  return (
    <div className="d-flex w-100">
      <div className="d-flex w-75">
        <div className={`text-center w-100 py-2 ${grade < questionScore * 0.5 ? "text-danger" : "text-success"}`}>
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

function GradeInput({
  isFacilitator,
  setIsGraded,
  setGrade,
  grade,
  questionScore,
}: {
  setIsGraded: (isGraded: boolean) => void;
  setGrade: (grade: number) => void;
  grade: number;
  questionScore: number;
  isFacilitator?: boolean;
}) {
  return (
    <div className="d-flex w-100">
      <div className="d-flex w-75">
        <input
          disabled={isFacilitator}
          type="number"
          className={`form-control text-center w-100 ${!isFacilitator && "w-50"}`}
          defaultValue={grade}
          min="0"
          max={questionScore}
          onChange={(e) => setGrade(Number(e.target.value))}
        />
        {!isFacilitator && <div className="text-center w-100 py-2"> / {questionScore}</div>}
      </div>
      {!isFacilitator && (
        <div>
          <button
            onClick={() => setIsGraded(true)}
            type="button"
            className="btn btn-success"
          >
            <i className="material-icons">check</i>
          </button>
        </div>
      )}
    </div>
  );
}
