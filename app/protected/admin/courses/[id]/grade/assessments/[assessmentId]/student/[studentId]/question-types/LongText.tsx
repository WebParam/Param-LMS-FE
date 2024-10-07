import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { IMarkStudentAssessment, IRubric } from "@/app/interfaces/assessments";
import { useParams } from "next/navigation";
import { markStudentAssessment } from "@/app/lib/actions/assessments";
import Cookies from "universal-cookie";

type Props = {
  isMarked: boolean;
  questionNumber: number;
  setTotals: (total: number, index: number) => void;
  questionName: string;
  questionDescription: string;
  questionAnswer: string;
  questionScore: number;
  rubric: IRubric[];
};
export default function ({
  isMarked,
  questionNumber,
  setTotals,
  questionName,
  questionAnswer,
  questionScore,
  rubric,
}: Props) {
  const [grades, setGrades] = useState<number[]>(
    rubric.map((r) => r.facilitatorScore || 0)
  );
  const [isGraded, setIsGraded] = useState(false);
  const totalGrade = grades.reduce((acc, grade) => acc + grade, 0);
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const markType = loggedInUser.role == "Facilitator" ? 0 : 1;

  useEffect(() => {
    setIsGraded(totalGrade > 0);
  }, [totalGrade]);

  const handleGradeChange = async (index: number, grade: number) => {
    const newGrades = [...grades];
    newGrades[index] = grade;
    setGrades(newGrades);
    await markStudent(
      rubric[index].questionId,
      rubric[index].id,
      grade,
      rubric[index].label
    );
  };
  const { studentId: userId, assessmentId } = useParams<{
    studentId: string;
    assessmentId: string;
  }>();

  const markStudent = async (
    questionId: string,
    rubricId: string,
    mark: number,
    label: number
  ) => {
    const payload: IMarkStudentAssessment = {
      assessmentId,
      questionId,
      rubricId,
      userId,
      creatingUserId: "6580051b2b3b4e16f159792d",
      mark,
      markType,
      label: Number(label),
    };
    const markResponse = await markStudentAssessment(payload);
    console.log(markResponse);
  };

  const submitTotal = () => setTotals(totalGrade || 0, questionNumber);

  return (
    <div onMouseLeave={submitTotal} className="card table-responsive my-24pt">
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
                <h6 className="mb-1">Student Answer:</h6>
                <p className="m-0">{questionAnswer}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-2">
              <div>
                <h6 className="mb-1">Rubrics:</h6>
              </div>
            </td>
          </tr>
          <tr className="d-flex flex-column ">
            {rubric.map((choice, index) => (
              <td
                key={index}
                className="py-2 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex flex-column align-items-start">
                  <div
                    className={`${
                      markType ? "text-success" : "text-danger"
                    } d-flex`}
                  >
                    {Array(grades[index])
                      .fill(<i className="material-icons">check</i>)
                      .map((icon, i) => (
                        <span key={i} className="mr-1">
                          {icon}
                        </span>
                      ))}
                  </div>
                  <span className="ml-2">{choice.description}</span>
                </div>
                <GradeInput
                  isMarked={isMarked}
                  setIsGraded={setIsGraded}
                  setGrade={(grade) => handleGradeChange(index, grade)}
                  grade={choice.facilitatorScore || grades[index]}
                  questionScore={Number(choice.label)}
                />
              </td>
            ))}
            <td
              style={{ width: "170px" }}
              className="py-1 d-flex flex-row align-items-center align-self-end"
            >
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
        <div className={`text-center w-100 py-2`}>
          <h6
            style={{ color: grade >= questionScore * 0.5 ? "green" : "" }}
            className={`mb-1 ${grade < questionScore * 0.5 && "text-danger"}`}
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

function GradeInput({
  isMarked,
  setIsGraded,
  setGrade,
  grade,
  questionScore,
}: {
  isMarked: boolean;
  setIsGraded: (isGraded: boolean) => void;
  setGrade: (grade: number) => void;
  grade: number;
  questionScore: number;
}) {
  return (
    <div className="d-flex" style={{ width: "200px" }}>
      <div className="d-flex w-75">
        <input
          type="number"
          className="form-control"
          defaultValue={grade}
          min="0"
          max={questionScore}
          onChange={(e) => setGrade(Number(e.target.value))}
          disabled={isMarked}
        />
        <div className="text-center w-100 py-2"> / {questionScore}</div>
      </div>
    </div>
  );
}
