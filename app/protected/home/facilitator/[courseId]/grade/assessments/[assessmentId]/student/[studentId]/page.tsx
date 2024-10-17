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

function Page({
  params,
}: {
  params: { assessmentId: string; studentId: string };
}) {
  const [studentAssessment, setStudentAssessment] =
    useState<IAssessmentStudentAnswers | null>(data);
  const [loading, setLoading] = useState(true);
  const [isMarked, setIsMarked] = useState(true);
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

        if (assessments.isModerated) {
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
          <div className="d-flex flex-column">
            <div className="page-separator__text mb-2">Total Score</div>
            <div className="d-flex mb-2">
              <div className="page-separator__text mb-2">
                Facilitator : {totalMark}
              </div>
              <div className="page-separator__text mb-2">
                Moderator : {moderatorTotalMark}
              </div>
            </div>
          </div>
          <div className="page-separator"></div>

          <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
            <div className="mx-1">
              <button
                className="btn btn-success btn-block"
                onClick={() => setIsMarked(false)}
              >
                Re - Evaluate
              </button>
            </div>
          </div>

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
                  isMarked={isMarked}
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
        </div>
      </div>
    </>
  );
}

export default Page;
