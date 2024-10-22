"use client";
import LongQuestion from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/student/[studentId]/question-types/LongText";
import MultipleChoiceQuestion from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/student/[studentId]/question-types/MultipleChoice";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { getStudentAssessmentAnswers } from "@/app/lib/actions/assessments";
import { IAssessmentStudentAnswers } from "@/app/interfaces/assessments";
import { data } from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/student/[studentId]/data";
import PageHeader from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/student/[studentId]/PageHeader";
import FeedbackModal from "@/components/facilitator/[courseId]/grade/assessments/[assessmentId]/student/[studentId]/Modal";
import LongQuestionSkeleton from "@/components/skeleton/LongQuestionSkeleton";
import Cookies from "universal-cookie";

function Page({
  params,
  searchParams,
}: {
  params: { assessmentId: string; studentId: string };
  searchParams: { [key: string]: string };
}) {
  const { submitStatus } = searchParams;
  const cookies = new Cookies();

  const isFacilitated = submitStatus === "graded";
  const isPending = submitStatus === "pending";
  const isModerated = submitStatus === "moderated";

  const loggedInUser = cookies.get("param-lms-user");

  const isFacilitator = loggedInUser.role == "Facilitator";
  const isModerator = loggedInUser.role == "Moderator";

  const [studentAssessment, setStudentAssessment] =
    useState<IAssessmentStudentAnswers | null>(data);
  const [loading, setLoading] = useState(true);
  const [isEvaluate, setIsEvaluate] = useState(
    (isFacilitated && isModerator) || isPending
  );
  const [totalMark, setTotalMark] = useState(0);
  const [moderatorTotalMark, setModeratorTotalMark] = useState(0);
  const [totalMarkArr, setTotalMarkArr] = useState<number[]>([]);
  const [moderatorTotalMarkArr, setModeratorTotalMarkArr] = useState<number[]>(
    []
  );
  const currentItems = studentAssessment?.answers;

  const [modalShow, setModalShow] = useState(false);
  const assessmentId = params.assessmentId;
  const userId = params.studentId;

  const setTotals = (newTotal: number, index: number) => {
    const arr = [...totalMarkArr];
    arr[index] = newTotal;
    setTotalMarkArr([...arr]);
  };

  const setModeratorTotals = (newTotal: number, index: number) => {
    const arr = [...moderatorTotalMarkArr];
    arr[index] = newTotal;
    setModeratorTotalMarkArr([...arr]);
  };

  useEffect(() => {
    setTotalMark(totalMarkArr.reduce((a, b) => a + (b || 0), 0));
  }, [totalMarkArr]);

  useEffect(() => {
    setModeratorTotalMark(
      moderatorTotalMarkArr.reduce((a, b) => a + (b || 0), 0)
    );
  }, [moderatorTotalMarkArr]);

  const getAssessments = async () => {
    try {
      const assessments: IAssessmentStudentAnswers =
        await getStudentAssessmentAnswers(userId, assessmentId);

      if (assessments && assessments.answers) {
        setLoading(false);
        setStudentAssessment(assessments);

        if (isFacilitated || isModerated) {
          let totalGrade = 0;
          let moderatorTotalGrade = 0;
          for (let answer of assessments.answers) {
            const grades = answer.rubrics.map(
              (r: any) => r.facilitatorScore || 0
            );
            const moderatorGrades = answer.rubrics.map(
              (r: any) => r.moderatorScore || 0
            );

            totalGrade += grades.reduce((acc, grade) => acc + grade, 0);
            moderatorTotalGrade += moderatorGrades.reduce(
              (acc, grade) => acc + grade,
              0
            );
          }

          setTotalMark(totalGrade);
          setModeratorTotalMark(moderatorTotalGrade);
        }
      } else {
        setLoading(false);
        console.error("Unexpected response structure:", assessments);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching assessments:", error);
    }
  };

  useEffect(() => {
    getAssessments();
  }, []);

  return (
    <>
      <PageHeader />

      <div className="container page__container page__container page-section">
        <div className=" mb-0">
          {(isFacilitated || isModerated) && (
            <>
              <div className="d-flex flex-column">
                <div className="page-separator__text mb-2">Total Score</div>
                <div className="d-flex mb-2">
                  <div className="page-separator__text mb-2">
                    Facilitator : {totalMark}
                  </div>

                  {(isModerated || (isFacilitated && isModerator)) && (
                    <div className="page-separator__text mb-2">
                      Moderator : {moderatorTotalMark}
                    </div>
                  )}
                </div>
              </div>
              <div className="page-separator"></div>
            </>
          )}

          {((isFacilitated && isFacilitator) ||
            (isModerated && isModerator)) && !isEvaluate && (
            <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
              <div className="mx-1">
                <button
                  className="btn btn-success btn-block"
                  onClick={() => setIsEvaluate(!isEvaluate)}
                >
                  Re - Evaluate
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <>
              <LongQuestionSkeleton />
              <LongQuestionSkeleton />
            </>
          ) : (
            currentItems &&
            currentItems.map((data, index) =>
              data.questionType === "Quiz" ? (
                <MultipleChoiceQuestion
                  setTotals={setTotals}
                  setModeratorTotals={setModeratorTotals}
                  key={index}
                  questionNumber={index}
                  questionName={data.description}
                  questionDescription={data.description}
                  answers={data.options!}
                  questionScore={data.score}
                  studentMultipleChoiceAnswer={
                    data.studentMultipleChoiceAnswer!
                  }
                />
              ) : (
                <LongQuestion
                  isEvaluate={isEvaluate}
                  isModerated={isModerated}
                  isFacilitated={isFacilitated}
                  setTotals={setTotals}
                  setModeratorTotals={setModeratorTotals}
                  key={index}
                  questionNumber={index}
                  questionName={data.description}
                  questionDescription={data.description}
                  questionAnswer={data.studentLongTextAnswer!}
                  questionScore={data.score}
                  rubric={data.rubrics}
                />
              )
            )
          )}

          {isEvaluate && (
            <div className="card mb-0">
              <Button variant="success" onClick={() => setModalShow(true)}>
                Submit
              </Button>

              <FeedbackModal
                totalMark={totalMark}
                moderatorTotalMark={moderatorTotalMark}
                show={modalShow}
                onHide={() => {
                  setModalShow(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
