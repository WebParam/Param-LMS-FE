import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { IMarkStudentAssessment, IRubric } from "@/app/interfaces/assessments";
import { useParams } from "next/navigation";
import { markStudentAssessment } from "@/app/lib/actions/assessments";
import Cookies from "universal-cookie";

type Props = {
  isEvaluate: boolean;
  isModerated: boolean;
  isFacilitated: boolean;
  questionNumber: number;
  setTotals: (total: number, index: number) => void;
  setModeratorTotals: (total: number, index: number) => void;
  questionName: string;
  questionDescription: string;
  questionAnswer: string;
  questionScore: number;
  rubric: IRubric[];
};

export default function ({
  isEvaluate,
  isModerated,
  isFacilitated,
  questionNumber,
  setTotals,
  setModeratorTotals,
  questionName,
  questionAnswer,
  questionScore,
  rubric,
}: Props) {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  const isFacilitator = loggedInUser.role == "Facilitator";
  const isModerator = loggedInUser.role == "Moderator";
  const gradedRubric = rubric.map((r) => r.facilitatorScore || 0);
  const moderatorGradedRubric = rubric.map((r) => r.moderatorScore || 0);

  const [grades, setGrades] = useState<number[]>(gradedRubric);
  const [moderatorGrades, setModeratorGrades] = useState<number[]>(
    moderatorGradedRubric
  );
  const [isGraded, setIsGraded] = useState(false);
  const totalGrade = grades.reduce((acc, grade) => acc + grade, 0);
  const moderatorTotalGrade = moderatorGrades.reduce(
    (acc, grade) => acc + grade,
    0
  );
  const FACILITATOR_MARK_TYPE = 1;
  const MODERATOR_MARK_TYPE = 0;
  const markType = isFacilitator ? FACILITATOR_MARK_TYPE : MODERATOR_MARK_TYPE;

  useEffect(() => {
    if (isFacilitator) setIsGraded(totalGrade > 0);
  }, [totalGrade]);

  useEffect(() => {
    if (isModerator) setIsGraded(moderatorTotalGrade > 0);
  }, [moderatorTotalGrade]);

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

  const handleModeratorGradeChange = async (index: number, grade: number) => {
    const newGrades = [...moderatorGrades];
    newGrades[index] = grade;
    setModeratorGrades(newGrades);
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
      creatingUserId: loggedInUser.id,
      mark,
      markType,
      label: Number(label),
    };
    const markResponse = await markStudentAssessment(payload);
    console.log(markResponse);
  };

  const submitTotal = () => {
    if (!(isFacilitated || isModerated)) {
      setModeratorTotals(moderatorTotalGrade || 0, questionNumber);
      setTotals(totalGrade || 0, questionNumber);
    }
  };

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
                  <div className="text-danger d-flex">
                    {Array(grades[index])
                      .fill(<i className="material-icons">check</i>)
                      .map((icon, i) => (
                        <span key={i} className="mr-1">
                          {icon}
                        </span>
                      ))}
                  </div>{" "}
                  {(isModerated || (isFacilitated && isModerator)) && (
                    <div style={{ color: "#77c13a" }} className=" d-flex">
                      {Array(moderatorGrades[index])
                        .fill(<i className="material-icons">check</i>)
                        .map((icon, i) => (
                          <span key={i} className="mr-1">
                            {icon}
                          </span>
                        ))}
                    </div>
                  )}
                  <span className="ml-2">{choice.description}</span>
                </div>
                <div
                  className="d-flex"
                  style={{
                    width:
                      isModerated || (isFacilitated && isModerator)
                        ? "300px"
                        : "200px",
                  }}
                >
                  <div className="d-flex w-75" style={{ gap: "20px" }}>
                    {isModerated || (isFacilitated && isModerator) ? (
                      <>
                        <GradeInput
                          isEvaluate={isEvaluate}
                          setIsGraded={setIsGraded}
                          setGrade={(grade) =>
                            handleModeratorGradeChange(index, grade)
                          }
                          grade={
                            choice.moderatorScore || moderatorGrades[index]
                          }
                          questionScore={Number(choice.label)}
                        />
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={choice.facilitatorScore}
                          disabled={true}
                        />
                      </>
                    ) : (
                      <GradeInput
                        isEvaluate={isEvaluate}
                        setIsGraded={setIsGraded}
                        setGrade={(grade) => handleGradeChange(index, grade)}
                        grade={choice.facilitatorScore || grades[index]}
                        questionScore={Number(choice.label)}
                      />
                    )}

                    <div className="text-center w-100 py-2">
                      {" "}
                      / {Number(choice.label)}
                    </div>
                  </div>
                </div>
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
                moderatorGrade={moderatorTotalGrade}
                questionScore={questionScore}
                isModerated={isModerated}
                isFacilitated={isFacilitated}
                isModerator={isModerator}
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
  moderatorGrade,
  questionScore,
  isModerated,
  isFacilitated,
  isModerator,
}: {
  setIsGraded: (isGraded: boolean) => void;
  grade: number;
  moderatorGrade: number;
  questionType?: string;
  questionScore: number;
  isModerated: boolean;
  isFacilitated: boolean;
  isModerator: boolean;
}) {
  return (
    <div className="d-flex w-100">
      <div className="d-flex w-100">
        <div className={`text-center w-100 py-2`}>
          <h6 className={`mb-1 text-danger`}>
            Facilitator: {grade} / {questionScore}
          </h6>{" "}
          {(isModerated || (isFacilitated && isModerator)) && (
            <h6 style={{ color: "green" }} className={`mb-1`}>
              Moderator: {moderatorGrade} / {questionScore}
            </h6>
          )}
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
  isEvaluate,
  setIsGraded,
  setGrade,
  grade,
  questionScore,
}: {
  isEvaluate: boolean;
  setIsGraded: (isGraded: boolean) => void;
  setGrade: (grade: number) => void;
  grade: number;
  questionScore: number;
}) {
  return (
    <>
      <input
        type="number"
        className="form-control"
        defaultValue={grade}
        min="0"
        max={questionScore}
        onChange={(e) => setGrade(Number(e.target.value))}
        disabled={!isEvaluate}
      />
    </>
  );
}
